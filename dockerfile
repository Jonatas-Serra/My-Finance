FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/web

# Install app dependencies
COPY --chown=node:node package*.json ./

RUN npm install --global npm@8.19.2 && npm install -g typescript && npm install

# Bundle app source
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]