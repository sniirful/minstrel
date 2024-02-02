# Overview
In this section you'll learn how to register a Discord bot and make it join your server.
## Index
- [Creating the bot](#creating-the-bot)
- [Configuring the bot](#configuring-the-bot)
- [Adding the bot to your server](#adding-the-bot-to-your-server)
- [Moving on](#moving-on)
## Creating the bot
The first step is to actually create the Discord application (as they call it) for the bot. Head over to the [Discord Developer Portal](https://discord.com/developers/applications) and click on "New Application".

![](https://github.com/sniirful/minstrel/blob/main/guides/res/create-discord-bot-1.png?raw=true)

Give a name to your application (can also be the same as the bot's name) and click on "Create".

![](https://github.com/sniirful/minstrel/blob/main/guides/res/create-discord-bot-2.png?raw=true)

## Configuring the bot
Once you have created the bot, you can access it at the same [Discord Developer Portal](https://discord.com/developers/applications) as before.

![](https://github.com/sniirful/minstrel/blob/main/guides/res/create-discord-bot-3.png?raw=true)

When you click on it, you can start customizing the app information, starting with the description.

![](https://github.com/sniirful/minstrel/blob/main/guides/res/create-discord-bot-4.png?raw=true)

When you're done editing the bot's About Me section, just click on "Save Changes" (and if you want to go back, click "Reset").

![](https://github.com/sniirful/minstrel/blob/main/guides/res/create-discord-bot-5.png?raw=true)

Further customization can be found by clicking the "Bot" section at the left of the page.

![](https://github.com/sniirful/minstrel/blob/main/guides/res/create-discord-bot-6.png?raw=true)

Here, you can finally change the bot's profile picture and its username.

Another important option is "Public Bot", which we strongly recommend to turn off.

![](https://github.com/sniirful/minstrel/blob/main/guides/res/create-discord-bot-7.png?raw=true)

Again, when you're done, just click on "Save Changes".

![](https://github.com/sniirful/minstrel/blob/main/guides/res/create-discord-bot-8.png?raw=true)

## Adding the bot to your server
Again, go to [Discord Developer Portal](https://discord.com/developers/applications) and click on the bot. Then, click on "OAuth2" and "URL Generator".

![](https://github.com/sniirful/minstrel/blob/main/guides/res/create-discord-bot-9.png?raw=true)

In the "Scopes" section, only tick the "bot" box.

![](https://github.com/sniirful/minstrel/blob/main/guides/res/create-discord-bot-10.png?raw=true)

A new section will appear, namely "Bot permissions", which you don't really need since that will only create a custom bot role that you cannot delete. You can manage the bot's roles and permissions yourself later when it's already joined. Leave that section blank.

![](https://github.com/sniirful/minstrel/blob/main/guides/res/create-discord-bot-11.png?raw=true)

At the bottom you'll see the last section, "Generated URL". Click on "Copy", paste the link in a new browser tab and follow the Discord procedure to add the bot to your server.

![](https://github.com/sniirful/minstrel/blob/main/guides/res/create-discord-bot-12.png?raw=true)

## Moving on
Now that the bot has joined your server, you can move on to [configure Minstrel](https://github.com/sniirful/minstrel/blob/main/guides/create-configuration-file.md).