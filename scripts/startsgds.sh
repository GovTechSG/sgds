docker run --name sgds --network sgds-net -d sgds
docker run -p 443:443 -p 80:80 --network sgds-net --name nginx -d nginx

