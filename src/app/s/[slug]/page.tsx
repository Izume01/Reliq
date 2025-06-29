import { Metadata } from 'next';
import WithoutPassword from '@/components/common/Slugs/WithoutPassword';
import WithPassword from '@/components/common/Slugs/WithPassword';
import prisma from '@/lib/db/primsa';
import React from 'react';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function slugPage({
  params,
}: {
  params: Promise<{ slug: string[] | string }>;
}) {
  const { slug } = await params;
  
  const userSlug = Array.isArray(slug) ? slug.join('/') : slug;
  const meta = await prisma.slug.findUnique({
    where: { slug: userSlug },
    select: { passwordRequired: true },
  });

  if (!meta) {
    return <div>Slug not found</div>;
  }

  return (
    <div>
      {meta.passwordRequired ? (
        <WithPassword slug={userSlug} />
      ) : (
        <WithoutPassword slug={userSlug} />
      )}
    </div>
  );
}

