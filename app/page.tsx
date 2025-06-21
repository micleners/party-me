import Link from 'next/link';
import { IconMessageCircle } from '@tabler/icons-react';
import { Button, Container, Flex, Paper, Text, Title } from '@mantine/core';

export default function HomePage() {
  return (
    <Container size="sm" py="xl">
      <Paper shadow="md" p="xl" radius="md" withBorder>
        <Flex direction="column" align="center" gap="sm">
          <IconMessageCircle size={48} color="#228be6" />
          <Title order={1} ta="center" mb="sm">
            Welcome to Party Me
          </Title>
          <Text ta="center" color="dimmed" mb="lg">
            Connect, chat, and celebrate with yourself! Dive into your messages and start the party.
          </Text>
          <Button component={Link} href="/messages" size="md" color="blue" radius="xl">
            Go to Messages
          </Button>
        </Flex>
      </Paper>
    </Container>
  );
}
