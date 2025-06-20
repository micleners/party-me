import { getMessages } from "@/app/db/db";

export async function GET() {
  const messages = await getMessages();
  const formattedMessages = messages.map((msg) => {
    const date = msg.createdAt ? new Date(msg.createdAt.seconds * 1000) : null;
    return {
      ...msg,
      createdAt: date ? date.toISOString() : null,
      createdAtDate: date
        ? `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`
        : null,
      createdAtTime: date
        ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase()
        : null,
    };
  });

  return new Response(JSON.stringify(formattedMessages), {
    headers: { 'Content-Type': 'application/json' },
  });
}
