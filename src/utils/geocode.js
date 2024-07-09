const request = require("request");
const geocode = ((address, callback) => {

    const url = 'https://geocode.maps.co/search?q=' + encodeURIComponent(address) + '&api_key=66842e335806f184912540cgs87e7f8'

    request({url, json: true}, (error, {body}) => {
            if (error) {
                callback('unexpected error', undefined)
            } else if (body.length === 0) {
                callback(' url damaged', undefined)
            } else {

                callback(undefined, {
                    latitude: body[0].lat,
                    longitude: body[0].lon,
                    location: body[0].display_name
                })
            }
        }
    )
})

module.exports = geocode