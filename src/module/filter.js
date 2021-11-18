import { cityEnFilter, cityFilter, dateFormat } from './tool.js'
import {
  FILTER_fewModeHTML,
  FILTER_frontModeHTML,
  FILTER_middleModeHTML,
  FILTER_lastModeHTML
} from './template.js'

export default function getFilterResult(data, sort) {

  const filterList = document.querySelector('.filterPage__list')
  const paginationBtn = document.querySelector('.filterPage__pagination-list')
  const noImageUrl = 'img/noimage.png'

  const CARDS_COUNT_PER_PAGE = 9
  const maxPages = Math.ceil(data.length / CARDS_COUNT_PER_PAGE)
  let currentPage = 1
  history.pushState(null, null, `${location.hash}&page=${currentPage}`)

  const renderData = data.slice(
    CARDS_COUNT_PER_PAGE * (currentPage - 1),
    CARDS_COUNT_PER_PAGE * currentPage
  )

  let PAGE_className = {
    num: 'filterPage__pagination-num flex-center',
    omit: 'filterPage__pagination-omit flex-center'
  }

  let PAGE_htmlInfo = [
    {
      className: 'filterPage__pagination-num flex-center',
      content: currentPage
    },
    {
      className: 'filterPage__pagination-omit flex-center',
      content: '...'
    },
  ]

  function getPageInfos(className, content) {
    return {
      className: className,
      content: content
    };
  }

  function PAGE_handler() {

  }

  // 建立 HTML 模板
  function createHTML(elData) {
    let fragment = document.createDocumentFragment()
    let el_li = document.createElement('li')
    let el_a = document.createElement('a')
    elData.forEach(el => {
      el_li = el_li.cloneNode(false)
      el_a = el_a.cloneNode(false)
      el_a.setAttribute('href', 'javascript:;');
      if (el.className !== 'filterPage__pagination-num') {
        el_li.setAttribute('class', 'filterPage__pagination-omit flex-center');
      } else {
        el_li.setAttribute("class", el.className + ' flex-center');
      }
      el_a.innerHTML = el.content;
      liEle.appendChild(aEle);
      fragment.appendChild(liEle);
    })
  }

  FILTER_renderHTML(sort, renderData)
  // initPagination(currentPage)

  // 依頁碼狀態及不同分類 => 渲染畫面
  function FILTER_renderHTML(sort, data) {
    switch (sort) {
      case 'ScenicSpot':
        console.log('關鍵字搜尋的分類是 ScenicSpot')
        const FILTER_spotHTML = data.reduce((html, item) => {
          html += /* html */`
          <li class="filterPage__item mb-24">
            <a
              href="#/ScenicSpot/${cityEnFilter(item['City'] ?? item['Address'])}/${item['ID']}"
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
                    <span class="card-otherInfoText">${cityFilter(item['City'] ?? item['Address'])}</span>
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
        const FILTER_foodHTML = data.reduce((html, item) => {
          html += /* html */`
          <li class="filterPage__item mb-24">
            <a
              href="#/Restaurant/${cityEnFilter(item['City'])}/${item['ID']}"
              class="card cardSpec d-b"
            >
              <div class="cardSpec-img cardSpec-mask">
                <button class="card-shareBtn"></button>
                <h3 class="cardSpec-title cardSpec-title-ab">${item['Name']}</h3>
                <img
                  src=${item['Picture']['PictureUrl1'] ?? noImageUrl}
                  onerror="this.src='img/noimage.png'"
                  alt="food photo"
                >
              </div>
              <div class="cardSpec-info flex flex-wrap">
                <div class="cardSpec-location flex-center">
                  <div class="icon-location icon-mr4"></div>
                  <p class="cardSpec-otherInfoText">
                    ${item['City'] + item['Address']}
                  </p>
                </div>
                <div class="cardSpec-operate flex-center">
                  <div class="icon-time icon-mr4"></div>
                  <p class="cardSpec-otherInfoText">
                    ${item['OpenTime']}
                  </p>
                </div>
              </div>
            </a>
          </li>
          `
          return html
        }, ``)
        filterList.innerHTML = FILTER_foodHTML
        break
      case 'Hotel':
        console.log('關鍵字搜尋的分類是 Hotel')
        const FILTER_hotelHTML = data.reduce((html, item) => {
          html += /* html */`
          <li class="filterPage__item mb-24">
            <a
              href="#/Hotel/${cityEnFilter(item['City'])}/${item['ID']}"
              class="card cardSpec d-b"
            >
              <div class="cardSpec-img cardSpec-mask">
                <button class="card-shareBtn"></button>
                <img
                  src=${item['Picture']['PictureUrl1'] ?? noImageUrl}
                  onerror="this.src='img/noimage.png'"
                  alt="food photo"
                >
              </div>
              <div class="cardSpec-info flex flex-wrap">
                <h3 class="cardSpec-title">${item['Name']}</h3>
                <div class="cardSpec-location flex-center">
                  <div class="icon-location icon-mr4"></div>
                  <p class="cardSpec-otherInfoText">
                    ${item['Address']}
                  </p>
                </div>
                <div class="cardSpec-call flex-center">
                  <div class="icon-call icon-mr4"></div>
                  <p class="cardSpec-otherInfoText">
                    ${item['Phone']}
                  </p>
                </div>
              </div>
            </a>
          </li>
          `
          return html
        }, ``)
        filterList.innerHTML = FILTER_hotelHTML
        break
      case 'Activity':
        console.log('關鍵字搜尋的分類是 Activity')
        dateFormat(data)
        const FILTER_activityHTML = data.reduce((html, item) => {
          html += /* html */`
          <li class="cardFull__item mb-24">
            <a
              href="#/Activity/${cityEnFilter(item['City'] ?? item['Address'])}/${item['ID']}"
              class="cardFull flex-sb-center"
            >
              <div class="cardFull__info">
                <h3 class="cardFull__title">${item['Name']}</h3>
                <div class="cardFull__location flex-start-center">
                  <div class="icon-location icon-mr4"></div>
                  <p class="cardFull__otherInfoText">
                    ${item['City'] ?? item['Location']}
                  </p>
                </div>
                <div class="cardFull__date flex-start-center">
                  <div class="icon-time icon-mr4"></div>
                  <p class="cardFull__otherInfoText">
                    ${item['StartTime']} ~ ${item['EndTime']}
                  </p>
                </div>
              </div>
              <div class="cardFull__img">
                <img
                  src=${item['Picture']['PictureUrl1'] ?? noImageUrl}
                  onerror="this.src='img/noimage.png'"
                  alt="active photo"
                >
              </div>
            </a>
        </li>
          `
          return html
        }, ``)
        filterList.innerHTML = FILTER_activityHTML
        break
      default:
        break
    }
  }

  // ----- 頁碼功能 ----- ## 要注意會偵測網址變更，要改善
  function initPagination(currentPage) {
    // 1. 只有 6 頁以內 ( maxPages <= 6 )，僅用 maxPages 個頁碼，使用 FILTER_fewModeHTML
    // 2. 超過 6 頁 ( maxPages > 6 )，以下條件判斷如何顯示頁碼 : 
    // a. currentPage <= 2，使用 FILTER_frontModeHTML
    // b. currentPage > 2 且 currentPage < maxPages - 2，使用 FILTER_middleModeHTML
    // c. currentPage >= maxPages - 2，使用 FILTER_lastModeHTML

    const paginationList = document.querySelector('.filterPage__pagination-list')
    console.log('目前 currentPage: ', currentPage)

    // 判斷該 render 哪個頁碼 template
    if (maxPages <= 6) {
      let accumulatorHTML = ''
      for (let i = 0; i < maxPages; i++) {
        accumulatorHTML += FILTER_fewModeHTML
      }
      paginationList.innerHTML = accumulatorHTML
    }
    else if (maxPages > 6 && currentPage <= 2) {
      paginationList.innerHTML = FILTER_frontModeHTML
    }
    else if (maxPages - 2 > currentPage && currentPage > 2) {
      paginationList.innerHTML = FILTER_middleModeHTML
    }
    else if (maxPages - 2 <= currentPage) {
      paginationList.innerHTML = FILTER_lastModeHTML
    }

  }

  function setPage(e) {
    console.log(e.target)
  }

  console.log(paginationBtn)
  paginationBtn.addEventListener('click', setPage, false)

}