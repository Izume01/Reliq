export default function Head() {
  return (
    <>
      {/* Preload critical resources */}
      <link
        rel="preload"
        href="/_next/static/chunks/main.js"
        as="script"
      />
      <link
        rel="preload"
        href="/_next/static/chunks/webpack.js"
        as="script"
      />
      <link
        rel="preload"
        href="/_next/static/chunks/framework.js"
        as="script"
      />
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
    </>
  );
} 