export const runtime = 'edge';
export const preferredRegion = 'auto';
export const dynamic = 'force-static';
export const revalidate = false;

export const unstable_cache = {
  maxAge: 60, // 60 seconds
  revalidate: false
}; 