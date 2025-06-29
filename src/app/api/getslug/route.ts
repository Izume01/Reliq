import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/primsa";
import redis from "@/lib/db/redis";
import * as bcrypt from "bcrypt-ts";
import crypto from "crypto";

export async function POST(request : NextRequest) {
    /**
     * We will get few things from the body
     * slug
     * password
     * 
     */
    const body = await request.json();    

    const slugExists = await prisma.slug.findUnique({
        where : {
            slug : body.slug
        }
    })

    if(!slugExists) {
        return NextResponse.json({
            error : "Slug does not exist"
        }, {
            status : 400
        })
    }

    const dbPasswordHash = slugExists.passwordHash; 

    if(dbPasswordHash) {
        const isPasswordCorrect = await bcrypt.compare(body.password, dbPasswordHash);

        if(!isPasswordCorrect) {
            return NextResponse.json({
                error : "Invalid password"
            }, {
                status : 400
            })
        }
    }

    const content = await redis.get(body.slug) as string;
    await redis.del(body.slug);


    
    await prisma.slug.update({
        where : {
            slug : body.slug
        },
        data : {
            viewedAt : true
        }
    })

    if(!content) {

        await prisma.slug.delete({
            where : {
                slug : body.slug
            }
        })

        return NextResponse.json({
            error : "Slug has expired"
        }, {
            status : 400
        })
    }

    // now we can decode the content
    const Key = process.env.NEXT_PUBLIC_AES_HEX;

    const iv = slugExists.iv
    const tag = slugExists.tag;

    const decrypt = (content : string , iv : string , tag : string) => {
        if (!Key || Key.length !== 64) {
            throw new Error('Key must be a 64-character hexadecimal string for AES-256.');
        }

        const key = Buffer.from(Key, 'hex'); // Convert hex string to Buffer
        const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'));
        decipher.setAuthTag(Buffer.from(tag, 'hex'));

        let decrypted = decipher.update(content, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    }

    let decryptedContent;
    try {
        decryptedContent = decrypt(content, iv, tag);
    } catch (error) {
        console.error('Decryption failed:', error);
        return NextResponse.json({
            error: "Decryption failed"
        }, {
            status: 500
        });
    }

    return NextResponse.json({
        content : decryptedContent
    }, {
        status : 200
    })
}