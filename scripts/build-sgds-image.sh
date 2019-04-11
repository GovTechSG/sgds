version=$(cat version)
IMAGE_NAME="sgds/portal:"$version
IMAGE_FILE_NAME="sgds-portal-v"$version".tar.gz"
IMAGE_FILE_HASH=$IMAGE_FILE_NAME".md5"

if [ $1 = "--delete-dangling" -o $1 = "-d" ]; then
    echo "Cleaning up dangling images..."
    docker images -q --filter dangling=true | xargs docker rmi
fi

docker build --no-cache --tag $IMAGE_NAME .

# Save image out to tar.gz for scp
docker save $IMAGE_NAME | gzip > $IMAGE_FILE_NAME

# Generate MD5 hash
md5sum $IMAGE_FILE_NAME > $IMAGE_FILE_HASH