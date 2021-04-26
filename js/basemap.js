/* -------------------------------------------------------------------------- */
/*                                load basemap                                */
/* -------------------------------------------------------------------------- */

const map = L.map('map').setView([
    -0.033, 109.34
], 13);
let layer = L.esri.basemapLayer('Topographic').addTo(map);
let layerLabels;

function setBasemap(basemap) {
    if (layer) {
        map.removeLayer(layer);
    }
    layer = L.esri.basemapLayer(basemap);
    map.addLayer(layer);
    if (layerLabels) {
        map.removeLayer(layerLabels);
    }

    if (basemap === 'ShadedRelief' || basemap === 'Oceans' || basemap === 'Gray' || basemap === 'DarkGray' ||
        basemap === 'Imagery' || basemap === 'Terrain') {

        layerLabels = L.esri.basemapLayer(basemap + 'Labels');
        map.addLayer(layerLabels);
    }
}

let basemaps = document.getElementById('basemaps');

basemaps.addEventListener('change', function () {
    setBasemap(basemaps.value);
});

/* -------------------------------------------------------------------------- */
/*                               GEOJSON Section                              */
/* -------------------------------------------------------------------------- */
