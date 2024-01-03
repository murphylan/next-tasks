import { Logo } from '@/components/logo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User'
};

export default function UserPage() {
  return (
    <main className="flex justify-center md:h-screen">
      User list
    </main>
  );
}