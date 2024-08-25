# TLV300

## Description

TLV300 Home Assignment using [Nuxt V3](https://nuxt.com/) and [Primevue](https://primevue.org/)

### Getting Started

1. Clone this repository to your local machine.
2. Install the necessary dependencies by running the following commands:

    ```bash 
    #npm
    npm install
    ```

    ```bash
    #pnpm
    pnpm install
    ```

    ```bash
    #yarn
    yarn install
    ```

3. Obtain your free Whois API key from WhoisXML API. Follow these steps:

   * Visit [WhoisXML](https://main.whoisxmlapi.com/) and sign up for an account.
   * Once logged in, navigate to settings under your user after logging in.
   * Copy or generate a new API key

4. Copy `env.example` to `.env`

    ```bash
    # linux/bash
    cp .env.example .env
    ```

    ```bash
    # windows/cmd
    copy .env.example .env
    ```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
