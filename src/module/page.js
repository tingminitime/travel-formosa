import { PAGE_infoListHTML, theme, noDataHTML, noDataFragment } from './template.js'
import { SPOT_apiRequest } from "../api.js";
import { cityEnFilter, cityFilter, dateFormat, chineseBreakWord } from './tool.js'
import { initMap } from './maps.js'

export default function getPageResult(data, sort) {
  const noImageUrl = 'img/noimage.png'
  const PAGE_backBtn = document.querySelector('.title__backBtn')
  const title = document.querySelector('.title__text')
  const pageSlide = document.querySelector('.swiper-wrapper-page')
  const infoList = document.querySelector('.info__list')
  const introTitle = document.querySelector('.intro__title')
  const intro = document.querySelector('.intro__content')
  const mapContainer = document.querySelector('.mapContainer')
  const { PositionLat: lat, PositionLon: lon } = data['Position']
  title.textContent = data['Name']

  pageSlideHandler()
  pageInfoRender()
  pageIntroRender()
  mapLocationRender()
  nearSpotRequest({
    lat,
    lon,
    distance: 2000,
    cardCount: 10
  })

  // 輪播照片
  function pageSlideHandler() {
    if (!data['Picture']) data['Picture'] = { PictureUrl: noImageUrl }
    let picturesProp = Object.keys(data['Picture'])
    let pictureUrls = picturesProp.filter(item => /PictureUrl/.test(item))
    console.log(`總共有 ${pictureUrls.length} 張照片`)
    const PAGE_slideHTML = pictureUrls.reduce((html, item) => {
      html += /* html */`
      <div class="swiper-slide swiper-slide-page">
        <div class="page__img">
          <img
            data-src=${data['Picture'][item]}
            class="swiper-lazy"
            onerror="this.src='img/noimage.png'"
          >
          <div class="swiper-lazy-preloader"></div>
        </div>
      </div>
      `
      return html
    }, ``)
    pageSlide.innerHTML = PAGE_slideHTML
  }


  // 資訊列表
  function pageInfoRender() {
    const {
      time,
      date,
      location,
      call,
      ticket,
      organizer,
      tag,
      web,
    } = PAGE_infoListHTML

    switch (sort) {
      case 'ScenicSpot':
        pageInfoCompose([
          time,
          location,
          call,
          ticket,
          tag,
          web
        ])
        break
      case 'Restaurant':
        pageInfoCompose([
          time,
          location,
          call,
          tag,
          web
        ])
        break
      case 'Hotel':
        pageInfoCompose([
          location,
          call,
          tag,
          web
        ])
        break
      case 'Activity':
        dateFormat([data])
        pageInfoCompose([
          date,
          location,
          call,
          organizer,
          tag,
          web
        ])
        break
      default:
        break
    }
  }

  // 資訊列表 - 基本架構
  function pageInfoCompose(ary) {
    const result = ary.reduce((html, item) => {
      html += item
      return html
    }, [])
    infoList.innerHTML = result
    pageInfoDataBind()
  }

  // 資訊列表 - 資料渲染
  function pageInfoDataBind() {
    Object.keys(PAGE_infoListHTML).forEach(item => {
      const info = document.querySelector(`[data-info=${item}]`)
      if (info === null) return
      if (info.dataset.prop === 'Date') {
        info.textContent = `${data['StartTime']} ~ ${data['EndTime']}`
      }
      else if (info.dataset.prop === 'Address') {
        info.textContent = data[info.dataset.prop] ?? data['City'] ?? '未提供'
      }
      else if (info.dataset.prop === 'Class') {
        const tagProps = Object.keys(data).filter(item => item.match(/^Class/g))
        const tags = tagProps.reduce((html, item) => {
          html += `
          <a
            href="javascript:;"
            class="info__content-tag"
          >${data[item]}</a>
          `
          return html
        }, ``)
        info.innerHTML = tags.length !== 0 ? tags : '未分類'
      }
      else if (info.dataset.prop === 'WebsiteUrl') {
        info.setAttribute('href', `${data[info.dataset.prop] ?? 'javascript:;'}`)
        info.textContent = data[info.dataset.prop] ?? '未提供'
      }
      else {
        info.textContent = data[info.dataset.prop] ?? '未提供'
      }
    })
  }

  // 介紹
  function pageIntroRender() {
    const introSort = theme.find(item => item['en'] === sort)
    console.log(introSort)
    introTitle.textContent = `${introSort['zh']}介紹`
    intro.innerHTML = chineseBreakWord(data['DescriptionDetail'] ?? data['Description'])
  }

  // 地圖位置
  function mapLocationRender() {
    // 每次進介紹頁面先初始化地圖 html
    mapContainer.innerHTML = /* html */`
    <h2 class="intro__title">地圖位置</h2>
    <div id="mapBlock"></div>
    `
    console.log(`緯度: ${lat}，經度: ${lon}`)
    initMap({
      lat,
      lon,
      name: data['Name'],
      location: data['Address'] ?? data['City']
    })
  }


  // 鄰近景點
  async function nearSpotRequest(nearSpotSet) {
    try {
      const nearSpot = document.querySelector('.nearSpot')
      const PAGE_nearSpot = document.querySelector('.swiper-wrapper-nearSpot')
      console.log(nearSpot)
      const { lat, lon, distance, cardCount } = nearSpotSet
      const { spotNear } = SPOT_apiRequest()
      const spotNearRes = await spotNear(lat, lon, distance)
      let nearSpotData = []

      nearSpotData = spotNearRes.data
      let showNearSpotData = []
      nearSpotData.length < cardCount
        ? showNearSpotData = nearSpotData.slice(0, nearSpotData.length)
        : showNearSpotData = nearSpotData.slice(0, cardCount)
      console.log('showNearSpotData: ', showNearSpotData)

      const PAGE_nearSpotHTML = showNearSpotData.reduce((html, item) => {
        html += /* html */`
        <div class="swiper-slide swiper-slide-nearSpot">
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
                  <span class="card-otherInfoText">${cityFilter(item['City'] ?? item['Address'])}</span>
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

      showNearSpotData.length === 0
        ? nearSpot.appendChild(noDataFragment())
        : PAGE_nearSpot.innerHTML = PAGE_nearSpotHTML
    }
    catch (err) {
      console.log('附近景點資料取得失敗: ', err)
    }
  }

  // 回上一頁
  PAGE_backBtn.addEventListener('click', function (e) {
    history.back()
  }, false)

}