import { HOME_render } from './home.js'
import { INIT_swiper } from './module/swiper.js'

const content = document.querySelector('#content')

// ----- 預設連結並渲染畫面 -----
window.onload = function () {
  // ----- My Desktop -----
  history.pushState(null, null, '/F2E_3rd/week1/')
  // ----- My Notebook -----
  // history.pushState(null, null, '/F2E_3rd/travel-formosa/')
  // ----- Github -----
  // history.pushState(null, null, '/travel-formosa/')
  renderByUrl(location.hash)
}

// ----- 判斷連結並渲染 -----
function renderByUrl(url) {
  console.log("目前路徑為:", url)

  // 網址轉換內容
  if (url === "" || url === "#/" || url === "#/home") {
    // 主頁 HTML
    content.innerHTML = /* html */`
      <!-- ----- 主頁 ----- -->
      <div class="homePage">
        <!-- Banner -->
        <div class="swiper swiper-header mb-40">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="banner__container flex-start-center">
                <h2 class="banner__title">探索。<br>福爾摩沙</h2>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="banner__container flex-start-center">
                <h2 class="banner__title">尋找。<br>熱門景點</h2>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="banner__container flex-start-center">
                <h2 class="banner__title">參與。<br>文化活動</h2>
              </div>
            </div>
          </div>
          <div class="swiper-pagination swiper-pagination-header"></div>
        </div>
        <!-- 熱門景點 -->
        <div class="hotSpot mb-40">
          <div class="content__title flex-sb-center">
            <h3 class="content__titleText flex-start-center">
              <div class="icon-location-purple icon-mr4"></div>
              <span class="d-ib">熱門景點</span>
            </h3>
            <a
              href="javascript:;"
              class="content__more"
            >更多熱門景點</a>
          </div>
          <!-- 最多 8 個 -->
          <div class="swiper swiper-hotSpot">
            <div class="swiper-wrapper swiper-wrapper-hotSpot">
              <!-- 載入資料 -->
            </div>
            <!-- navigation buttons -->
            <div class="swiper-button-prev swiper-button-prev-hotSpot"></div>
            <div class="swiper-button-next swiper-button-next-hotSpot"></div>
          </div>
        </div>
        <!-- 美食品嚐 -->
        <div class="food mb-40">
          <div class="content__title flex-sb-center">
            <h3 class="content__titleText flex-start-center">
              <div class="icon-location-purple icon-mr4"></div>
              <span class="d-ib">美食品嚐</span>
            </h3>
          </div>
          <!-- 最多 5 個 -->
          <ul class="cardSpec__list flex-sb-center flex-wrap">
          </ul>
        </div>
        <!-- 住宿推薦 -->
        <div class="hotel mb-40">
          <div class="content__title flex-sb-center">
            <h3 class="content__titleText flex-start-center">
              <div class="icon-location-purple icon-mr4"></div>
              <span class="d-ib">住宿推薦</span>
            </h3>
          </div>
          <!-- 最多 5 個 -->
          <ul class="cardSpec__list flex-sb-center flex-wrap">
          </ul>
        </div>
        <!-- 活動快訊 -->
        <div class="active mb-40">
          <div class="content__title flex-sb-center">
            <h3 class="content__titleText flex-start-center">
              <div class="icon-location-purple icon-mr4"></div>
              <span class="d-ib">活動快訊</span>
            </h3>
          </div>
          <!-- 最多 5 個 -->
          <ul class="cardFull__list">
          </ul>
        </div>
      </div>
    `
    // 執行主頁資料渲染
    HOME_render()
    // Swiper初始化
    INIT_swiper()
  } else if (url === "#/filterPage") {
    content.innerHTML = "這是篩選頁"
  } else {
    content.innerHTML = /*html*/`
      <h1>找不到頁面</h1>
    `
  }
}

// ----- 監聽歷史紀錄變化 -----
window.addEventListener('hashchange', function (e) {
  renderByUrl(location.hash)
})