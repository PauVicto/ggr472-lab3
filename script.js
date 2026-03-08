
//Custom mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoicGF1LXZpY3RvIiwiYSI6ImNta2Rib2s1bTA5d2MzZW9vaGF2a3hrczkifQ.ie1nrw6qR60q70TUdf5B_w';

//Initialize map
const map = new mapboxgl.Map({
    container: 'my-map', //HTML ID container for map
    style: 'mapbox://styles/pau-victo/cmmh1q5st006j01ryg6ri7zi1', //Custom map style from mapbox
    center: [-79.3921, 43.6522], //Center of map once loaded, near grange park
    maxBounds: [
        [-79.45, 43.62], //Southwest map bounds
        [-79.35, 43.69] //Northeast map bounds
    ],
    zoom: 13 //Zoom level when map loads, showcases all points
});


//Add geocoder search bar and navigation controls
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        bbox: [-79.425, 43.635, -79.375, 43.670], //Limits search area to downtown Toronto
        placeholder: 'Search Bar', //Text in search bar
        marker: false //Disables default marker
    }),
    'top-left' //position of search bar on map (top left corner)
);

//Add zoom and rotation controls to top right of map
map.addControl(new mapboxgl.NavigationControl());

//Add data source and draw initial visualisation of points on map with custom icons and popups
map.on('load', () => {

    //GeoJson data added as a source, with generateId to create unique IDs for each feature
    map.addSource('points', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/PauVicto/ggr472-lab3/refs/heads/main/points.geojson',
        generateId: true
    });

    //Add layer to map with custom icons based on category property
    map.addLayer({
        'id': 'points-layer',
        'type': 'symbol',
        'source': 'points',
        'layout': {
            'icon-image': ['match', ['get', 'category'], //If using "category" property, match to specific corresponding icon
                'Cafe', 'cafe', //Category: Cafe, Icon: cafe
                'Restaurant', 'restaurant', //Category: Restaurant, Icon: restaurant
                'Study Spot', 'star', //Category: Study Spot, Icon: star
                'marker'
            ],
            //set icon size based on category//
            'icon-size': ['match', ['get', 'category'],
                'Cafe', 0.9,
                'Restaurant', 0.8,
                'Study Spot', 0.9,
                0.9
            ],
            'icon-allow-overlap': true, //Allows icons to overlap if close together
        }
    });
});


//Change Curser to pointer when hovering over points
map.on('mousemove', 'points-layer', (e) => {
    map.getCanvas().style.cursor = 'pointer';
});

//Reset curser when not hovering over points
map.on('mouseleave', 'points-layer', () => {
    map.getCanvas().style.cursor = '';
});

//Show popup with name and address properties when clicking a location point
map.on('click', 'points-layer', (e) => {
    const name = e.features[0].properties.name; //include name property in popup
    const address = e.features[0].properties.address; //include address property in popup

    new mapboxgl.Popup()
        .setLngLat(e.features[0].geometry.coordinates) //makes popup appear at point location
        .setHTML(`<strong>${name}</strong><p>${address}</p>`) //HTML content of popup with name in bold and address below
        .addTo(map);
});
