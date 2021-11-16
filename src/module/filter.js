import { cityEnFilter, dateFormat } from './tool.js'

export default function getFilterResult(data, sort) {

  const filterList = document.querySelector('.filterPage__list')
  const noImageUrl = 'img/noimage.png'
  const CARDS_COUNT_PER_PAGE = 9
  const maxPages = Math.ceil(data.length / CARDS_COUNT_PER_PAGE)
  let currentPage = 1

  const renderData = data.slice(
    CARDS_COUNT_PER_PAGE * (currentPage - 1),
    CARDS_COUNT_PER_PAGE * currentPage
  )

  switch (sort) {
    case 'ScenicSpot':
      console.log('關鍵字搜尋的分類是 ScenicSpot')
      const FILTER_spotHTML = renderData.reduce((html, item) => {
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
      const FILTER_foodHTML = renderData.reduce((html, item) => {
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
      const FILTER_hotelHTML = renderData.reduce((html, item) => {
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
      dateFormat(renderData)
      const FILTER_activityHTML = renderData.reduce((html, item) => {
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