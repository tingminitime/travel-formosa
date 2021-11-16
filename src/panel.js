import { renderByUrl } from './router.js'
import { cities } from './module/template.js'

const body = document.querySelector('body')
const panel = document.querySelector('.panel')
const navFilterBtn = document.querySelector('.nav__filterBtn')

// ----- Pannel 元件 -----
// 手機版收和按鈕
const panelHideBtn = document.querySelector('.filter__toggle')
// 目的地選擇
const citySelect = document.querySelector('.citySelect__choose')
const areaSection = document.querySelector('.citySelect__areaSection')
const toggleIcon = document.querySelector('.citySelect__toggleIcon')
const filterList = document.querySelectorAll('.citySelect__filterList')
const cityName = document.querySelector('.citySelect__cityName')
// 搜尋關鍵字 input
// const searchKeyword = document.querySelector('.search__input')
// 精選主題
const themeList = document.querySelector('.theme__list')
// 搜尋按鈕
const search = document.querySelector('.search__confirm')

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
            data-city="${item['en']}"
          >${item['name']}</a>
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

// 點擊篩選地區後 => 傳入 cityName 文字
function selectCity(e) {
  // console.log(e.target)
  if (!e.target.classList.contains('citySelect__filterBtn')) return
  cityName.textContent = e.target.textContent
  cityName.classList.add('citySelect__cityName--selected')
  cityName.dataset.city = e.target.dataset.city
}

// 清除目的地
function clearCity(e) {
  if (!e.target.closest('.citySelect__close')) return
  cityName.textContent = '目的地'
  cityName.classList.remove('citySelect__cityName--selected')
  cityName.dataset.city = 'all'
}

// 精選主題選擇
let prevThemeBtn
function themeSelect(e) {
  if (!e.target.closest('.theme__item')) return
  let themeBtn = e.target.closest('.theme__item .theme__btn')
  themeBtn.classList.toggle('active')

  themeBtn.dataset.select === 'false' ?
    themeBtn.dataset.select = 'true' :
    themeBtn.dataset.select = 'false'
  if (prevThemeBtn && prevThemeBtn !== themeBtn) {
    prevThemeBtn.classList.remove('active')
    prevThemeBtn.dataset.select = 'false'
  }
  prevThemeBtn = themeBtn
}

// 搜尋 Task
let filterObj = {
  keyword: '',
  city: '',
  sort: ''
}

function searchHandler() {
  // 檢查 精選主題 是否有選擇
  const themeBtn = document.querySelectorAll('.theme__btn')
  const themeSelectStatus = [...themeBtn].every(item => {
    return item.dataset.select === 'false'
  })
  if (themeSelectStatus) {
    alert('請選擇「精選主題」')
    console.log('prevThemeBtn: ', prevThemeBtn)
    return
  }

  // 關鍵字
  const searchKeyword = document.querySelector('.search__input')
  filterObj['keyword'] = searchKeyword.value
  // 目的地
  const selectCity = document.querySelector('.citySelect__cityName')
  filterObj['city'] = selectCity.dataset.city
  // 精選主題
  const selectThemeBtn = [...themeBtn].find(item => {
    return item.dataset.select === 'true'
  })
  filterObj['sort'] = selectThemeBtn.dataset.sort

  // 搜尋後 => 變換 url hash
  const { keyword, city, sort } = filterObj
  const url = keyword ? `#/${sort}/${city}?search=${keyword}` : `#/${sort}/${city}`
  // console.log(url)
  history.pushState(null, null, url)
  // router 判斷渲染畫面
  renderByUrl(location.hash)
  console.log(filterObj)
}

// ----- 監聽 -----
// Panel
navFilterBtn.addEventListener('click', togglePanel, false)
panelHideBtn.addEventListener('click', togglePanel, false)
citySelect.addEventListener('click', toggleFilterList, false)
body.addEventListener('click', closeFilterList, false)
areaSection.addEventListener('click', selectCity, false)
citySelect.addEventListener('click', clearCity, false)
themeList.addEventListener('click', themeSelect, false)
search.addEventListener('click', searchHandler, false)

// ----- export -----
export { filterObj }

// ----- Content -----
// 假資料待 Api get
let exObj = {
  DescriptionDetail: "閃耀著白色光芒的細軟沙灘平直的海岸、細軟的沙灘，對於多岩灘的馬祖而言，坂里的一片白色沙灘特別顯得珍貴。坂里沙灘是一處開口東南向的灣澳，每年夏天都會受到季風的吹襲，再加上洋流夾帶而來的泥沙，日積月累形成一大片平坦的沙灘，橫臥在藍天碧海之中。由芹山、坂山、里山圍繞的坂里沙灘是馬祖最平整、最廣闊的優質沙灘，與午沙沙灘相連成一片綿延的海岸線，中間設有木棧道連結，因砂質含有石英成分，當陽光照射時，整片沙灘會閃耀著白色內斂的光芒，不管是看日出，或是觀夕陽，坂里沙灘都能讓人體驗光影雲彩變幻之美。層層蕩漾的海浪輕拂著沙灘，適合戲水踏浪，也漸漸成為居民、遊客漫步或欣賞海景的好去處；這樣美麗夢幻的一片沙灘，就位在北竿遊客中心後面，如果有來遊客中心一趟，不妨順道走訪綿延的金黃沙岸，踩踩沁涼海水、散心賞海景。小巧多彩坂里天后宮 麻雀雖小五臟俱全坂里沙灘往白沙港方向的不遠處，有間堪稱全世界最小、最迷你的媽祖天后宮，色彩豐富鮮艷的建築外觀常常吸引過路人目光，和當地樸實無華的民宅形成強烈對比。廟前有兩個可愛的石獅子，廟簷有千里眼及順風耳，雖然只是海邊一間小小廟宇，卻帶給遊客大大驚喜，是寬闊海灘風景中的視覺重點，經過此地時也前往祈福求個平安吧！地址：連江縣北竿鄉坂里村94號"
}

// 介紹文字斷行
function introContentBreakWord(target) {
  let contentAry = target.split('。')
  // console.log(contentAry)
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