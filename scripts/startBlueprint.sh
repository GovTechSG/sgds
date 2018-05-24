docker run --name blueprint --network blueprint-net -d blueprint
docker run -p 443:443 -p 80:80 --network blueprint-net --name nginx -d nginx

