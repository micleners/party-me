import { SearchParams } from 'next/dist/server/request/search-params';
import { getVercelOidcToken } from '@vercel/functions/oidc';
import { Avatar, Box, Group, Paper, Text } from '@mantine/core';
import { Message } from '@/types/Message';
import { Part } from '@/types/Part';

export const Messages = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  const { persona_id } = await searchParams;

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  let token: string | undefined = undefined;
  if (process.env.VERCEL_URL) {
    token = await getVercelOidcToken();
  }

  console.log('Base URL:', baseUrl); // Debug log
  console.log('Token:', token); // Debug log

  const partsResponse = await fetch(`${baseUrl}/api/parts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('Parts response status:', partsResponse.status); // Debug log

  if (!partsResponse.ok) {
    const errorText = await partsResponse.text();
    console.error('Parts API error:', errorText);
    throw new Error(`Parts API failed: ${partsResponse.status}`);
  }
  const parts = await partsResponse.json();

  const partsById: Record<string, Part> = Object.fromEntries(parts.map((p: Part) => [p.id, p]));

  const messagesResponse = await fetch(`${baseUrl}/api/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('Messages response status:', messagesResponse.status); // Debug log

  if (!messagesResponse.ok) {
    const errorText = await messagesResponse.text();
    console.error('Messages API error:', errorText);
    throw new Error(`Messages API failed: ${messagesResponse.status}`);
  }

  const messages: Message[] = await messagesResponse.json();

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
