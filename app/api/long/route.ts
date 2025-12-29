import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@/app/generated/prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { longUrl } = body;
        if (!longUrl) {
            return NextResponse.json({ error: "longUrl missing" }, { status: 400 });
        }
        console.log(longUrl);
        let shortUrl = await prisma.urlDB.findFirst({
            where: {
                longurl: longUrl
            }
        });
        console.log(shortUrl)

        if (shortUrl) {
            console.log("URL already exists");
            return NextResponse.json(shortUrl);
        }

        // here we need to create unique hash value to attach our shorturl
        shortUrl = await prisma.urlDB.create({
            data: {
                longurl: longUrl,
            }
        })

        const id = shortUrl.id;
        const hashValue = toBase64(id);

        const shortUrltoPush = hashValue;
        shortUrl = await prisma.urlDB.update({
            where: {
                longurl: longUrl,
            },
            data: {
                shorturl: shortUrltoPush,
            }
        })

        return NextResponse.json(shortUrl);
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "Error while creating shorturl" }, { status: 404 });
    }
}

function toBase64(num: number) {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let out = "";
    while (num > 0) {
        out = chars[num % 62] + out;
        num = Math.floor(num / 62);
    }
    return out;
}