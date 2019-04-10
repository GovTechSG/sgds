version=$(cat version)
IMAGE_NAME="sgds/portal:"$version

if [ $1 = "--delete-dangling" -o $1 = "-d" ]; then
    echo "Cleaning up dangling images..."
    docker images -q --filter dangling=true | xargs docker rmi
fi

docker build --no-cache --tag $IMAGE_NAME .