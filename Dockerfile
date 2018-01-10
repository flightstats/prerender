FROM node:6-onbuild
COPY package.json /usr/src/app/
RUN npm install && npm cache clean --force
COPY . /usr/src/app
WORKDIR /usr/src/app
CMD ["npm", "start"]
