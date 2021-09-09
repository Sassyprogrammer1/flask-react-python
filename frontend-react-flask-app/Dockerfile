FROM node:12.22.3

RUN rm -rf node_modules
RUN npm install 
RUN node -v
RUN npm version

COPY . .

EXPOSE 3000

ENTRYPOINT npm start
