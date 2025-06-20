import { getMessages } from "@/app/db";

export async function GET() {
  const messages = await getMessages();

  return new Response(JSON.stringify(messages), {
    headers: { 'Content-Type': 'application/json' },
  });
}
