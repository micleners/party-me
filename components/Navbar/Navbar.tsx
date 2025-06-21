'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconHome, IconMessageCircle } from '@tabler/icons-react';
import { Button, Flex, Paper } from '@mantine/core';

export function Navbar() {
  const pathname = usePathname();

  return (
    <Paper shadow="md" p="md" radius="md" withBorder mb="xl">
      <Flex gap="md" justify="center" align="center">
        <Button
          component={Link}
          href="/"
          variant={pathname === '/' ? 'filles' : 'subtle'}
          leftSection={<IconHome size="24" />}
          color="blue"
          radius="xl"
        >
          Home
        </Button>
        <Button
          component={Link}
          href="/messages"
          variant={pathname === '/messages' ? 'filles' : 'subtle'}
          leftSection={<IconMessageCircle size="24" />}
          color="blue"
          radius="xl"
        >
          Messages
        </Button>
      </Flex>
    </Paper>
  );
}
