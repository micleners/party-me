import { SearchParams } from 'next/dist/server/request/search-params';
import { Avatar, Box, Group, Paper, Text } from '@mantine/core';
import { Message } from '@/types/message';

export const Messages = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  const { persona_id } = await searchParams;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/messages`);
  const messages: Message[] = await response.json();

  return (
    <Box m="auto" ta="center" mt={100}>
      <Text size="xl" mb={20} c="blue.7">
        Messages
      </Text>
      {messages.map((message) => {
        const isActivePersona = (persona_id ?? '1') === message.userId.toString();
        return (
          <Group
            key={message.id}
            mb={20}
            p={10}
            maw={500}
            style={{ justifyContent: isActivePersona ? 'flex-start' : 'flex-end' }}
          >
            {isActivePersona && (
              <Avatar color="blue" radius="xl" style={{ alignSelf: 'flex-end' }}>
                ML
              </Avatar>
            )}
            <Paper
              shadow="xs"
              ta="left"
              p="8px"
              withBorder
              bg={isActivePersona ? 'blue.9' : 'grey.8'}
              style={{ maxWidth: 320 }}
              radius="md"
            >
              <Text size="sm" c="gray.1" style={{ lineHeight: '1.2rem' }}>
                {message.content}
              </Text>
              <Text size="10px" mt="6px" c="gray.3">
                {message.createdAtDate} @ {message.createdAtTime}
              </Text>
            </Paper>
            {!isActivePersona && (
              <Avatar color="grey" radius="xl" style={{ alignSelf: 'flex-end' }}>
                ML
              </Avatar>
            )}
          </Group>
        );
      })}
    </Box>
  );
};
