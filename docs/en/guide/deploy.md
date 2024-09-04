# Deploy

## Vercel

1. Install Vercel CLI

```bash
npm install -g vercel
```

2. Login to Vercel
3. Deploy

```bash
vercel deploy
```


## Docker

1. Build Docker image, dockerfile is in the root of the project

```bash
docker build -t shadcnui-boilerplate .
```

2. Run Docker container

```bash
docker run -p 3000:80 shadcnui-boilerplate
```
