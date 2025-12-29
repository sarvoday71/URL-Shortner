// app/shorturl/[id]/page.tsx
// "use client";

import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

async function getLongUrl(id: string): Promise<string> {
  const short = id;
  const data = await prisma.urlDB.findUnique({
    where: {
      shorturl: short,
    },
  });

  if (!data) {
    notFound();
  }

  let target = data.longurl;
  if (!/^https?:\/\//i.test(target)) {
    target = `https://${target}`;
  }
  return target;
}

export default async function ShortUrlRedirection({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const longUrl = await getLongUrl(id);
  if (!longUrl) {
    notFound();
  }
  redirect(longUrl);
}
