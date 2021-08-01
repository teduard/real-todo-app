#!/bin/bash

pArg="$1"

pName="redis-api-cache"
pCName=$pName'-container'
pPort=6379

case $pArg in 
    -start)
        echo "Trying to start Redis container $pName on port $pPort."

        if [ `docker image ls --all | grep $pName | wc -l` = 0 ]; then
            echo 'Trying to build image.'
            docker build -t $pName .
        fi

        if [ `docker container ls --all | grep $pCName | wc -l` = 0 ]; then
            echo 'Trying to create container.'
            docker run -dp $pPort:$pPort --name $pCName $pName
            docker container start $pCName
        else 
            echo 'Trying to start container '$pCName'.'
            docker container start $pCName
        fi

        echo "Redis available in container $pName on port $pPort."
        ;;
    -stop)
        echo "Trying to stop Redis container $pName."

        if [ `docker container ps | grep $pName | wc -l` > 0 ]; then
            docker container stop $pCName
        fi
        ;;
    -erase)
        echo "Redis erase performed."
        docker container stop $pCName
        docker container rm $pCName
        docker image rm $pName
        ;;
    -reset)
        echo "Redis reset performed."
        docker container stop $pCName
        docker container rm $pCName
        docker image rm $pName
        docker build -t $pName .
        docker run -dp $pPort:$pPort --name $pCName $pName 
        docker start $pCName
        ;;
    *)
        printf "Please provide parameter: \\n\
            -start\\n\
                Builds and starts the docker container running Redis. Pwd protected and running on localhost:6379\\n\
            -stop\\n\
                Stops the docker container\\n\
            -reset\\n\
                Rebuilds the docker image and starts a new container\\n\
            -erase\\n\
                Deletes the docker container and image.\\n"
esac