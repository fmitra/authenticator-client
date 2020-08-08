# authenticator-client

A generic user authentication client supporting Email/SMS, TOTP, FIDO U2F

## Contents

* [Overview](#overview)

* [Development](#development)

  * [Getting Started](#getting-started)
  * [Full Stack Setup with Nginx](#dev-fullstack)
  * [Test and Lint](#test-and-lint)
  * [Production Setup](#production)

## <a name="overview">Overview</a>

This is the client-side implementation for the `authenticator` backend found [here](https://github.com/fmitra/authenticator).

This is mainly written as a proof of concept, and not all features on the backend service
are exposed here. In particular, we only cover the following:

1. User registration
2. User login with email/SMS, TOTP, FIDO U2F
3. Enabling FIDO U2F devices for registered users
4. Changing contact details for registered users

## <a name="development">Development</a>

### <a name="getting-started">Getting Started</a>

Recommended Node version is LTS v10.22.x. Assumming nvm is being used:

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
config.api.baseURL = 'https://api.project.local'
```

### <a name="dev-fullstack">Full Stack Setup with Nginx</a>

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

### <a name="test-and-lint">Test and Lint</a>

```
npm run test
npm run lint
```

### <a name="production">Production Setup</a>

To get started, make sure your [production](./src/config/production.ts) or [staging](./src/config/staging.ts) deloyment settings are configured.

Similar to the developer environment, you'll need to enable the config and build the assets.

```
npm run config:prod
npm run build
```

Production assets will be found under the `./dist` directory. A single `index.html` file
is your entry point to the application.
