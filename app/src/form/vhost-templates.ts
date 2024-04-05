export type VhostType = "php" | "reverse-proxy";

export const phpTemplate = `server {
    listen 80;
    listen [::]:80;

    root /var/www/{{siteName}};

    index index.html index.php;

    server_name {{siteName}} www.{{siteName}};

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php{{phpVersion}}-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }
}`;
export const reverseProxyTemplate = `server {
    server_name {{siteName}} www.{{siteName}};

    location / {
        proxy_pass {{port}};

        proxy_http_version 1.1;
        proxy_set_header Host $server_name:$server_port;
        proxy_set_header X-Forwarded-Host $http_host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
    }
}`;