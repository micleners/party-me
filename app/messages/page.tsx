import { Messages } from '@/components/Messages/Messages';
import { SearchParams } from 'next/dist/server/request/search-params';

export default function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
      <Messages searchParams={searchParams} />
  );
}
