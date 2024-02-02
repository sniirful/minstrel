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
Currently unable to test since Windows won't start after installing Docker Desktop.
### MacOS
Currently unable to test.
## Downloading the necessary files
TODO
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
Currently unable to test since Windows won't start after installing Docker Desktop.
### MacOS
Currently unable to test.