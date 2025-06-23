import { seedParts } from "@/app/db/parts/repository";

export async function GET() {
  const response = await seedParts();

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