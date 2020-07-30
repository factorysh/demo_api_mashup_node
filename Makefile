images:
	make -C services/cms image
	make -C services/illustrate_that_for_me image
	make -C services/ingress image

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f