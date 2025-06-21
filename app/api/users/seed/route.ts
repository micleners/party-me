import { seedUsers } from "@/app/db/users/repository";

export async function GET() {
  const response = await seedUsers();

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