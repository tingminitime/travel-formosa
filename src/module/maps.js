// ----- Leaflet -----
// let myMap = L.map('myMap').setView([22.6871251, 120.3142551], 15);
// let markers = L.markerClusterGroup();

export function initMap(mapObj) {
  let { lat, lon, name, location } = mapObj
  let myMap = L.map('myMap').setView([lat, lon], 15);

  // Mapbox 服務
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoid2hlYXQwMTIwIiwiYSI6ImNrdjdpMWwxNjQ4MGUycHA2eHI0eTVyMHkifQ.1SVA67os6dCKMhDrej8tYQ'
  }).addTo(myMap);

  let marker = L.marker([lat, lon]).addTo(myMap);
  marker.bindPopup(/* html */`
    <h2 class="map__popTitle">${name}</h2>
    <p class="map__location">地址: <br>${location}</p>
  `).openPopup();
  myMap.addLayer(marker)

}

export function getLocation() {
  // 使用 navigator web api 獲取當下位置 (lon lat)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      // success 成功獲取位置
      success => {
        const longitude = success.coords.longitude
        const latitude = success.coords.latitude
        const timestamp = success.timestamp
        let formatTimestamp = new Date(timestamp)
        // console.log(success)
        console.log(`(成功獲取當前位置) 經度: ${longitude} 緯度: ${latitude} 時間: ${formatTimestamp}`)
        // render view current position
        mapId.setView([latitude, longitude], 15)

        markers.addLayer(L.marker([latitude, longitude]))
          .addTo(mapId)

        mapId.addLayer(markers)
      },
      // error 獲取位置失敗
      error => console.error(error.code, error.message)
    )
  }
}