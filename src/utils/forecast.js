const request = require('request')


const forecast = (long, lat, callback) => {
    const url = 'https://api.pirateweather.net/forecast/977SMvQ0mWBLEb6kmGcg33uOaJtrkXPT/' + long + ',' + lat + '?units=si'

    request({url, json: true}, (error, response) => {
            if (error) {
                callback('unexpected error', undefined)
            } else if (response.body.statusCode === 400 || response.statusCode === 400) {
                callback('unable to find location', undefined)
            } else

                callback(undefined,
                    response.body.daily.data[0].icon + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    )

}

module.exports = forecast