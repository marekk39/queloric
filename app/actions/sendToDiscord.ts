"use server";

export async function sendAffiliateToDiscord(data: {
  name: string;
  email: string;
  how: string;
}) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return { success: false };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "🤝 New Partner Application — Queloric",
            color: 0x4f46e5,
            fields: [
              { name: "👤 Name", value: data.name, inline: true },
              { name: "📧 Email", value: data.email, inline: true },
              { name: "📝 Plan", value: data.how },
            ],
            footer: { text: "Queloric Partner Applications" },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });
    return { success: true };
  } catch {
    return { success: false };
  }
}
