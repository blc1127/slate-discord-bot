Slate Discord Bot

Slate is a Discord moderation and security bot built to protect servers from raids, spam, and destructive actions. It monitors server activity in real time and responds instantly when dangerous behavior is detected.

Core Features

Real time raid and nuke protection
Detection of mass channel deletes, role permission abuse, ban spikes, and join floods
Automatic lockdown system to stop damage
Advanced automod for spam, link flooding, mass mentions, and blacklisted words
Member verification with role gating
Join screening for low age or suspicious accounts
Detailed moderation and security logs
Per server configuration stored in MongoDB

Requirements

Node.js version 18 or newer
MongoDB Atlas database
Discord bot application with privileged intents enabled

Setup Instructions

Clone the repository

Run npm install

Create a .env file using the example below

Enable Server Members Intent and Message Content Intent in the Discord Developer Portal

Start the bot with node index.js

Environment Variables

DISCORD_TOKEN=your bot token
CLIENT_ID=your application id
MONGODB_URI=your mongodb connection string

Slash Commands

setup
lockdown
backup
restore
config
whitelist

Deployment

Slate can be deployed on Railway, Render, or any VPS. MongoDB Atlas free tier is supported.

License

MIT License
