import {
  SPOT_apiRequest,
  FOOD_apiRequest,
  HOTEL_apiRequest,
  ACTIVITY_apiRequest
} from "./api.js";

export const HOME_render = () => {
  let cities = [
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

  const noImageUrl = 'img/noimage.png'

  // 找出 city 的 en
  function cityEnFilter(name) {
    const targetCityEn = cities.find(item => item['zh'] === name)
    return targetCityEn['en']
  }

  // 取得隨機數
  function randomNum(num) {
    return Math.floor(Math.random() * num)
  }

  // 時間格式
  function parseDate(date) {
    if (isNaN(Date.parse(date))) return ''
    let timeStamp = Date.parse(date)
    let targetDate = new Date(timeStamp)
    const year = targetDate.getFullYear().toString()
    const month = (targetDate.getMonth() + 1).toString()
    const day = targetDate.getDate().toString()
    const hour = targetDate.getHours().toString()
    const min = targetDate.getMinutes() < 10 ?
      '0' + targetDate.getMinutes() :
      targetDate.getMinutes()
    return { year, month, day, hour, min }
  }

  // 首頁 - 熱門景點
  async function HOME_hotSpotRender() {
    const { spotAllTop } = SPOT_apiRequest()
    let data = []
    // 取得熱門景點資料 (必須有照片 )
    await spotAllTop(8, randomNum(1000))
      .then(res => {
        data = res.data
      })
      .catch(err => console.error('(首頁)熱門景點 資料取得失敗', err))
    console.log('(首頁)熱門景點', data)

    // 熱門景點 渲染
    const HOME_hotSpotList = document.querySelector('.swiper-wrapper-hotSpot')
    const HOME_hotSpotHTML = data.reduce((html, item) => {
      html += `
        <div class="swiper-slide swiper-slide-hotSpot">
          <a
            href="#/spot/${cityEnFilter(item['City'])}/${item['ID']}"
            class="card d-b"
          >
            <div class="card-img">
              <button class="card-shareBtn"></button>
              <img
                data-src=${item['Picture']['PictureUrl1'] ?
          item['Picture']['PictureUrl1'] :
          noImageUrl
        }
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
      href="#/food"
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
      .catch(err => console.error('(首頁)美食品嚐 資料取得失敗', err))
    console.log('(首頁)美食品嚐', data)

    // 美食品嚐 渲染
    const HOME_foodList = document.querySelector('.food > .cardSpec__list')
    const HOME_foodHTML = data.reduce((html, item) => {
      html += `
      <li class="cardSpec__item">
        <a
          href="#/food/${cityEnFilter(item['City'])}/${item['ID']}"
          class="card cardSpec d-b"
        >
          <div class="cardSpec-img cardSpec-mask">
            <button class="card-shareBtn"></button>
            <h3 class="cardSpec-title cardSpec-title-ab">${item['Name']}</h3>
            <img
              src=${item['Picture']['PictureUrl1'] ?
          item['Picture']['PictureUrl1'] :
          noImageUrl
        }
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
        href="#/hotel"
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
      .catch(err => console.error('(首頁)住宿推薦 資料取得失敗', err))
    console.log('(首頁)住宿推薦', data)

    // 住宿推薦 渲染
    const HOME_hotelList = document.querySelector('.hotel > .cardSpec__list')
    const HOME_hotelHTML = data.reduce((html, item) => {
      html += `
      <li class="cardSpec__item">
        <a
          href="#/hotel/${cityEnFilter(item['City'])}/${item['ID']}"
          class="card cardSpec d-b"
        >
          <div class="cardSpec-img cardSpec-mask">
            <button class="card-shareBtn"></button>
            <img
              src=${item['Picture']['PictureUrl1'] ?
          item['Picture']['PictureUrl1'] :
          noImageUrl
        }
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
        href="#/active"
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
      .catch(err => console.error('(首頁)活動快訊 資料取得失敗', err))

    // 活動時間格式轉換
    data.forEach(item => {
      const { year: startYear, month: startMon, day: startDate } = parseDate(item['StartTime'])
      const { year: endYear, month: endMon, day: endDate } = parseDate(item['EndTime'])
      item['StartTime'] = `${startYear}-${startMon}-${startDate}`
      item['EndTime'] = `${endYear}-${endMon}-${endDate}`
    })
    console.log('(首頁)活動快訊', data)

    // 活動快訊 渲染
    const HOME_activityList = document.querySelector('.active > .cardFull__list')
    const HOME_activityHTML = data.reduce((html, item) => {
      html += `
    <li class="cardFull__item mb-24">
      <a
        href="#/active/${cityEnFilter(item['City'])}/${item['ID']}"
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
            src=${item['Picture']['PictureUrl1'] ?
          item['Picture']['PictureUrl1'] :
          noImageUrl
        }
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
}