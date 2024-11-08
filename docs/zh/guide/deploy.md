# 部署

## 使用 Vercel 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FTinsFox%2Fshadcnui-boilerplate&env=VITE_APP_NAME,VITE_API_URL,VITE_ENABLE_DEVTOOLS,VITE_EDITOR,VITE_ENABLE_MOCK)


## 使用 Docker 部署

项目中包含了 [dockerfile](https://github.com/TinsFox/shadcnui-boilerplate/blob/main/Dockerfile) 与 [Nginx Conf](https://github.com/TinsFox/shadcnui-boilerplate/blob/main/docker/nginx.conf)


1. 构建镜像

```bash
docker build -t shadcnui-boilerplate .
```

2. 运行容器

```bash
docker run -d -p 80:80 --name shadcnui-boilerplate shadcnui-boilerplate
```

::: details 为什么会有自己的 Nginx Conf?
因为前端的跨域由自己来处理会比较自由，不求人。

如果你遇到一个应用需要接多个客户端的时候，每一个都可能需要处理跨域问题，等运维给你配置的话，会非常慢，而且可能会更新不及时。

:::

> [!WARNING]
> 期望是可以读取 [环境变量](https://github.com/TinsFox/shadcnui-boilerplate/blob/main/docker/nginx.conf#L14)，然后 Nginx 反代环境变量指向的服务，但是目前这个模板我还没有用到生产中，这个功能还没有经过测试。

如果你有需要的话，可以参考下面的配置文件，然后进行修改。经过验证，这个配置文件是可用的。

```nginx{12-20}
server {
    listen       80;
    server_name  localhost;

    client_max_body_size 1G; // 这里设置了允许上传文件的大小，这里设置一个比较大的值，避免上传文件失败

    location /   {
        root   /app/dist;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://backend:3000; # 这里需要根据实际情况进行修改，指向后端服务
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```
