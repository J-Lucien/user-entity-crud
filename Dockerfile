FROM node:18.20.4
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
ENV MYSQL_HOST=mysql
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=secret
ENV MYSQL_DB=userapi
CMD ["npm","run","server"]
EXPOSE 3000