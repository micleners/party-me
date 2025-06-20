import { dropMessages } from '@/app/db/db';

export async function GET() {
  const result = await dropMessages();
  return Response.json(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
}
