dev:
	pnpm i && dotenvx run -f ../.env.local -- node ../scripts/env/validate.mjs
	dotenvx run -f ../.env.local -- pnpm exec vite

build:
	pnpm i && dotenvx run -f ../.env.production -- node ../scripts/env/validate.mjs
	tsc -b && dotenvx run -f ../.env.production -- pnpm exec vite build

fmt:
	pnpm exec prettier --write . && pnpm exec eslint . --fix

test:
	pnpm exec tsc

run:
	pnpm i && dotenvx run -f ../.env.production -- node ../scripts/env/validate.mjs
	dotenvx run -f ../.env.production -- pnpm exec vite
