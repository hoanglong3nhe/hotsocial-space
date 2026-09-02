export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Cho phép mở ảnh trực tiếp: /1.png, /2.png...
    const imageMatch = url.pathname.match(/^\/(\d+)\.png$/);

    if (imageMatch) {
      return env.ASSETS.fetch(request);
    }

    // /api/anh1
    const match = url.pathname.match(/^\/api\/anh(\d+)$/);

    if (!match) {
      return new Response("Not found", { status: 404 });
    }

    const imageNumber = Number(match[1]);

    const redirectUrl =
      "https://baggyrepackingrocky.com/2022576";

    const imageUrl =
  imageNumber === 1
    ? "https://i.imgur.com/W5PEFru.jpeg"
    : `${url.origin}/${imageNumber}.png`;

    const title = "69:07";
    const description = "Check out this amazing content!";

    const pageUrl =
      `${url.origin}/api/anh${imageNumber}`;

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">

  <title>${title}</title>

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${imageUrl}">
  <meta name="twitter:url" content="${pageUrl}">

  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:url" content="${pageUrl}">
</head>

<body>
<script>
setTimeout(function() {
  window.location.href =
    ${JSON.stringify(redirectUrl)};
}, 1000);
</script>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
        "Cache-Control": "no-store, no-cache, must-revalidate"
      }
    });
  }
};
