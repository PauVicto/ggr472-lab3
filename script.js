mapboxgl.accessToken = 'pk.eyJ1IjoicGF1LXZpY3RvIiwiYSI6ImNta2Rib2s1bTA5d2MzZW9vaGF2a3hrczkifQ.ie1nrw6qR60q70TUdf5B_w';

const map = new mapboxgl.Map({
    container: 'my-map',
    style: 'mapbox://styles/pau-victo/cmldhwais00d401qq1p97ayx5',
    center: [-79.39699, 43.65140],
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
        placeholder: 'Search Cafes, Restaurants, and Study Spots',
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
                'Cafe', 0.8,
                'Restaurant', 0.8,
                'Study Spot', 0.8,
                0.8
            ],
            'icon-allow-overlap': true,
        },
        'paint': {
            'icon-opacity': 0.8,
            'icon-color': ['match', ['get', 'category'],
                'Cafe', '#ff38ff',
                'Restaurant', '#1317fc',
                'Study Spot', '#f54013',
                '#ffffff'
            ]
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
