SHELL := /bin/bash

docker:
	docker build -t dto-frontend .
docker-run:
	docker run -it --rm -p 60000:60000 -t dto-frontend
