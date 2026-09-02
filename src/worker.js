export default {
  async fetch(request, env) {
    return new Response("hotsocial.space worker is running", {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=UTF-8"
      }
    });
  }
};
