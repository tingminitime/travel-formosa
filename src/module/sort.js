import {
  SPOT_apiRequest,
  FOOD_apiRequest,
  HOTEL_apiRequest,
  ACTIVITY_apiRequest
} from "../api.js";

const content = document.querySelector('#content')
const FILTER_defaultHTML = /* html */`
<div class="filterPage">
  <h2 class="filterPage__title mb-16"></h2>
  <div class="filterPage__sort flex-start-center mb-24">
    <div class="icon-sort mr-12"></div>
    <button class="filterPage__sortSelect mr-12">全部</button>
    <button class="filterPage__sortSelect mr-12">🔥 熱門程度</button>
    <button class="filterPage__sortSelect mr-12">👍 推薦</button>
  </div>
  <div class="filterPage__cardRender">
  </div>
  <!-- 頁碼 -->
  <div class="filterPage__pagination flex-center mb-40">
    <button class="filterPage__pagination-prev mr-12">
      <span class="material-icons d-ib">
        chevron_left
      </span>
    </button>
    <ul class="filterPage__pagination-list flex-center">
      <li class="filterPage__pagination-num flex-center">
        <a href="javascript:;">1</a>
      </li>
      <li class="filterPage__pagination-num flex-center">
        <a href="javascript:;">2</a>
      </li>
      <li class="filterPage__pagination-num flex-center">
        <a href="javascript:;">3</a>
      </li>
      <li class="filterPage__pagination-omit flex-center">
        <a href="javascript:;">...</a>
      </li>
      <li class="filterPage__pagination-num flex-center">
        <a href="javascript:;">20</a>
      </li>
    </ul>
    <button class="filterPage__pagination-next ml-12">
      <span class="material-icons d-ib">
        navigate_next
      </span>
    </button>
  </div>
</div>
`

const PAGE_defaultHTML = /* html */`
<div class="page">
  <div class="title mb-24 flex-sb-center">
    <div class="title__info flex-start-center">
      <button class="title__backBtn"></button>
      <h2 class="title__text">[介紹標題]</h2>
    </div>
    <div class="title__funcs">
      <button class="title__funcsBtn title__funcsBtn-print icon-print"></button>
      <button class="title__funcsBtn icon-share"></button>
    </div>
  </div>
  <!-- 內頁 - 照片 -->
  <div class="swiper swiper-page mb-24">
  <div class="swiper-wrapper">
    <!-- 載入輪播照片 -->
    </div>
    <div class="swiper-pagination swiper-pagination-page"></div>
    <div class="swiper-button-prev swiper-button-prev-page"></div>
    <div class="swiper-button-next swiper-button-next-page"></div>
  </div>
  <!-- 內頁 - 資訊 -->
  <!-- 景點資訊 : 時段、地點、電話、票價、類別、網站 -->
  <!-- 美食資訊 : 時段、地點、電話、類別 -->
  <!-- 住宿資訊 : 地點、電話、類別、 -->
  <!-- 活動資訊 : 時段、地點、主辦單位、備註(Cycle)、類別 -->
  <div class="info mb-24">
    <ul class="info__list">
      <!-- 載入資訊列表 -->
    </ul>
  </div>
  <!-- 介紹 -->
  <div class="intro mb-24">
    <h2 class="intro__title">[主題]介紹</h2>
    <div class="intro__content">
      <!-- 載入 DescriptionDetail -->
    </div>
  </div>
  <!-- 地圖 -->
  <div class="map mb-40">
    <h2 class="intro__title">地圖位置</h2>
    <div id="myMap"></div>
  </div>
  <!-- 鄰近的景點 最多 6 個 -->
  <div class="nearSpot mb-40">
    <h2 class="intro__title">鄰近的景點</h2>
    <div class="swiper swiper-nearSpot">
      <div class="swiper-wrapper">
        <!-- 載入輪播景點 -->
      </div>
      <!-- navigation buttons -->
      <div class="swiper-button-prev swiper-button-prev-nearSpot"></div>
      <div class="swiper-button-next swiper-button-next-nearSpot"></div>
    </div>
  </div>
</div>
`

// ----- 景點 Router => 從  #/spot 開始 -----
export const SPOT_router = (hashArray) => {
  const [sort, city, id] = hashArray
  console.log('分類是', sort)

  if (city && !id) {
    // 篩選頁面 HTML 初始化
    content.innerHTML = FILTER_defaultHTML

    // 篩選頁面的標題
    const filterTitle = document.querySelector('.filterPage__title')
    console.log(filterTitle)

    const { spotCity } = SPOT_apiRequest()

    console.log('沒有ID')

  }
  else if (id) {
    console.log('有ID')
    // 介紹頁面 HTML 初始化
    content.innerHTML = PAGE_defaultHTML
  }
}

