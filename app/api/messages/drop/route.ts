import { dropMessages } from "@/app/db/messages/respository";

export async function GET() {
  const result = await dropMessages();
  return Response.json(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
}
