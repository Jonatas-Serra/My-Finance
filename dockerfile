FROM node:20-alpine

# Create app directory
WORKDIR /web

# Install app dependencies
COPY --chown=node:node package*.json ./

RUN npm i -f

# Bundle app source
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--port", "5173"]