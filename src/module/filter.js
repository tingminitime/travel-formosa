import { cityEnFilter, cityFilter, dateFormat } from './tool.js'
import { pageInfo } from '../listener.js'

export default function getFilterResult(data, sort) {

  const filterList = document.querySelector('.filterPage__list')
  const paginationList = document.querySelector('.filterPage__pagination-list')
  const prevPageBtn = document.querySelector('.filterPage__pagination-prev')
  const nextPageBtn = document.querySelector('.filterPage__pagination-next')
  const noImageUrl = 'img/noimage.png'

  const { CARDS_COUNT_PER_PAGE, aroundCurr } = pageInfo
  const maxPages = Math.ceil(data.length / CARDS_COUNT_PER_PAGE)
  // let currentPage = 1
  let hash = location.hash
  // history.pushState(null, null, `${hash}&page=${currentPage}`)
  history.pushState(null, null, `${hash}&page=1`)
  console.log('maxPages: ', maxPages)

  let PAGE_className = {
    num: 'filterPage__pagination-num',
    omit: 'filterPage__pagination-omit',
  }

  function getPageInfos(className, content) {
    return {
      className: className,
      content: content
    };
  }
  function initPage() {
    const currentPage = pageInfo['currentPage']
    console.log('currentPage: ', currentPage)
    paginationList.innerHTML = ''
    let fragment
    const renderData = data.slice(
      CARDS_COUNT_PER_PAGE * (currentPage - 1),
      CARDS_COUNT_PER_PAGE * currentPage
    )
    FILTER_renderHTML(sort, renderData)

    if (maxPages <= 7) fragment = renderNoEllipsis(currentPage)
    else if (maxPages > 7) fragment = renderEllipsis(currentPage)
    paginationList.appendChild(fragment)
  }
  initPage()

  function setPage(e) {
    if (!e.target.classList.contains('filterPage__pagination-num')) return
    pageInfo['currentPage'] = parseInt(e.target.dataset.page)
    console.log(pageInfo)
    history.pushState(null, null, `${hash}&page=${pageInfo['currentPage']}`)
    initPage()
  }

  // ----- 頁碼功能 ----- ## 要注意會偵測網址變更，要改善
  // 建立 HTML 模板 ( 傳陣列資料 )
  function createHTML(elData) {
    let fragment = document.createDocumentFragment()
    let el_li = document.createElement('li')
    let el_a = document.createElement('a')
    elData.forEach(el => {
      el_li = el_li.cloneNode(false)
      el_a = el_a.cloneNode(false)
      el_li.setAttribute('class', 'filterPage__pagination-item flex-center')
      el_a.setAttribute('href', 'javascript:;')
      el_a.setAttribute('class', el['className'])
      el_a.setAttribute('data-page', el['content'])
      el_a.innerHTML = el['content']
      el_li.appendChild(el_a)
      fragment.appendChild(el_li)
    })
    return fragment // <li><a>...</a></li>
  }

  // 封裝兩個插入節點 ( 參數 fragment 為父層 node )
  function addFragmentBefore(fragment, data) {
    fragment.insertBefore(createHTML(data), fragment.firstChild)
  }
  function addFragmentAfter(fragment, data) {
    fragment.appendChild(createHTML(data))
  }

  function renderNoEllipsis(currentPage) {
    let fragment = document.createDocumentFragment()
    fragment.appendChild(renderDom(1, maxPages, currentPage))
    return fragment
  }

  function renderEllipsis(currentPage) {
    let fragment = document.createDocumentFragment()
    // 先在 fragment 裡面加入目前頁碼的 li
    addFragmentAfter(fragment, [getPageInfos(PAGE_className['num'] + ' current', currentPage)])
    // 目前頁碼前後一頁處理
    for (let i = 1; i <= aroundCurr; i++) {
      // 目前頁碼大於 2，加入上一頁碼
      if (currentPage - i > 1) {
        addFragmentBefore(fragment, [getPageInfos(PAGE_className['num'], currentPage - i)])
      }
      // 目前頁碼 < 倒數第二頁，加入下一頁碼
      if (currentPage + i < maxPages) {
        addFragmentAfter(fragment, [getPageInfos(PAGE_className['num'], currentPage + i)])
      }
    }
    // 在前面加入省略符號條件
    if (currentPage - (aroundCurr + 1) > 1) {
      addFragmentBefore(fragment, [getPageInfos(PAGE_className['omit'], '...')])
    }
    if (currentPage > 1) {
      addFragmentBefore(fragment, [getPageInfos(PAGE_className['num'], 1)])
    }
    // 在後面加入省略符號條件
    if (currentPage + aroundCurr + 1 < maxPages) {
      addFragmentAfter(fragment, [getPageInfos(PAGE_className['omit'], '...')])
    }
    // 目前頁碼 < 最後一頁，就在最後面加入最後一頁頁碼
    if (currentPage < maxPages) {
      addFragmentAfter(fragment, [getPageInfos(PAGE_className['num'], maxPages)])
    }
    return fragment
  }

  // fewMode 總頁數 <= 7 頁時使用
  function renderDom(begin, end, currentPage) {
    let fragment = document.createDocumentFragment()
    let str = '' // className
    for (let i = begin; i <= end; i++) {
      str = currentPage === i ? PAGE_className['num'] + ' current' : PAGE_className['num']
      addFragmentAfter(fragment, [getPageInfos(str, i)])
    }
    console.log(str)
    return fragment
  }

  function setPage_PREV_NEXT(e) {
    if (e.target.closest('.filterPage__pagination-prev')) {
      pageInfo['currentPage'] - 1 < 1 ?
        pageInfo['currentPage'] = 1 :
        pageInfo['currentPage'] -= 1
    } else if (e.target.closest('.filterPage__pagination-next')) {
      pageInfo['currentPage'] + 1 > maxPages ?
        pageInfo['currentPage'] = maxPages :
        pageInfo['currentPage'] += 1
    }
    history.pushState(null, null, `${hash}&page=${pageInfo['currentPage']}`)
    initPage()
  }

  // 依頁碼狀態及不同分類 => 渲染畫面
  function FILTER_renderHTML(sort, data) {
    switch (sort) {
      case 'ScenicSpot':
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

  // ----- 監聽 -----
  // 歷史紀錄變化
  window.addEventListener('hashchange', function (e) {
    // Filter 換頁不觸發 renderByUrl
    if (location.hash.includes('&page=')) {
      pageInfo['currentPage'] = parseInt(location.hash.split('&page=')[1])
      initPage()
    }
    console.log('偵測hash變更')
  }, false)

  // 按頁碼
  paginationList.addEventListener('click', setPage, false)

  // 上 / 下一頁
  prevPageBtn.addEventListener('click', setPage_PREV_NEXT, false)
  nextPageBtn.addEventListener('click', setPage_PREV_NEXT, false)

}