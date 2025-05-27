	cd frontend && make build
  cd ../
	node scripts/deploy/vercel-pre.mjs
	vercel build 
	vercel .
	node scripts/deploy/vercel-post.mjs
