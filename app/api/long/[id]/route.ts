import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@/app/generated/prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ message: "id cannot be blank" }, { status: 400 });
        }
        const short = "http://localhost:3000/shorturl/" + id;
        const longUrl = await prisma.urlDB.findFirst({
            where: {
                shroturl: short,
            },
        });
        if (!longUrl) {
            return NextResponse.json({ message: "unable to find longUrl to corresponding shorturl" }, { status: 500 });
        }
        return NextResponse.json(longUrl);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Unable to find the long url" });
    }
}
