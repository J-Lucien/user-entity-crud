FROM node:18.20.4
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm","run","server"]
EXPOSE 3000