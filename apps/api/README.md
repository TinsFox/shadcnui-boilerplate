# Mock Service

```bash
pnpm install
pnpm run dev
```

```bash
pnpm run deploy
```

## Prisma Note

```bash
npx wrangler d1 migrations create mock-service init

npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel ./prisma/schema.prisma \
  --script \
  --output migrations/0001_init.sql

npx wrangler d1 migrations apply mock-service --local

npx wrangler d1 migrations apply mock-service --remote

npx prisma generate
```
