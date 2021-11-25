// 縣市資料
const cities = [
  { en: 'all', zh: 'all', name: '全部', area: 'all' },
  { en: 'Keelung', zh: '基隆市', name: '基隆', area: 'north' },
  { en: 'Taipei', zh: '臺北市', name: '台北', area: 'north' },
  { en: 'NewTaipei', zh: '新北市', name: '新北', area: 'north' },
  { en: 'Taoyuan', zh: '桃園市', name: '桃園', area: 'north' },
  { en: 'Hsinchu', zh: '新竹市', name: '竹市', area: 'north' },
  { en: 'HsinchuCounty', zh: '新竹縣', name: '竹縣', area: 'north' },
  { en: 'YilanCounty', zh: '宜蘭縣', name: '宜蘭', area: 'north' },
  { en: 'MiaoliCounty', zh: '苗栗縣', name: '苗栗', area: 'central' },
  { en: 'Taichung', zh: '臺中市', name: '台中', area: 'central' },
  { en: 'ChanghuaCounty', zh: '彰化縣', name: '彰化', area: 'central' },
  { en: 'NantouCounty', zh: '南投縣', name: '南投', area: 'central' },
  { en: 'YunlinCounty', zh: '雲林縣', name: '雲林', area: 'central' },
  { en: 'ChiayiCounty', zh: '嘉義縣', name: '嘉縣', area: 'south' },
  { en: 'Chiayi', zh: '嘉義市', name: '嘉市', area: 'south' },
  { en: 'Tainan', zh: '臺南市', name: '台南', area: 'south' },
  { en: 'Kaohsiung', zh: '高雄市', name: '高雄', area: 'south' },
  { en: 'PingtungCounty', zh: '屏東縣', name: '屏東', area: 'south' },
  { en: 'HualienCounty', zh: '花蓮縣', name: '花蓮', area: 'east' },
  { en: 'TaitungCounty', zh: '臺東縣', name: '臺東', area: 'east' },
  { en: 'KinmenCounty', zh: '金門縣', name: '金門', area: 'island' },
  { en: 'PenghuCounty', zh: '澎湖縣', name: '澎湖', area: 'island' },
  { en: 'LienchiangCounty', zh: '連江縣', name: '連江', area: 'island' },
]

// 主題資料
const theme = [
  { en: 'Activity', zh: '活動' },
  { en: 'ScenicSpot', zh: '景點' },
  { en: 'Restaurant', zh: '美食' },
  { en: 'Hotel', zh: '住宿' },
]

// 首頁基本 HTML
const HOME_defaultHTML = /* html */`
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
        href="#/ScenicSpot/all"
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
// 篩選頁面基本 HTML
const FILTER_defaultHTML = /* html */`
<div class="filterPage">
  <h2 class="filterPage__title mb-16"></h2>
  <div class="filterPage__sort flex-start-center mb-24">
    <div class="icon-sort mr-12"></div>
    <button class="filterPage__sortSelect mr-12">全部</button>
    <button class="filterPage__sortSelect mr-12">🔥 熱門程度</button>
    <button class="filterPage__sortSelect mr-12">👍 推薦</button>
  </div>
  <ul class="filterPage__list flex flex-wrap mb-24">
    <li class="flex-center" style="width: 100%; height:20vw">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </li>
  </ul>
  <!-- 頁碼 -->
  <div class="filterPage__pagination flex-center mb-40">
    <button class="filterPage__pagination-prev mr-12">
      <span class="material-icons d-ib">
        chevron_left
      </span>
    </button>
    <ul class="filterPage__pagination-list flex-center">
    </ul>
    <button class="filterPage__pagination-next ml-12">
      <span class="material-icons d-ib">
        navigate_next
      </span>
    </button>
  </div>
</div>
`
// 介紹頁面基本 HTML
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
    <div class="swiper-wrapper swiper-wrapper-page">
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
    <h2 class="intro__title">介紹</h2>
    <div class="intro__content">
      <!-- 載入 DescriptionDetail -->
    </div>
  </div>
  <!-- 地圖 -->
  <div class="mapContainer mb-40">
    <h2 class="intro__title">地圖位置</h2>
    <div id="mapBlock"></div>
  </div>
  <!-- 鄰近的景點 最多 10 個 -->
  <div class="nearSpot mb-40">
    <h2 class="intro__title">鄰近的景點</h2>
    <div class="swiper swiper-nearSpot">
      <div class="swiper-wrapper swiper-wrapper-nearSpot">
        <!-- 載入輪播景點 -->
      </div>
      <!-- navigation buttons -->
      <div class="swiper-button-prev swiper-button-prev-nearSpot"></div>
      <div class="swiper-button-next swiper-button-next-nearSpot"></div>
    </div>
  </div>
</div>
`

// 內頁 - 資訊
// 景點資訊 : 時段、地點、電話、票價、類別、網站
// 美食資訊 : 時段、地點、電話、類別、網站
// 住宿資訊 : 地點、電話、類別、
// 活動資訊 : 時段、地點、主辦單位、備註(Cycle)、類別

const PAGE_infoListHTML = {
  time: /* html */`
  <!-- 開放時段 -->
  <li class="info__item info__item-time flex-start-start">
    <div class="info__title flex-center">
      <div class="icon-time icon-mr4"></div>
      <span class="info__text">開放時段 :</span>
    </div>
    <p class="info__content" data-info="time" data-prop="OpenTime"></p>
  </li>
  `,
  date: /* html */`
  <!-- 活動日期 -->
  <li class="info__item info__item-date flex-start-start">
    <div class="info__title flex-center">
      <div class="icon-time icon-mr4"></div>
      <span class="info__text">活動日期 :</span>
    </div>
    <p class="info__content" data-info="date" data-prop="Date"></p>
  </li>
  `,
  location: /* html */`
  <!-- 所在地點 -->
  <li class="info__item info__item-location flex-start-start">
    <div class="info__title flex-center">
      <div class="icon-location icon-mr4"></div>
      <span class="info__text">所在地點 :</span>
    </div>
    <p class="info__content" data-info="location" data-prop="Address"></p>
  </li>
  `,
  call: /* html */`
  <!-- 聯絡電話 -->
  <li class="info__item info__item-call flex-start-start">
    <div class="info__title flex-center">
      <div class="icon-call icon-mr4"></div>
      <span class="info__text">聯絡電話 :</span>
    </div>
    <p class="info__content">
      <a href="tel:886-3-8771410" data-info="call" data-prop="Phone"></a>
    </p>
  </li>
  `,
  ticket: /* html */`
  <!-- 票價資訊 -->
  <li class="info__item info__item-ticket flex-start-start">
    <div class="info__title flex-center">
      <div class="icon-ticket icon-mr4"></div>
      <span class="info__text">票價資訊 :</span>
    </div>
    <p class="info__content" data-info="ticket" data-prop="TicketInfo"></p>
  </li>
  `,
  organizer: /* html */`
  <!-- 主辦單位 -->
  <li class="info__item info__item-organizer flex-start-start">
    <div class="info__title flex-center">
      <div class="icon-organizer icon-mr4"></div>
      <span class="info__text">主辦單位 :</span>
    </div>
    <p class="info__content" data-info="organizer" data-prop="Organizer"></p>
  </li>
  `,
  tag: /* html */`
  <!-- 分類標籤 -->
  <li class="info__item info__item-class flex-start-start">
    <div class="info__title flex-self-center">
      <div class="icon-tag icon-mr4"></div>
      <span class="info__text">分類標籤 :</span>
    </div>
    <p class="info__content" data-info="tag" data-prop="Class">
      <!-- page.js 載入資料 -->
    </p>
  </li>
  `,
  web: /* html */`
  <!-- 網站連結 -->
  <li class="info__item info__item-web flex-start-start">
    <div class="info__title flex-self-center">
      <div class="icon-web icon-mr4"></div>
      <span class="info__text">網站連結 :</span>
    </div>
    <p class="info__content">
      <a
        class="info__url"
        href="javascript:;"
        target="_blank"
        data-info="web"
        data-prop="WebsiteUrl"
      ></a>
    </p>
  </li>
  `,
}

// Loading
const loadingHTML = /* html */`
<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
`

// 附近景點無資訊
const noDataHTML = /* html */`
<p class="intro__noData">無相關資訊</p>
`

function noDataFragment() {
  let el_p = document.createElement('p')
  el_p.setAttribute('class', 'intro__noData')
  el_p.textContent = '無相關資訊'
  return el_p
}

export {
  cities,
  theme,
  HOME_defaultHTML,
  FILTER_defaultHTML,
  PAGE_defaultHTML,
  PAGE_infoListHTML,
  loadingHTML,
  noDataHTML,
  noDataFragment
}