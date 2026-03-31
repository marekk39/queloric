export async function POST(req: Request) {
  const data = await req.json();
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return Response.json({ ok: false });

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "📩 New Contact Form — Queloric",
            color: 0x4f46e5,
            fields: [
              { name: "👤 Name", value: data.name || "N/A", inline: true },
              { name: "📧 Email", value: data.email || "N/A", inline: true },
              { name: "🛠️ Service", value: data.service || "N/A", inline: true },
              { name: "💰 Budget", value: data.budget || "N/A", inline: true },
              { name: "📝 Message", value: data.message || "N/A" },
            ],
            footer: { text: "Queloric · queloric.com" },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });
  } catch {}

  return Response.json({ ok: true });
}
