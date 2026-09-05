export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const MAX_IMAGES = 2040;

    // Link đích riêng của hotsocial.space
    const REDIRECT_URL =
      "https://baggyrepackingrocky.com/2022576";

    // Ảnh trực tiếp:
    // /1.png
    // /2.png
    // ...
    const imageMatch = url.pathname.match(/^\/(\d+)\.png$/);

    if (imageMatch) {
      const imageNumber = Number(imageMatch[1]);

      if (imageNumber < 1 || imageNumber > MAX_IMAGES) {
        return new Response("Not found", {
          status: 404
        });
      }

      return env.ASSETS.fetch(request);
    }

    // Card:
    // /api/anh1
    // /api/anh2
    // ...
    const cardMatch =
      url.pathname.match(/^\/api\/anh(\d+)$/);

    if (!cardMatch) {
      return new Response("Not found", {
        status: 404
      });
    }

    let imageNumber = Number(cardMatch[1]);

    if (imageNumber < 1 || imageNumber > MAX_IMAGES) {
      imageNumber = 3;
    }

    const imageUrl =
      `${url.origin}/${imageNumber}.png`;

    const pageUrl =
      `${url.origin}/api/anh${imageNumber}`;

    const title = "69:07";

    const description =
      "Check out this amazing content!";

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">

  <meta name="viewport"
        content="width=device-width, initial-scale=1">

  <title>${title}</title>

  <meta name="twitter:card"
        content="summary_large_image">

  <meta name="twitter:title"
        content="${title}">

  <meta name="twitter:description"
        content="${description}">

  <meta name="twitter:image"
        content="${imageUrl}">

  <meta name="twitter:url"
        content="${pageUrl}">

  <meta property="og:type"
        content="website">

  <meta property="og:title"
        content="${title}">

  <meta property="og:description"
        content="${description}">

  <meta property="og:image"
        content="${imageUrl}">

  <meta property="og:image:width"
        content="1200">

  <meta property="og:image:height"
        content="630">

  <meta property="og:url"
        content="${pageUrl}">
</head>

<body>

<script>
setTimeout(function () {
  window.location.href =
    ${JSON.stringify(REDIRECT_URL)};
}, 1000);
</script>

</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type":
          "text/html; charset=UTF-8",

        "Cache-Control":
          "no-store, no-cache, must-revalidate",

        "X-Content-Type-Options":
          "nosniff"
      }
    });
  }
};
