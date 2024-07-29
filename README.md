# Discounting Platform Favorite Service

This is the Favorite microservice for the Discounting Platform project. This service is responsible for storing and managing items tagged as favorites for users.

## Launching

### Build an image

Dev:

`docker build -t favorite-service -f Dockerfile.dev`

Prod:

`docker build -t favorite-service Dockerfile`

### Run the container

`docker run -d -p 8080:80 favorite-service`

If you want to run the entire project, please go to the [parent repository](https://github.com/vb-ee/discount-platform).
