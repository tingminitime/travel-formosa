import {
  SPOT_apiRequest,
  FOOD_apiRequest,
  HOTEL_apiRequest,
  ACTIVITY_apiRequest
} from "./api.js";
import {
  HOME_defaultHTML,
  FILTER_defaultHTML,
  PAGE_defaultHTML
} from './module/template.js'
import { HOME_render } from './home.js'
import { INIT_swiper } from './module/swiper.js'
import { cities } from './module/template.js'

const content = document.querySelector('#content')

// ----- 預設連結並渲染畫面 -----
window.onload = function () {
  // ----- My Desktop -----
  // history.pushState(null, null, '/F2E_3rd/week1/')
  // ----- My Notebook -----
  // history.pushState(null, null, '/F2E_3rd/travel-formosa/')
  // ----- Github -----
  // history.pushState(null, null, '/travel-formosa/')

  history.pushState(null, null, location.pathname)
  renderByUrl(location.hash)
}

// ----- 判斷連結並渲染 -----
function renderByUrl(url) {
  console.log("目前路徑為:", url)
  let hashParams = url.split('/')
  // 去掉 hash 的 #
  hashParams.shift()
  console.log(hashParams)

  // 主頁路由管理
  if (url === "" || url === "#/" || url === "#/home") {
    // 主頁 Content HTML
    content.innerHTML = HOME_defaultHTML
    // 執行主頁資料渲染
    HOME_render()
    // Swiper初始化
    INIT_swiper()
  } else {
    ROUTE_handler(hashParams)
  }
}

// 找參數可用 new URLSearchParams
// 路由管理
function ROUTE_handler(hashArray) {
  const [sort, city, id] = hashArray
  console.log('分類是', sort)

  if (city && !id) {
    console.log('沒有ID')
    const { spotAll, spotCity } = SPOT_apiRequest()
    // 篩選頁面 HTML 初始化
    content.innerHTML = FILTER_defaultHTML

    // 篩選頁面的標題
    const filterTitle = document.querySelector('.filterPage__title')

    // 是否為關鍵字搜尋 ?q='keyword' ( false 為是 )
    const cityStatus = cities.some(item => item['en'] === city)
    if (!cityStatus) {
      console.log('關鍵字搜尋')
    } else {
      console.log('全部或區域搜尋')
    }
  }
  else if (id) {
    console.log('有ID')
    // 介紹頁面 HTML 初始化
    content.innerHTML = PAGE_defaultHTML

    // 回上一頁
    const PAGE_backBtn = document.querySelector('.title__backBtn')
    PAGE_backBtn.addEventListener('click', function (e) {
      history.back()
    }, false)
  }
}

// ----- 景點 Router -----
// ----- 美食 Router -----
// ----- 住宿 Router -----
// ----- 活動 Router -----

// ----- 監聽歷史紀錄變化 -----
window.addEventListener('hashchange', function (e) {
  renderByUrl(location.hash)
})

export { renderByUrl }