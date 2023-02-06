FROM node:11-alpine
COPY ./ /app/
WORKDIR /app
#RUN npm install -g npm@9.4.1
#RUN apt-get update
RUN npm install
EXPOSE 50051

## Não se repete no Dockerfile
## Executa o comando npm start para iniciar o script que que está no package.json
CMD npm start