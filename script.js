mapboxgl.accessToken = 'pk.eyJ1IjoicGF1LXZpY3RvIiwiYSI6ImNta2Rib2s1bTA5d2MzZW9vaGF2a3hrczkifQ.ie1nrw6qR60q70TUdf5B_w';

const map = new mapboxgl.Map({
    container: 'my-map',
    style: 'mapbox://styles/pau-victo/cmmh1q5st006j01ryg6ri7zi1',
    center: [-79.3921, 43.6522],
    maxBounds: [
        [-79.45, 43.62],
        [-79.35, 43.69]
    ],
    zoom: 13
});


map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        bbox: [-79.425, 43.635, -79.375, 43.670],
        placeholder: 'Search Bar',
        marker: false
    }),
    'top-left'
);

map.addControl(new mapboxgl.NavigationControl());

map.on('load', () => {
    map.addSource('points', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/PauVicto/ggr472-lab3/refs/heads/main/points.geojson',
        generateId: true
    });

    map.addLayer({
        'id': 'points-layer',
        'type': 'symbol',
        'source': 'points',
        'layout': {
            'icon-image': ['match', ['get', 'category'],
                'Cafe', 'cafe',
                'Restaurant', 'restaurant',
                'Study Spot', 'star',
                'marker'
            ],
            'icon-size': ['match', ['get', 'category'],
                'Cafe', 0.9,
                'Restaurant', 0.8,
                'Study Spot', 0.9,
                0.9
            ],
            'icon-allow-overlap': true,
        }
    });
});



map.on('mousemove', 'points-layer', (e) => {
    map.getCanvas().style.cursor = 'pointer';
});


map.on('mouseleave', 'points-layer', () => {
    map.getCanvas().style.cursor = '';
});

map.on('click', 'points-layer', (e) => {
    const name = e.features[0].properties.name;
    const address = e.features[0].properties.address;

    new mapboxgl.Popup()
        .setLngLat(e.features[0].geometry.coordinates)
        .setHTML(`<strong>${name}</strong><p>${address}</p>`)
        .addTo(map);
});
