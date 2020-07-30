image: vendor
	docker build \
		--build-arg UID=`id -u`\
		-t demo-cms \
		.

vendor:
	docker run -t --rm \
		-v `pwd`:/build \
		-v ${HOME}/.composer:/.composer \
		-w /build \
		-u `id -u` \
		bearstech/php-composer:7.3 \
		composer install

clean:
	rm -rf vendor