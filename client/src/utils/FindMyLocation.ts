async function findMyLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const geoLocation = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`;

                const url = await fetch(geoLocation);
                const response = await url.json();

                resolve(response);
            },

            (error) => reject(error)
        );
    });
}

export default findMyLocation;
