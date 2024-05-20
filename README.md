Simple Telegram Bot that provides easy access to some memes.
# Setup
First, you should create an `.env` file on the root directory of the project. Use the example in `.env.example` and replace it with your keys.

You can generate an `commands.txt` with the `generateTelegramCommandList.js` script if you want and send it to [Botfather](https://t.me/Botfather) to enable command suggestions for the bot.

Also, don't forget to execute the `/setinline` command within the chat with [Botfather](https://t.me/Botfather) and to select your bot to activate the inline functionality.

## Docker
Pretty straight-forward. There is a `Dockerfile` provided. Build the container like so while inside the root directory:
```sh
docker build --no-cache -t meme-bot .
```
And start it like so:
```sh
docker run --restart=unless-stopped --env-file=.env meme-bot
```

# Usage
The bot uses the `./img/` directory to derive available commands. Note that Telegram only supports images in the JPEG format due to the inline photo feature only supporting this format. For new memes, paste the images in the `./img/` directory _and commit them to a public repo_. For an image called e.g. "funny_meme.jpg", the generated Telegram bot command would be `/funnymeme`. Apart from that, it also can be found via an inline command of the form `@handle-of-your-bot <search-string>`. 
