import { INIT_swiper } from '../module/swiper.js'
export default function getPageResult(data, sort) {

  const noImageUrl = 'img/noimage.png'
  const PAGE_backBtn = document.querySelector('.title__backBtn')
  const title = document.querySelector('.title__text')
  const pageSlide = document.querySelector('.swiper-wrapper-page')
  const { swiper_header, swiper_hotSpot, swiper_page, swiper_nearSpot } = INIT_swiper()

  title.textContent = data['Name']

  function pageSlideHandler() {
    if (!data['Picture']) data['Picture'] = { PictureUrl: noImageUrl }
    let picturesProp = Object.keys(data['Picture'])
    let pictureUrls = picturesProp.filter(item => /PictureUrl/.test(item))
    console.log(pictureUrls)
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
    console.log(PAGE_slideHTML)
    return PAGE_slideHTML
  }
  pageSlide.innerHTML = pageSlideHandler()

  switch (sort) {
    case 'ScenicSpot':
      break
    case 'Restaurant':
      break
    case 'Hotel':
      break
    case 'Activity':
      break
    default:
      break
  }

  // 回上一頁
  PAGE_backBtn.addEventListener('click', function (e) {
    history.back()
  }, false)

  // Swiper初始化
  // swiper_page()

}