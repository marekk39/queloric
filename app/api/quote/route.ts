export async function POST(req: Request) {
  const data = await req.json();
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return Response.json({ ok: false });

  const serviceLabel = data.service?.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()) ?? "N/A";

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "📋 New Quote Request — Queloric",
            color: 0x4f46e5,
            fields: [
              { name: "👤 Name", value: data.name || "N/A", inline: true },
              { name: "📧 Email", value: data.email || "N/A", inline: true },
              { name: "🛠️ Service", value: serviceLabel, inline: true },
              { name: "💰 Budget", value: data.budget?.replace(/-/g, " ") || "N/A", inline: true },
              ...(data.timeline ? [{ name: "⏱️ Timeline", value: data.timeline, inline: true }] : []),
              ...(data.reference ? [{ name: "🔗 Reference", value: data.reference, inline: false }] : []),
              { name: "📝 Description", value: data.description || "N/A", inline: false },
            ],
            footer: { text: "Queloric · queloric.com/quote" },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });
  } catch {}

  return Response.json({ ok: true });
}
