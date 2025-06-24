import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import prisma from "@/lib/primsa";
import * as bcrypt from "bcrypt-ts";
import redis from "@/lib/redis";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.content || typeof body.content !== 'string') {
            return NextResponse.json({
                error: "Content is required"
            }, {
                status: 400
            });
        }

        const content = body.content

        let slug: string;
        let attempts = 0;
        const maxAttempts = 10;

        do {
            slug = nanoid(8); 
            attempts++;
            
            if (attempts > maxAttempts) {
                return NextResponse.json({
                    error: "Unable to generate unique slug, please try again"
                }, {
                    status: 500
                });
            }
        } while (await prisma.slug.findUnique({ where: { slug } }));

        // Hash password if provided
        let passwordHash: string | null = null;
        if (body.password && body.password.trim()) {
            passwordHash = await bcrypt.hash(body.password, 12);
        }

        // Create the slug record
        await prisma.slug.create({
            data: {
                slug,
                passwordHash
            }
        });
        
        const expiry = Math.min(Math.max(body.expiry || 3600, 60), 86400); 
        await redis.set(slug, content, {
            ex: expiry
        });

        return NextResponse.json({
            slug,
            expiresIn: expiry
        }, {
            status: 201
        });

    } catch (error) {
        console.error('Error creating secret:', error);
        return NextResponse.json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}