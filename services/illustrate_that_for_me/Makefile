image: node_modules
	docker build \
		--build-arg UID=`id -u` \
		-t demo_api_mashup_node/illustrate_that_for_me \
		.

node_modules:
	mkdir -p ${HOME}/.cache/yarn
	docker run -i --rm \
		-v `pwd`:/build \
		-v ${HOME}/.cache/yarn:/.cache/yarn \
		-e ENV=prod \
		-w /build \
		-u `id -u` \
		bearstech/node-dev:12 \
		yarn install
clean:
	rm -rf node_modules