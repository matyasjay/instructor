cd postgres/prisma && dotenvx run -f ../../.env.local -- pnpm exec prisma migrate dev && pnpm exec prisma db seed
