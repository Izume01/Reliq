import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/primsa";
import redis from "@/lib/redis";
import * as bcrypt from "bcrypt-ts";

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

    const content = await redis.get(body.slug);
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


    return NextResponse.json({
        content : content
    }, {
        status : 200
    })
}