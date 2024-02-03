# Overview
In this section you'll learn how to start Minstrel and all its requisites.
## Index
- [What you'll need](#what-youll-need)
- [Installing prerequisites](#installing-prerequisites)
	- [Linux](#linux)
	- [Windows](#windows)
	- [MacOS](#macos)
- [Downloading the necessary files](#downloading-the-necessary-files)
- [Starting the bot](#starting-the-bot)
	- [Linux](#linux-1)
	- [Windows](#windows-1)
	- [MacOS](#macos-1)
## What you'll need
To ensure that the bot works just as intended, Minstrel is using Docker, which is a platform that allows everyone on any operating system to run the same exact programs. In the next sections you will learn how to install it and how to use it.

> Please make sure that your CPU supports virtualization and that you have enabled it in your BIOS. Most modern computers have both by default, but a check before performing any of the following operations would be ideal or it could cause serious issues to your system.

## Installing prerequisites
### Linux
To show how to install docker on Linux, we will make use of the [official Docker Engine installation page](https://docs.docker.com/engine/install/ubuntu/). For this demo, we're going to use Ubuntu as a reference since it's what most people will use, but on the left you can find a couple more distributions if needed. If yours doesn't appear on that list, please refer to the documentation of your distribution in order to install Docker and skip to the next step.

> Please be very careful when following this guide, Docker Engine installation might change in the future and this guide may not be updated immediately or at all, and the mere copy-and-paste of the commands you'll find below might actually make your system unusable. Proceed with caution.

Moving on, we first need to set up the repository to tell our system where it will download the Docker executables from:
```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```
It's now time to actually install Docker. Issue the following command:
```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
And press "Y" whenever you're asked. You can now test if the Docker installation was successful:
```bash
sudo docker run hello-world
```
This command should output the following:
```
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```
If it doesn't, search for more information online before proceeding. If it does, you can perform the [post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/).

Create the `docker` group:
```bash
sudo groupadd docker
```
And add your user to the newly-created group:
```bash
sudo usermod -aG docker $USER
```
Once done so, restart your PC. You should now be able to run:
```bash
docker run hello-world
```
successfully, just like before, but without the `sudo` command.
### Windows
In order to show you how to install Docker on Windows, we'll refer to the standard installation steps for [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/). Go to the website just mentioned and click "Docker Desktop for Windows" to start downloading the installer.

![](https://github.com/sniirful/minstrel/blob/main/guides/res/start-discord-bot-1.png?raw=true)

Once downloaded, open it and give it administrator rights.

![](https://github.com/sniirful/minstrel/blob/main/guides/res/start-discord-bot-2.png?raw=true)

After that, wait a bit for it to load and click "Ok" to start the installation.

![](https://github.com/sniirful/minstrel/blob/main/guides/res/start-discord-bot-3.png?raw=true)

When the installation has finished, it will prompt you to reboot the PC. Click "Close and restart".

![](https://github.com/sniirful/minstrel/blob/main/guides/res/start-discord-bot-4.png?raw=true)

On the next boot, you should be prompted with a Docker window about the service agreement. Click on "Accept".

![](https://github.com/sniirful/minstrel/blob/main/guides/res/start-discord-bot-5.png?raw=true)

Then "Finish" to finish the installation.

![](https://github.com/sniirful/minstrel/blob/main/guides/res/start-discord-bot-6.png?raw=true)

It will prompt again for administrator rights. Just click "Yes". 

Now it's time for the account. However, it's not required, so click on "Continue without signing in".

![](https://github.com/sniirful/minstrel/blob/main/guides/res/start-discord-bot-7.png?raw=true)

After that, click "Skip survey" at the very bottom of the page.

![](https://github.com/sniirful/minstrel/blob/main/guides/res/start-discord-bot-8.png?raw=true)

Now you might need to wait a bit for Docker Engine to start. Once it's finished, you should see a page like this:

![](https://github.com/sniirful/minstrel/blob/main/guides/res/start-discord-bot-9.png?raw=true)

If you do, then you're done. Docker is installed on your Windows machine.
### MacOS
Currently unable to test.
## Downloading the necessary files
This next step is to download the bot's source code and add the configuration file prepared in the [previous section](https://github.com/sniirful/minstrel/blob/main/guides/create-configuration-file.md). Just go to the [main bot's GitHub page](https://github.com/sniirful/minstrel) and click on "<> Code":

![](https://github.com/sniirful/minstrel/blob/main/guides/res/start-discord-bot-11.png?raw=true)

Then "Download ZIP":

![](https://github.com/sniirful/minstrel/blob/main/guides/res/start-discord-bot-12.png?raw=true)

Once downloaded, extract the ZIP file into any folder you like. Now, go to the `bot/src` folder, create a `configuration.json` file and paste the configuration from before inside that file.

On Windows, to create a JSON file, you first have to create a Notepad tab and paste the configuration there:

![](https://github.com/sniirful/minstrel/blob/main/guides/res/start-discord-bot-13.png?raw=true)

Now you have to click "File" and then "Save as":

![](https://github.com/sniirful/minstrel/blob/main/guides/res/start-discord-bot-14.png?raw=true)

Now you can select the `bot/src` folder and name the file `configuration.json` after selecting "All files" in the "Save as type" list:

![](https://github.com/sniirful/minstrel/blob/main/guides/res/start-discord-bot-15.png?raw=true)
## Starting the bot
### Linux
Change your directory to Minstrel's folder.
```bash
cd /path/to/minstrel
```
After doing so, just run the following command:
```bash
docker compose up --build
```
And it will start installing all the necessary dependencies. To stop it, issue `Ctrl`+`C`.

Optional: if you want your bot to run in the background and to be able to close the terminal window, just run:
```bash
docker compose up -d --build
```
In this case, to stop it, you will have to run the following command:
```bash
docker container stop minstrel-discord-bot-1
```
### Windows
Open the directory where you have extracted the files in the previous section. Right click an empty space and click on "Open in Terminal":

![](https://github.com/sniirful/minstrel/blob/main/guides/res/start-discord-bot-16.png?raw=true)

You can now paste commands inside the newly-opened window.

To start the bot, issue the following command:
```ps
docker compose up --build
```
If you want it to run in the background and thus close the terminal window, just run:
```ps
docker compose up -d --build
```
In this case, in order to stop it, you have to open any terminal wherever you want and run:
```ps
docker container stop minstrel-discord-bot-1
```
### MacOS
Currently unable to test.