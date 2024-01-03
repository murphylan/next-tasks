import { Flex, Text, Button } from '@radix-ui/themes';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User'
};

export default function UserPage() {
  return (
    <main className="flex justify-center md:h-screen">
      <Flex direction="column" gap="2">
        <Text>Hello from Radix Themes :)</Text>
        <Button>Let's go</Button>
      </Flex>
    </main>
  );
}