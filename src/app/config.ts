// Route segment config for better performance
export const runtime = 'edge';
export const preferredRegion = 'auto';
export const dynamic = 'force-static';
export const revalidate = false;

// Optimize fetch requests
export const fetchCache = 'force-cache';
export const maxDuration = 60; // 60 seconds max duration 