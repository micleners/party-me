import { getParts } from "@/app/db/parts/repository";

export async function GET() {
  const parts = await getParts();
  return new Response(JSON.stringify(parts), {
    headers: { 'Content-Type': 'application/json' },
  });
}