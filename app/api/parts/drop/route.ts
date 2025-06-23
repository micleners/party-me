import { dropParts } from "@/app/db/parts/repository";

export async function GET() {
  const result = await dropParts();
  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
}