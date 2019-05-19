# authenticator-client

A generic user authentication client supporting Email/SMS, TOTP, FIDO U2F and WebAuthn.

## Overview

This is the client-side implementation for the `authenticator` backend found [here](https://github.com/fmitra/authenticator)

## Development

Recommended Node version is LTS v10.15.x. Assumming nvm is being used:

```
nvm use
```

Create a local configuration file and start the test server.

```
npm run config:dev
npm run start
```

After the local configuration is created, default values can be overriden by updating
`src/config/local.ts`. For example, if we are running the the server portion of
this project on `api.project.local`:

```
config.api.baseURL = 'https://api.project.local`
```

### Full Stack Setup with Nginx

For a full stack set up, we'll want both the frontend and backend parts of this
project running on the same root domain with HTTPS configured to mimic a production
set up.

Assuming we're using `authenticator.local` for the root domain, follow the steps
below:

Generate a SSL certificate and ensure your browser trusts it.

```
openssl req -x509 -newkey rsa:4096 -sha256 -days 365 -nodes -keyout authenticator.key -out authenticator.crt -extensions san -config <(echo "[req]"; echo distinguished_name=req; echo "[san]"; echo subjectAltName=DNS:authenticator.local,DNS:api.authenticator.local,IP:127.0.0.1) -subj /CN=authenticator.local
```

Add an Nginx server config to handle the server and client. Note the client local server
runs on HTTPS to enable hot-reload with Webpack.

```
server {
  listen 443 ssl;
  server_name api.authenticator.local;

  ssl_certificate /usr/local/etc/nginx/certs/authenticator/authenticator.crt;
  ssl_certificate_key /usr/local/etc/nginx/certs/authenticator/authenticator.key;

  ssl_session_timeout 5m;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers  ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
  ssl_prefer_server_ciphers   on;

  location / {
    proxy_pass http://localhost:8081;
  }
}

server {
  listen 443 ssl;
  server_name authenticator.local;

  ssl_certificate /usr/local/etc/nginx/certs/authenticator/authenticator.crt;
  ssl_certificate_key /usr/local/etc/nginx/certs/authenticator/authenticator.key;

  ssl_session_timeout 5m;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers  ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
  ssl_prefer_server_ciphers   on;

  location / {
    proxy_pass https://localhost:4000;
  }
}
```

Test and lint

```
npm run test
npm run lint
```
