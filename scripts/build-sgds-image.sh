version=$(cat version)
IMAGE_NAME="sgds/portal:"$version
FILE_NAME="sgds-portal-v"$version".tar.gz"
if [ $1 = "--delete-dangling" -o $1 = "-d" ]; then
    echo "Cleaning up dangling images..."
    docker images -q --filter dangling=true | xargs docker rmi
fi

docker build --no-cache --tag $IMAGE_NAME .

# Ensure that the directory exists.
mkdir images

# Save image out to tar.gz for scp
docker save $IMAGE_NAME | gzip > $FILE_NAME