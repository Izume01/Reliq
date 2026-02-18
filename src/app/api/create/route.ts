import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import prisma from "@/lib/db/primsa";
import * as bcrypt from "bcrypt-ts";
import redis from "@/lib/db/redis";
import crypto from "crypto";
import { auth } from "@/lib/auth/auth";

export async function POST(request: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: request.headers,
        });

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        const body = await request.json();
        
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

        const tag = body.tag;
        const iv = body.iv;

        // Validate encryption parameters
        if (!tag || typeof tag !== 'string' || tag.length !== 32) {
            return NextResponse.json({
                error: "Invalid tag"
            }, {
                status: 400
            }); 
        }

        if (!iv || typeof iv !== 'string' || iv.length !== 32) {
            return NextResponse.json({
                error: "Invalid IV"
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

        // Handle encrypted password if provided
        let passwordHash: string | null = null;
        if (body.password && body.password.trim()) {
            try {
                // Decrypt the password from client
                const [passwordIv, encryptedPassword, passwordTag] = body.password.split(':');
                
                if (!passwordIv || !encryptedPassword || !passwordTag) {
                    throw new Error("Invalid encrypted password format");
                }
                
                const Key = process.env.NEXT_PUBLIC_AES_HEX;
                if (!Key || Key.length !== 64) {
                    throw new Error('Key must be a 64-character hexadecimal string for AES-256.');
                }
                
                const key = Buffer.from(Key, 'hex');
                const decipher = crypto.createDecipheriv(
                    'aes-256-gcm', 
                    key, 
                    Buffer.from(passwordIv, 'hex')
                );
                
                decipher.setAuthTag(Buffer.from(passwordTag, 'hex'));
                let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf8');
                decryptedPassword += decipher.final('utf8');
                
                // Hash the decrypted password
                passwordHash = await bcrypt.hash(decryptedPassword, 12);
            } catch (error) {
                console.error("Password decryption error:", error);
                return NextResponse.json({
                    error: "Invalid password encryption"
                }, {
                    status: 400
                });
            }
        }
    
        // Create the slug record
        try {
            await prisma.slug.create({
                data: {
                    slug,
                    passwordHash,
                    iv, 
                    tag,
                    userId: session.user.id,
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
        const redisKey = `secret:${slug}`;
        await redis.set(redisKey, content, {
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
