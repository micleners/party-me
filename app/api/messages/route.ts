import { messages } from "./messageData";

export async function GET() {
  

  return new Response(JSON.stringify(messages), {
    headers: { 'Content-Type': 'application/json' },
  });
}
