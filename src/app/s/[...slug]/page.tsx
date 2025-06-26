import WithoutPassword from '@/components/common/Slugs/WithoutPassword';
import WithPassword from '@/components/common/Slugs/WithPassword';
import prisma from '@/lib/db/primsa';
import React from 'react';

const slugPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  console.log(slug);
  
  const userSlug  = slug[0]
  const meta = await prisma.slug.findUnique({
    where: { slug : userSlug },
    select: { passwordRequired: true },
  });

  if (!meta) {
    return <div>Slug not found</div>;
  }

  return (
    <div>
      {
        meta.passwordRequired ? (
          <WithPassword slug={userSlug}/>
        ) : (
          <WithoutPassword slug={userSlug} />
        )
      }
    </div>
  );
};

export default slugPage;
