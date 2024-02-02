# Overview
In this section you'll learn how to create a configuration file for Minstrel, with all the bot's information to have it running.
## Index
- [Structure of the configuration file](TODO)
- [The token setting](TODO)
- [The client ID setting](TODO)
- [The language setting](TODO)
- [The final JSON structure](TODO)
- [Moving on](TODO)
## Structure of the configuration file
The configuration file is in JSON format, and will look like this:
```json
{
"token": "<token>",
"client_id": "<client_id>",
"language": "<language>"
}
```
Where:
- \<token\>
- \<client_id\>
- \<language\>
are the settings of this application.
## The token setting
The token is a special set of random letters and numbers that uniquely identifies your bot. It is used to let Minstrel log into the bot's account and perform actions on its behalf.
In order to retrieve it, go to the [Discord Developer Portal](https://discord.com/developers/applications), click on your bot and then, on the left, click on "Bot".
![[create-configuration-file-1.png]]
You'll immediately find the button "Reset Token".
![[create-configuration-file-2.png]]
Once you click on it, a popup will appear. Just click on "Yes, do it!".
![[create-configuration-file-3.png]]
If prompted, enter your 2FA authentication code. You can now see your bot's token.
![[create-configuration-file-4.png]]
Copy it and put it into the JSON structure, replacing `<token>`.
## The client ID setting
The client ID is a random number that uniquely identifies the application your bot belongs to. It is required to generate and update the slash commands of the bot.
To obtain it, simply go to the [Discord Developer Portal](https://discord.com/developers/applications), click on your bot and on the right you'll immediately find a section called "Application ID".
![[create-configuration-file-5.png]]
Click on "Copy" and replace `<client_id>` with this number in the JSON structure.
## The language setting
This bot currently supports the following languages:
- `enUS` (English - US, the default)
- `itIT` (Italian - IT)
Pick the one you prefer on your server and replace `language` with it in the structure.
## The final JSON structure
In the end, your JSON structure should look something like this:
```json
{
"token": "MTIwMjY2NDgzNzU5NjA1NzcxMA.GPkl8I.435ny574nA2M2AicKPEPZD9K48f8nMxBxYyKRE",
"client_id": "1202664837596057710",
"language": "enUS"
}
```
## Moving on
You can now save this structure for later when you're [starting Minstrel](TODO).