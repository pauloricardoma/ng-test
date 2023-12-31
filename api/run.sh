docker run \
  --name mongodb-docker \
  -p 27017:27017 \
  -d \
  mongo:4

docker ps # listar containers ativos
docker stop # parar containers ativos

docker exec -it mongodb-docker mongo

# app
docker volume create --name nodemodules

docker build -t app nodejs-with-mongodb-api-example

docker run \
  --name app \
  --link mongodb-docker \
  -e MONGO_URL=mongodb-docker \
  -e PORT=4000 \
  -p 4000:4000 \
  -v `pwd`/nodejs-with-mongodb-api-example:/src \
  -v nodemodules:/src/node_modules \
  app npm run dev:watch

docker rm app
docker volume rm nodemodules
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)

docker-compose up --build
docker-compose down