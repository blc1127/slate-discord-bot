# Random Discord Bot (Node.js)

A small slash-command bot with a few random commands: `/ping`, `/fortune`, `/8ball`, `/roll`, `/choose`.

## Setup

1. Create a Discord application + bot in the Developer Portal.
2. Copy your bot token and client ID into `.env` (see `.env.example`).
3. (Optional) Add `DISCORD_GUILD_ID` to register commands instantly while testing.

## Install

```bash
npm install
```

## Register commands

```bash
npm run register
```

## Run

```bash
npm start
```

## Notes

- If you skip `DISCORD_GUILD_ID`, global commands can take a while to appear.
- Invite URL format (replace CLIENT_ID):

```
https://discord.com/api/oauth2/authorize?client_id=CLIENT_ID&permissions=0&scope=bot%20applications.commands
```
