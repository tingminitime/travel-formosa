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
import { filterObj } from './panel.js'

const content = document.querySelector('#content')
const noImageUrl = 'img/noimage.png'

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
    let pageState = {
      itemPerPage: 9,
      currentPage: ''
    }

    const filterList = document.querySelector('.filterPage__list')
    const { sort, odataCity, keyword } = routeObj
    const { sortAllFilter, sortCityFilter } = SORT_apiRequest()
    console.log(sort, odataCity, keyword)

    if (odataCity === 'all') {
      const sortAllFilterRes = await sortAllFilter(sort, keyword)
      filterData = sortAllFilterRes.data
      console.log(filterData)
    } else {
      const sortCityFilterRes = await sortCityFilter(sort, odataCity, keyword)
      filterData = sortCityFilterRes.data
      console.log(filterData)
    }

    // 要做一頁 9 個 card 的功能
    switch (sort) {
      case 'ScenicSpot':
        console.log('關鍵字搜尋的分類是 ScenicSpot')
        const FILTER_spotHTML = filterData.reduce((html, item) => {
          html += `
          <li class="filterPage__item mb-24">
            <a
              href="#/ScenicSpot/${cityEnFilter(item['City'] ? item['City'] : item['Address'])}/${item['ID']}"
              class="card d-b"
            >
              <div class="card-img">
                <button class="card-shareBtn"></button>
                <img
                  src=${item['Picture']['PictureUrl1'] ?
              item['Picture']['PictureUrl1'] :
              noImageUrl
            }
                  onerror="this.src='img/noimage.png'"
                  alt="filter page item photo"
                >
              </div>
              <div class="card-info">
                <h3 class="card-title">${item['Name']}</h3>
                <div class="card-otherInfo flex-start-center">
                  <div class="card-location flex-start-center">
                    <div class="icon-location icon-mr4"></div>
                    <span class="card-otherInfoText">${item['City']}</span>
                  </div>
                  <div class="card-class flex-start-center">
                    <div class="icon-tag icon-mr4"></div>
                    <span class="card-otherInfoText">${item['Class1'] ? item['Class1'] : '未分類'}</span>
                  </div>
                </div>
              </div>
            </a>
          </li>
          `
          return html
        }, ``)
        filterList.innerHTML = FILTER_spotHTML
        break
      case 'Restaurant':
        console.log('關鍵字搜尋的分類是 Restaurant')
        const FILTER_foodHTML = filterData.reduce((html, item) => {
          html += `
          `
          return html
        }, ``)
        filterList.innerHTML = FILTER_foodHTML
        break
      case 'Hotel':
        console.log('關鍵字搜尋的分類是 Hotel')
        break
      case 'Activity':
        console.log('關鍵字搜尋的分類是 Activity')
        break
      default:
        break
    }
  }
  catch (err) {
    console.error(err)
  }
}

// ----- 景點 keyword -----


// ----- 美食 keyword -----
// ----- 住宿 keyword -----
// ----- 活動 keyword -----

// ----- 監聽歷史紀錄變化 -----
window.addEventListener('hashchange', function (e) {
  renderByUrl(location.hash)
})

export { renderByUrl }