import { notFound } from "next/navigation";
import prisma from "@/lib/db/primsa";
import WithoutPassword from "@/components/common/Slugs/WithoutPassword";
import WithPassword from "@/components/common/Slugs/WithPassword";
import React from "react";

type Props = {
  params: {
    slug: string[];
  };
};

const SlugPage = async (props: Props) => {
  const { slug } = props.params;
  const userSlug = slug?.[0];

  if (!userSlug) return notFound();

  const meta = await prisma.slug.findUnique({
    where: { slug: userSlug },
    select: { passwordRequired: true },
  });

  if (!meta) return notFound();

  return (
    <>
      {meta.passwordRequired ? (
        <WithPassword slug={userSlug} />
      ) : (
        <WithoutPassword slug={userSlug} />
      )}
    </>
  );
};

export default SlugPage;
