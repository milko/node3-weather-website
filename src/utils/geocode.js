const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibXNrb2ZpYyIsImEiOiJjanN4ZWxteXEwMXZpNDRwaGJnZDd3ZGNjIn0.SxeuGXDcKgizM7SoVujt7w&limit=1`
    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback("Unable to connect to geocoding service.", undefined)
        } else if(body.features.length === 0) {
            callback("Location not found.", undefined)
        } else {
            const { center, place_name:place} = body.features[ 0 ]
            callback(undefined, {
                latitude: center[ 1 ],
                longitude: center[ 0 ],
                location: place
            })
        }
    })
}

module.exports = geocode
