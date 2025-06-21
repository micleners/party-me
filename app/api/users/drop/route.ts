import { dropUsers } from "@/app/db/users/repository";

export async function GET() {
  const result = await dropUsers();
  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
}