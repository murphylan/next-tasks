murphylan@MacBook-Pro nextjs-tasks % npx prisma init --datasource-provider sqlite

✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Run prisma db pull to turn your database schema into a Prisma schema.
3. Run prisma generate to generate the Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started


# .env

```

  DATABASE_URL="file:./dev.db"

  AUTH_SECRET=vQaQImYn1zzIK4Qjs9ZwXwduUS53S7hadjnZGED/eMg=

```
