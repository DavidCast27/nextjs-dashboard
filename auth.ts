import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import bcrypt from 'bcrypt';
import { LoginSchema } from './app/lib/shemas';
import { getUser } from './app/lib/data';


export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,


  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = LoginSchema
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
});