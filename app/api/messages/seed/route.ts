import { seedMessages } from "@/app/db/db";

export async function GET() {
  const response = await seedMessages();

  if (response.error) {
    return new Response(JSON.stringify(response), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(response), {
    headers: { 'Content-Type': 'application/json' },
  });
}