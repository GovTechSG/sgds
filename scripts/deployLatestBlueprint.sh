sh buildBlueprint.sh
docker rm -f blueprint
docker run --name blueprint --network blueprint-net -d blueprint
