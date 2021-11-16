#!/usr/bin/sh
# copy src and package json
copyStuff() {
	cp -r ./src ./lin64/
	cp -r ./src ./win64
	cp -r ./src ./mac64

	cp ./package.json ./lin64/
	cp ./package.json ./win64/
	cp ./package.json ./mac64/

	cp -r ./sdata ./lin64/
	cp -r ./sdata ./win64/
	cp -r ./sdata ./mac64/

	cp ./uprefs.json ./lin64/
	cp ./uprefs.json ./win64/
	cp ./uprefs.json ./mac64/
}

execute() {
	./lin64/nw --debug &
}

copyStuff
execute

# listen
while true; do
	sleep 0.1
	read -rsn1 input
	if [ "$input" = "b" ]; then
		copyStuff
		echo "ran build"
	fi

	if [ "$input" = "r" ]; then
		sleep 0.05
		killall nw
		sleep 0.01
		killall nw
		sleep 0.01
		killall nw
		sleep 0.01
		killall nw
		sleep 0.01
		exec ./build.sh && exit
	fi
done
