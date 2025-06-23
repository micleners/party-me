import { SearchParams } from 'next/dist/server/request/search-params';
import { Avatar, Box, Group, Paper, Text } from '@mantine/core';
import { Message } from '@/types/Message';
import { Part } from '@/types/Part';
import { GET as getPartsHandler } from '@/app/api/parts/route';
import { GET as getMessagesHandler } from '@/app/api/messages/route';

export const Messages = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  const { persona_id } = await searchParams;

  let parts: Part[] = [];
  let messages: Message[] = [];

  if (process.env.VERCEL_URL) {
    // Use direct handler calls in Vercel environment
    parts = await (await getPartsHandler()).json();
    messages = await (await getMessagesHandler()).json();
  } else {
    // Use HTTP requests in local environment
    const baseUrl = 'http://localhost:3000';

    const partsResponse = await fetch(`${baseUrl}/api/parts`);
    if (!partsResponse.ok) {
      const errorText = await partsResponse.text();
      throw new Error(`Parts API failed: ${partsResponse.status} - ${errorText}`);
    }
    parts = await partsResponse.json();

    const messagesResponse = await fetch(`${baseUrl}/api/messages`);
    if (!messagesResponse.ok) {
      const errorText = await messagesResponse.text();
      throw new Error(`Messages API failed: ${messagesResponse.status} - ${errorText}`);
    }
    messages = await messagesResponse.json();
  }

  const partsById: Record<string, Part> = Object.fromEntries(parts.map((p: Part) => [p.id, p]));

  return (
    <Box m="auto" ta="center">
      {messages.map((message) => {
        const messagePart = partsById[message.partId];
        const isActivePersona = (persona_id ?? '1') === message.partId.toString();
        return (
          <Group
            key={message.id}
            mb={20}
            p={10}
            maw={500}
            mx="auto"
            style={{ justifyContent: isActivePersona ? 'flex-start' : 'flex-end' }}
          >
            {isActivePersona && (
              <Avatar color={messagePart.color} radius="xl" style={{ alignSelf: 'flex-end' }}>
                ML
              </Avatar>
            )}
            <Paper
              shadow="xs"
              ta="left"
              p="8px"
              withBorder
              bg={`${messagePart.color}.9`}
              style={{ maxWidth: 320 }}
              radius="md"
            >
              <Text size="sm" c={`${messagePart.color}.1`} style={{ lineHeight: '1.2rem' }}>
                {message.content}
              </Text>
              <Text size="10px" mt="6px" c="gray.3">
                {message.createdAtDate} @ {message.createdAtTime}
              </Text>
            </Paper>
            {!isActivePersona && (
              <Avatar color={messagePart.color} radius="xl" style={{ alignSelf: 'flex-end' }}>
                ML
              </Avatar>
            )}
          </Group>
        );
      })}
    </Box>
  );
};
