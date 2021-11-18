import {
  SORT_apiRequest,
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
import getFilterResult from './module/filter.js'

const content = document.querySelector('#content')
const keywordInput = document.querySelector('.search__input')

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

// 路由管理
function ROUTE_handler(hashArray) {
  const [sort, city, id] = hashArray

  // 沒有 ID
  if (city && !id) {
    // 篩選頁面 HTML 初始化
    content.innerHTML = FILTER_defaultHTML
    // 篩選頁面的標題
    const filterTitle = document.querySelector('.filterPage__title')

    // 是否為關鍵字搜尋 ?search='keyword' ( false 為是 )
    const cityStatus = cities.some(item => item['en'] === city)
    if (!cityStatus) {
      // 從 hashArray 的 city 取出 search 關鍵字
      const odata = city.match(/([?].*?[=])/)[0] // ?search=
      const odataSplit = city.split(odata)
      const [odataCity, keyword] = odataSplit
      console.log('關鍵字搜尋功能')
      ROUTE_keyword({ sort, odataCity, keyword })
    } else {
      console.log('無關鍵字，全部or區域搜尋功能')
    }
  }
  // 有 ID
  else if (id) {
    // 介紹頁面 HTML 初始化
    content.innerHTML = PAGE_defaultHTML
    // 回上一頁
    const PAGE_backBtn = document.querySelector('.title__backBtn')
    PAGE_backBtn.addEventListener('click', function (e) {
      history.back()
    }, false)
  }
}

// 精選主題在這個 function 判斷
async function ROUTE_keyword(routeObj) {
  try {
    let filterData = []
    const { sort, odataCity, keyword } = routeObj
    const { sortAllFilter, sortCityFilter } = SORT_apiRequest()
    console.log(sort, odataCity, keyword)

    // 取得關鍵字搜尋資料
    if (odataCity === 'all') {
      const sortAllFilterRes = await sortAllFilter(sort, keyword)
      filterData = sortAllFilterRes.data
    } else {
      const sortCityFilterRes = await sortCityFilter(sort, odataCity, keyword)
      filterData = sortCityFilterRes.data
    }
    console.log('關鍵字搜尋資料 filterData: ', filterData)

    if (filterData.length === 0) {
      alert('查無結果，請重新輸入關鍵字搜尋。')
      keywordInput.focus()
      return
    }
    getFilterResult(filterData, sort)
  }
  catch (err) {
    console.error(err)
  }
}

// ----- 監聽歷史紀錄變化 -----
window.addEventListener('hashchange', function (e) {
  // Filter 換頁不觸發 renderByUrl
  if (location.hash.includes('&page=')) return
  else renderByUrl(location.hash)
  console.log('偵測網址變更')
}, false)

export { renderByUrl }