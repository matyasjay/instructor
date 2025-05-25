dev:
	pnpm i && dotenvx run -f ../.env.local -- node ../cli/env.mjs
	dotenvx run -f ../.env.local -- pnpm exec vite

build:
	pnpm i && dotenvx run -f ../.env.production -- node ../cli/env.mjs
	tsc -b && dotenvx run -f ../.env.production -- pnpm exec vite build

fmt:
	prettier --log-level silent --write . && eslint . --fix

test:
	tsc && prettier --check . && eslint .

run:
	pnpm i && dotenvx run -f ../.env.production -- node ../cli/env.mjs
	dotenvx run -f ../.env.production -- pnpm exec vite
