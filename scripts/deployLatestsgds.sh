sh buildsgds.sh
docker rm -f sgds
docker run --name sgds --network sgds-net -d sgds
