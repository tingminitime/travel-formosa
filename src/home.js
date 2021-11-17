import {
  SPOT_apiRequest,
  FOOD_apiRequest,
  HOTEL_apiRequest,
  ACTIVITY_apiRequest
} from "./api.js";
import { cities } from './module/template.js'
import { cityEnFilter, randomNum, dateFormat } from './module/tool.js'

export const HOME_render = () => {

  const noImageUrl = 'img/noimage.png'
  let HOME_API_STATUS = []

  // 首頁 - 熱門景點
  async function HOME_hotSpotRender() {
    const { spotAllTop } = SPOT_apiRequest()
    let data = []
    // 取得熱門景點資料 (必須有照片 )
    await spotAllTop(8, randomNum(1000))
      .then(res => {
        data = res.data
      })
      .catch(err => {
        console.error('(首頁)熱門景點 資料取得失敗', err)
        HOME_API_STATUS.push(false)
      })
    console.log('(首頁)熱門景點', data)

    // 熱門景點 渲染
    const HOME_hotSpotList = document.querySelector('.swiper-wrapper-hotSpot')
    const HOME_hotSpotHTML = data.reduce((html, item) => {
      html += /* html */`
        <div class="swiper-slide swiper-slide-hotSpot">
          <a
            href="#/ScenicSpot/${cityEnFilter(item['City'] ?? item['Address'])}/${item['ID']}"
            class="card d-b"
          >
            <div class="card-img">
              <button class="card-shareBtn"></button>
              <img
                data-src=${item['Picture']['PictureUrl1'] ?? noImageUrl}
                onerror="this.src='img/noimage.png'"
                class="swiper-lazy"
              >
              <div class="swiper-lazy-preloader"></div>
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
        </div>
      `
      return html
    }, ``)
    HOME_hotSpotList.innerHTML = HOME_hotSpotHTML
  }

  // 首頁 - 美食品嚐
  async function HOME_foodRender() {
    const { foodAllTop } = FOOD_apiRequest()
    const moreFood = `
  <li class="cardSpec__more card">
    <a
      href="#/Restaurant/all"
      class="cardSpec__moreText flex-center"
    ><span>更多美食...</span></a>
  </li>
  `

    let data = []
    // 取得美食品嚐資料 (必須有照片 )
    await foodAllTop(5, randomNum(1000))
      .then(res => {
        data = res.data
      })
      .catch(err => {
        console.error('(首頁)美食品嚐 資料取得失敗', err)
        HOME_API_STATUS.push(false)
      })
    console.log('(首頁)美食品嚐', data)

    // 美食品嚐 渲染
    const HOME_foodList = document.querySelector('.food > .cardSpec__list')
    const HOME_foodHTML = data.reduce((html, item) => {
      html += /* html */`
      <li class="cardSpec__item">
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
    HOME_foodList.innerHTML = HOME_foodHTML + moreFood
  }

  // 首頁 - 住宿推薦
  async function HOME_hotelRender() {
    const { hotelAllTop } = HOTEL_apiRequest()
    const moreHotel = `
    <li class="cardSpec__more card">
      <a
        href="#/Hotel/all"
        class="cardSpec__moreText flex-center"
      ><span>更多住宿...</span></a>
    </li>
  `

    let data = []
    // 取得住宿推薦資料 (必須有照片 )
    await hotelAllTop(5, randomNum(1000))
      .then(res => {
        data = res.data
      })
      .catch(err => {
        console.error('(首頁)住宿推薦 資料取得失敗', err)
        HOME_API_STATUS.push(false)
      })
    console.log('(首頁)住宿推薦', data)

    // 住宿推薦 渲染
    const HOME_hotelList = document.querySelector('.hotel > .cardSpec__list')
    const HOME_hotelHTML = data.reduce((html, item) => {
      html += /* html */`
      <li class="cardSpec__item">
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
    HOME_hotelList.innerHTML = HOME_hotelHTML + moreHotel
  }

  // 首頁 - 活動快訊
  async function HOME_activityRender() {
    const { activityAllTop } = ACTIVITY_apiRequest()
    const moreActivity = `
      <a
        href="#/Activity/all"
        class="cardSpec__moreText cardSpec__moreText-full flex-center"
      >
        <span>更多活動...</span>
      </a>
    `

    let data = []
    // 取得活動快訊資料 (必須有照片 )
    await activityAllTop(5, randomNum(120))
      .then(res => {
        data = res.data
      })
      .catch(err => {
        console.error('(首頁)活動快訊 資料取得失敗', err)
        HOME_API_STATUS.push(false)
      })

    // 活動時間格式轉換
    dateFormat(data)

    console.log('(首頁)活動快訊', data)

    // 活動快訊 渲染
    const HOME_activityList = document.querySelector('.active > .cardFull__list')
    const HOME_activityHTML = data.reduce((html, item) => {
      html += /* html */`
      <li class="cardFull__item mb-24">
        <a
          href="#/Activity/${cityEnFilter(item['City'])}/${item['ID']}"
          class="cardFull flex-sb-center"
        >
          <div class="cardFull__info">
            <h3 class="cardFull__title">${item['Name']}</h3>
            <div class="cardFull__location flex-start-center">
              <div class="icon-location icon-mr4"></div>
              <p class="cardFull__otherInfoText">
                ${item['City']}
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
    HOME_activityList.innerHTML = HOME_activityHTML + moreActivity
  }

  HOME_hotSpotRender()
  HOME_foodRender()
  HOME_hotelRender()
  HOME_activityRender()

  // HOME_API_STATUS.length ? console.log('資料取得失敗', HOME_API_STATUS) : []
  console.log(HOME_API_STATUS)
}