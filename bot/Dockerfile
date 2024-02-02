FROM node:20.11.0

RUN apt update && apt install -y chromium xvfb
RUN npm i -g typescript

WORKDIR /app
# we first copy the package.json file, so if that doesn't change
# there's no need to run "npm i" every single time we build
# the container
COPY package.json .
COPY package-lock.json .
RUN npm i
# eventually, everything else
COPY . .
RUN tsc

CMD xvfb-run --server-args="-screen 0 1024x768x24" node src
