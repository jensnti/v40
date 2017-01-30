function getLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude: " + position.coords.latitude +
                    " Longitude: " + position.coords.longitude);
        });
}