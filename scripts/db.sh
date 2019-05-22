#!/bin/sh

case "$1" in
  development)
   CONTAINER=docker_database-development_1
   BACKUP_FILE=db_development.dump
   ;;
  production)
   CONTAINER=docker_database_1
   BACKUP_FILE=db.dump
   ;;
  *)
  echo $"Usage: $0 {development|production}"
  exit 1
esac

case "$2" in
  backup)
    if [ -z "$3" ]
    then
      echo "Please provide database admin username as 3rd argument"
      exit 1
    fi

    if [ -z "$4" ]
    then
      echo "Please provide database admin password as 4th argument"
      exit 1
    fi

    docker exec $CONTAINER bash -c 'mongodump --username '$3' --password '$4' --archive' > $BACKUP_FILE
    ;;

  restore)
    if [ -z "$3" ]
    then
      echo "Please provide database admin username as 3rd argument"
      exit 1
    fi

    if [ -z "$4" ]
    then
      echo "Please provide database admin password as 4th argument"
      exit 1
    fi

    if [ -z "$5" ]
    then
      echo "Please provide a mongo backup file as 5th argument"
      exit 1
    fi

    docker exec -i $CONTAINER bash -c 'mongorestore --username '$3' --password '$4' --archive' < $5
    ;;

  empty)
    if [ -z "$3" ]
    then
      echo "Please provide database admin username as 3rd argument"
      exit 1
    fi

    if [ -z "$4" ]
    then
      echo "Please provide database admin password as 4th argument"
      exit 1
    fi

    if [ -z "$5" ]
    then
      echo "Please provide databse name to drop as 5th argument"
      exit 1
    fi

    docker exec -i $CONTAINER bash -c 'mongo '$5'  --authenticationDatabase admin --username '$3' --password '$4' --eval "db.dropDatabase();"'
    ;;
  *)
  echo $"Usage: $0 $1 {backup|restore|empty}"
  exit 1
esac



