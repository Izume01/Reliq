import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import prisma from "@/lib/db/primsa";
import * as bcrypt from "bcrypt-ts";
import redis from "@/lib/db/redis";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log("Received body:", body);
        
        // Validate required fields
        if (!body.content || typeof body.content !== 'string') {
            return NextResponse.json({
                error: "Content is required"
            }, {
                status: 400
            });
        }

        if (body.timetolive && (typeof body.timetolive !== 'number' || body.timetolive <= 0)) {
            return NextResponse.json({
                error: "Invalid time to live value"
            }, {
                status: 400
            });
        }

        if (body.timetolive) {
            body.timetolive = parseInt(body.timetolive as string, 10);
            if (isNaN(body.timetolive)) {
            return NextResponse.json({
                error: "Invalid time to live value"
            }, {
                status: 400
            });
            }
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
        try {
            await prisma.slug.create({
                data: {
                    slug,
                    passwordHash
                }
            });
        } catch (error) {
            console.error(error);
            return  NextResponse.json({
                error: error,
            })
        }

        // update the passwordrequired field
        if (passwordHash) {
            await prisma.slug.update({
                where : {slug} , 
                data :{
                    passwordRequired: true
                }
            })
        }
        
        const expiry  = body.timetolive || 300;  
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