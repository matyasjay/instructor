dev:
	cd ../ && sh scripts/package/typegen.sh
	pnpm i
	dotenvx run -f ../.env.local -- node ../scripts/env/validate.mjs
	dotenvx run -f ../.env.local -- pnpm exec vite

build:
	cd ../ && sh scripts/package/typegen.sh
	pnpm i
	dotenvx run -f ../.env.local -- node ../scripts/env/validate.mjs
	tsc -b
	dotenvx run -f ../.env.local -- pnpm exec vite build

start:
	pnpm i
	dotenvx run -f ../.env.local -- node ../scripts/env/validate.mjs
	dotenvx run -f ../.env.local -- pnpm exec vite
