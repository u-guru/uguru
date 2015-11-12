angular.module('transit.services', [])
.factory('Routes', [
    Routes]);

function Routes() {

    var routes = [
        {
            provider: 'BART',
            route: 'Embarcadero',
            interval: 'Last one in 3m',
            directions: [
                {
                    // coordinates: {
                        latitude: 37.7931632,
                        longitude: -122.3967035
                    // }
                },
                {
                    // coordinates: {
                        latitude: 37.7767352,
                        longitude: -122.4214401
                    // }
                },
                {
                    // coordinates: {
                        latitude: 37.7895655,
                        longitude: -122.38236
                    // }
                }
            ]
        },
        {
            provider: 'MUNI',
            route: 'K Line',
            interval: '4, 8, 12m',
            directions: [
                {
                    coordinates: {
                        lat: '',
                        lon: ''
                    }
                },
                {
                    coordinates: {
                        lat: '',
                        lon: ''
                    }
                },
                {
                    coordinates: {
                        lat: '',
                        lon: ''
                    }
                }
            ]
        },
        {
            provider: 'Caltrain',
            route: 'Bullet',
            interval: '43m',
            directions: [
                {
                    coordinates: {
                        lat: '',
                        lon: ''
                    }
                },
                {
                    coordinates: {
                        lat: '',
                        lon: ''
                    }
                },
                {
                    coordinates: {
                        lat: '',
                        lon: ''
                    }
                }
            ]
        },
        {
            provider: 'MUNI',
            route: '10, 82 Line',
            interval: '10, 20m',
            directions: [
                {
                    coordinates: {
                        lat: '',
                        lon: ''
                    }
                },
                {
                    coordinates: {
                        lat: '',
                        lon: ''
                    }
                },
                {
                    coordinates: {
                        lat: '',
                        lon: ''
                    }
                }
            ]
        },




    ];


    return {
        getAll: routes,
    };
}

