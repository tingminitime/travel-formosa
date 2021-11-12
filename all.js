let cities = [
  { en: 'Taipei', zh: '台北', area: 'north' },
  { en: 'NewTaipei', zh: '新北', area: 'north' },
  { en: 'Taoyuan', zh: '桃園', area: 'north' },
  { en: 'Hsinchu', zh: '竹市', area: 'north' },
  { en: 'HsinchuCounty', zh: '竹縣', area: 'north' },
  { en: 'YilanCounty', zh: '宜蘭', area: 'north' },
  { en: 'Keelung', zh: '基隆', area: 'north' },
  { en: 'MiaoliCounty', zh: '苗栗', area: 'central' },
  { en: 'Taichung', zh: '台中', area: 'central' },
  { en: 'ChanghuaCounty', zh: '彰化', area: 'central' },
  { en: 'NantouCounty', zh: '南投', area: 'central' },
  { en: 'YunlinCounty', zh: '雲林', area: 'central' },
  { en: 'ChiayiCounty', zh: '嘉縣', area: 'south' },
  { en: 'Chiayi', zh: '嘉市', area: 'south' },
  { en: 'Tainan', zh: '台南', area: 'south' },
  { en: 'Kaohsiung', zh: '高雄', area: 'south' },
  { en: 'PingtungCounty', zh: '屏東', area: 'south' },
  { en: 'HualienCounty', zh: '花蓮', area: 'east' },
  { en: 'TaitungCounty', zh: '臺東', area: 'east' },
  { en: 'KinmenCounty', zh: '金門', area: 'island' },
  { en: 'PenghuCounty', zh: '澎湖', area: 'island' },
  { en: 'LienchiangCounty', zh: '連江', area: 'island' },
]

const body = document.querySelector('body')
const panel = document.querySelector('.panel')
const navFilterBtn = document.querySelector('.nav__filterBtn')
const panelHideBtn = document.querySelector('.filter__toggle')

const citySelect = document.querySelector('.citySelect__choose')
const areaSection = document.querySelector('.citySelect__areaSection')
const toggleIcon = document.querySelector('.citySelect__toggleIcon')
const filterList = document.querySelectorAll('.citySelect__filterList')
const cityName = document.querySelector('.citySelect__cityName')
const searchKeyword = document.querySelector('.search__input')
const search = document.querySelector('.search__confirm')

let filterObj = {
  city: '',
  keyword: ''
}

// ----- 初始化 -----
loadCitiesToFilter()

// ----- 載入地區資料至目的地篩選清單 -----
function loadCitiesToFilter() {
  filterList.forEach(area => {
    let areaItem = ''
    cities.forEach(item => {
      if (item['area'] === area.dataset.area) {
        areaItem += /*html*/ `
        <li class="citySelect__filterItem">
          <a
            href="javascript:;"
            class="citySelect__filterBtn"
            data-name="${item['en']}"
          >${item['zh']}</a>
        </li>
        `
      }
    })
    area.innerHTML = areaItem
  })
}

// ----- Panel 展開 / 收合 -----
function togglePanel() {
  panel.classList.toggle('show')
}

// ----- 目的地篩選列表 展開 / 收合 -----
function toggleFilterList(e) {
  if (e.target.closest('.citySelect__close')) return
  e.stopPropagation()
  areaSection.classList.toggle('active')
  toggleIcon.classList.toggle('active')
}

function closeFilterList(e) {
  areaSection.classList.remove('active')
}

// ----- 點擊篩選地區後 => 傳入 cityName 文字  -----
function selectCity(e) {
  // console.log(e.target)
  if (!e.target.classList.contains('citySelect__filterBtn')) return
  cityName.textContent = e.target.textContent
  filterObj['city'] = e.target.dataset.name
  cityName.classList.add('citySelect__cityName--selected')
}

function clearCity(e) {
  if (!e.target.closest('.citySelect__close')) return
  cityName.textContent = '目的地'
  filterObj['city'] = ''
  cityName.classList.remove('citySelect__cityName--selected')
}

function keywordHandler(e) {
  // --- 待新增活動資訊 ---
  filterObj['keyword'] = e.target.value
}

function searchHandler() {
  console.log(filterObj)
}

// ----- 監聽 -----
navFilterBtn.addEventListener('click', togglePanel, false)
panelHideBtn.addEventListener('click', togglePanel, false)
citySelect.addEventListener('click', toggleFilterList, false)
body.addEventListener('click', closeFilterList, false)
areaSection.addEventListener('click', selectCity, false)
citySelect.addEventListener('click', clearCity, false)
// searchKeyword.addEventListener('keyup', keywordHandler, false)
searchKeyword.addEventListener('change', keywordHandler, false)
search.addEventListener('click', searchHandler, false)


// ----- Content -----
// 假資料待 Api get
let exObj = {
  DescriptionDetail: "閃耀著白色光芒的細軟沙灘平直的海岸、細軟的沙灘，對於多岩灘的馬祖而言，坂里的一片白色沙灘特別顯得珍貴。坂里沙灘是一處開口東南向的灣澳，每年夏天都會受到季風的吹襲，再加上洋流夾帶而來的泥沙，日積月累形成一大片平坦的沙灘，橫臥在藍天碧海之中。由芹山、坂山、里山圍繞的坂里沙灘是馬祖最平整、最廣闊的優質沙灘，與午沙沙灘相連成一片綿延的海岸線，中間設有木棧道連結，因砂質含有石英成分，當陽光照射時，整片沙灘會閃耀著白色內斂的光芒，不管是看日出，或是觀夕陽，坂里沙灘都能讓人體驗光影雲彩變幻之美。層層蕩漾的海浪輕拂著沙灘，適合戲水踏浪，也漸漸成為居民、遊客漫步或欣賞海景的好去處；這樣美麗夢幻的一片沙灘，就位在北竿遊客中心後面，如果有來遊客中心一趟，不妨順道走訪綿延的金黃沙岸，踩踩沁涼海水、散心賞海景。小巧多彩坂里天后宮 麻雀雖小五臟俱全坂里沙灘往白沙港方向的不遠處，有間堪稱全世界最小、最迷你的媽祖天后宮，色彩豐富鮮艷的建築外觀常常吸引過路人目光，和當地樸實無華的民宅形成強烈對比。廟前有兩個可愛的石獅子，廟簷有千里眼及順風耳，雖然只是海邊一間小小廟宇，卻帶給遊客大大驚喜，是寬闊海灘風景中的視覺重點，經過此地時也前往祈福求個平安吧！地址：連江縣北竿鄉坂里村94號"
}

function introContentBreakWord(target) {
  let contentAry = target.split('。')
  console.log(contentAry)
  const content = document.querySelector('.intro__content')
  let sentence = ''
  contentAry.forEach(item => {
    sentence += `
      <p>${item}。</p>
    `
  })
  content.innerHTML = sentence
}
introContentBreakWord(exObj['DescriptionDetail'])

// ----- Leaflet -----
let myMap = L.map('myMap').setView([22.6871251, 120.3142551], 15);
let markers = L.markerClusterGroup();

// Mapbox 服務
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1Ijoid2hlYXQwMTIwIiwiYSI6ImNrdjdpMWwxNjQ4MGUycHA2eHI0eTVyMHkifQ.1SVA67os6dCKMhDrej8tYQ'
}).addTo(myMap);

// 使用 navigator web api 獲取當下位置 (lon lat)
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    // success 成功獲取位置
    success => {
      const longitude = success.coords.longitude
      const latitude = success.coords.latitude
      const timestamp = success.timestamp
      let formatTimestamp = new Date(timestamp)
      console.log(success)
      console.log(`(成功獲取當前位置) 經度: ${longitude} 緯度: ${latitude} 時間: ${formatTimestamp}`)
      // render view current position
      myMap.setView([latitude, longitude], 15)

      markers.addLayer(L.marker([latitude, longitude]))
        .addTo(myMap)

      myMap.addLayer(markers)
    },
    // error 獲取位置失敗
    error => console.error(error.code, error.message)
  )
}


// API 驗證 (TDX 提供)
function GetAuthorizationHeader() {
  var AppID = '298e24d8dcd5462d94df034984044beb';
  var AppKey = 'u2fa9eTpee-g9HdU2diZCLoFDhY';

  var GMTString = new Date().toGMTString();
  var ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  var HMAC = ShaObj.getHMAC('B64');
  var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

  return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/ }; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}