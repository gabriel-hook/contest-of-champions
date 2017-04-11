FROM node:6
EXPOSE 8080
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ENV WEBPACK_HOSTNAME 0.0.0.0
ENV WEBPACK_OPEN false

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install && npm cache clean
CMD [ "npm", "start" ]