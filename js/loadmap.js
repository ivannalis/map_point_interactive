const GEOJSON_PATH = 'assets/geojson/shop_address.geojson'

var serviceIcon = L.icon({
    iconUrl: 'assets/geojson/placeholder.png',
    iconSize: [25, 25],
    shadowSize: [0, 0],
    iconAnchor: [10, 10],
    shadowAnchor: [0, 0],
    popupAnchor: [-10, -10]
   });

let file = $.ajax({
    url: GEOJSON_PATH,
    dataType: "json",
    success: console.log("County data successfully loaded."),
    error: function (xhr) {
        alert(xhr.statusText)
    }
})

$.when(file).done(function () {
    let layer = file.responseJSON
    let option = document.getElementById('locationfilter')
    let address = []

    for (let i = 0; i < layer.features.length; i++) {
        address.push(
            {
                'Address': layer.features[i].properties.Name,
                'Coordinates': layer.features[i].geometry.coordinates[0]
            }
        )
    }

    for (let j = 0; j < address.length; j++) {
        var newOption = document.createElement("option");
        newOption.text = address[j].Address;
        newOption.value = address[j].Coordinates;
        option.add(newOption);
    }

    let oneach = function popUp(f, l) {
        var out = [];
        if (f.properties) {
            for (key in f.properties) {
                out.push(key + ": " + f.properties[key]);
            }
            l.bindPopup(out.join("<br />"));

        }
    }
    let layers = L.geoJSON(layer, { onEachFeature: oneach,pointToLayer: function (feature, latlng) {
        let marker = L.marker(latlng,{icon: serviceIcon});
        return marker;
    } }).addTo(map)
})

function ShowCoor(s) {
    let flyto = []
    if(s[s.selectedIndex].id === 'default'){
        map.setView([
            -0.033, 109.34
        ], 13);
    } else {
        let coor = (s[s.selectedIndex].value).split(",").map(a => { return parseFloat(a) })
        flyto.push(coor[1])
        flyto.push(coor[0])
        map.flyTo(flyto, 17);
    }
}
