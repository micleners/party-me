import { Box, Title } from '@mantine/core';
import { Message } from '@/types/message';

export const Messages = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/messages`);
  const messages: Message[] = await response.json();

  return (
    <Box m="auto" ta="center" mt={100}>
      {messages.map((message) => (
        <Box key={message.id} mb={20} p={10}>
          <Title order={3}>{message.content}</Title>
          <p style={{ fontSize: 14, margin: '8px 0', color: '#6B7280' }}>
            {new Date(message.createdAt).toLocaleString()}
          </p>
        </Box>
      ))}
    </Box>
  );
};
