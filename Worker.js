addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const API_KEY = "sk-NpMnCVFR3DNunmR1o6nSZqp3ZpGI6feeHuC4nJHlW3DcfNew";
const AI_URL = "https://api.gapgpt.app/v1";

async function handleRequest(request) {
  if(request.method === "POST") {
    const { message } = await request.json();

    const aiRes = await fetch(`${AI_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gbt4o",
        messages: [{ role: "user", content: message }]
      })
    });

    const aiData = await aiRes.json();
    return new Response(JSON.stringify({ reply: aiData.choices[0].message.content }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response("Worker Online", { status: 200 });
}
