import { SORT_apiRequest } from "./api.js";
import {
  HOME_defaultHTML,
  FILTER_defaultHTML,
  PAGE_defaultHTML
} from './module/template.js'
import { HOME_render } from './home.js'
import { INIT_swiper } from './module/swiper.js'
import { cities } from './module/template.js'
import { randomNum } from './module/tool.js'
import getFilterResult from './module/filter.js'
import getPageResult from './module/page.js'

const content = document.querySelector('#content')
const keywordInput = document.querySelector('.search__input')
const { swiper_header, swiper_hotSpot, swiper_page, swiper_nearSpot } = INIT_swiper()

// ----- 預設連結並渲染畫面 -----
window.onload = function () {
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
    swiper_header()
    swiper_hotSpot()
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
      ROUTE_noKeyword({ sort, city })
    }
  }
  // 有 ID
  else if (id) {
    // 介紹頁面 HTML 初始化
    content.innerHTML = PAGE_defaultHTML
    PAGE_request({ sort, city, id })
    // Swiper初始化
    swiper_page()
  }
}

async function ROUTE_noKeyword(routeObj) {
  try {
    let filterData = []
    const { sort, city } = routeObj
    const { SORT_noKeywordAllFilter, SORT_noKeywordCityFilter } = SORT_apiRequest()
    const dataReqMax = 2500
    console.log('無關鍵字網址分析: ', sort, city)

    if (city === 'all') {
      const noKeywordAllFilterRes = await SORT_noKeywordAllFilter(sort)
      // 隨機取資料中長度 dataReqMax 的資料
      const resLength = noKeywordAllFilterRes.data.length
      let takeRandomIndex = randomNum(resLength - dataReqMax)
      resLength >= dataReqMax ?
        filterData = noKeywordAllFilterRes.data.slice(takeRandomIndex, takeRandomIndex + dataReqMax) :
        filterData = noKeywordAllFilterRes.data
    } else {
      const noKeywordCityFilterRes = await SORT_noKeywordCityFilter(sort, city)
      filterData = noKeywordCityFilterRes.data
    }
    console.log('(無關鍵字搜尋資料)filterData: ', filterData)

    if (filterData.length === 0) {
      alert('查無結果，請重新輸入關鍵字搜尋。')
      keywordInput.focus()
      return
    }
    // 執行篩選頁面資料渲染 & 頁碼模組
    getFilterResult(filterData, sort)
    console.log('無關鍵字搜尋的分類是: ', sort)
  }
  catch (err) {
    console.log('無關鍵字搜尋失敗: ', err)
  }
}

// 精選主題在這個 function 判斷
async function ROUTE_keyword(routeObj) {
  try {
    let filterData = []
    const { sort, odataCity, keyword } = routeObj
    const { SORT_keywordAllFilter, SORT_keywordCityFilter } = SORT_apiRequest()
    const dataReqMax = 2500
    console.log('關鍵字網址分析: ', sort, odataCity, keyword)

    // 取得關鍵字搜尋資料
    if (odataCity === 'all') {
      const keywordAllFilterRes = await SORT_keywordAllFilter(sort, keyword)
      // 隨機取資料中長度 dataReqMax 的資料
      const resLength = keywordAllFilterRes.data.length
      let takeRandomIndex = randomNum(resLength - dataReqMax)
      resLength >= dataReqMax ?
        filterData = keywordAllFilterRes.data.slice(takeRandomIndex, takeRandomIndex + dataReqMax) :
        filterData = keywordAllFilterRes.data
    } else {
      const sortCityFilterRes = await SORT_keywordCityFilter(sort, odataCity, keyword)
      filterData = sortCityFilterRes.data
    }
    console.log('(關鍵字搜尋資料)filterData: ', filterData)

    if (filterData.length === 0) {
      alert('查無結果，請重新輸入關鍵字搜尋。')
      keywordInput.focus()
      return
    }
    // 執行篩選頁面資料渲染 & 頁碼模組
    getFilterResult(filterData, sort)
    console.log('關鍵字搜尋的分類是: ', sort)
  }
  catch (err) {
    console.error('關鍵字搜尋失敗: ', err)
  }
}

async function PAGE_request(routeObj) {
  try {
    const { sort, city, id } = routeObj
    const { SORT_pageFilter } = SORT_apiRequest()
    const pageFilterRes = await SORT_pageFilter(sort, id)
    let pageData = pageFilterRes.data[0]
    console.log('pageData: ', pageData)

    getPageResult(pageData, sort)
    // Swiper初始化
    swiper_page()
    swiper_nearSpot()
  }
  catch (err) {
    console.error('ID資料取得失敗: ', err)
  }

}

// ----- 監聽歷史紀錄變化 -----
// window.addEventListener('hashchange', function (e) {
//   // Filter 換頁不觸發 renderByUrl
//   if (!location.hash.includes('&page=')) {
//     currentPage = location.hash.split('&page=')[1]
//   }
//   else renderByUrl(location.hash)
//   console.log('偵測網址變更')
// }, false)

export { renderByUrl }