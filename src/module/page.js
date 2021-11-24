import { PAGE_infoListHTML } from './template.js'
import { dateFormat, chineseBreakWord } from './tool.js'
import { initMap } from './maps.js'

export default function getPageResult(data, sort) {
  const noImageUrl = 'img/noimage.png'
  const PAGE_backBtn = document.querySelector('.title__backBtn')
  const title = document.querySelector('.title__text')
  const pageSlide = document.querySelector('.swiper-wrapper-page')
  const infoList = document.querySelector('.info__list')
  const intro = document.querySelector('.intro__content')

  // 標題文字
  title.textContent = data['Name']

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
    return PAGE_slideHTML
  }
  pageSlide.innerHTML = pageSlideHandler()

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
  pageInfoRender()

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
    intro.innerHTML = chineseBreakWord(data['DescriptionDetail'] ?? data['Description'])
  }
  pageIntroRender()

  // 地圖位置
  const { PositionLat: lat, PositionLon: lon } = data['Position']
  console.log(`緯度: ${lat}，經度: ${lon}`)
  const mapObj = {
    lat,
    lon,
    name: data['Name'],
    location: data['Address'] ?? data['City']
  }
  initMap(mapObj)

  // 回上一頁
  PAGE_backBtn.addEventListener('click', function (e) {
    history.back()
  }, false)

}