import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    signOut: '/',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnBoard = nextUrl.pathname.startsWith('/board');
      const isOnLogin = nextUrl.pathname.startsWith('/login')
      if (isOnBoard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        if (isOnBoard || isOnLogin) {
          return Response.redirect(new URL('/board', nextUrl));
        } else {
          return true;
        }
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;