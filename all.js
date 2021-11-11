let cities = [
  { en: 'Taipei', zh: '台北', area: 'north' },
  { en: 'NewTaipei', zh: '新北', area: 'north' },
  { en: 'Taoyuan', zh: '桃園', area: 'north' },
  { en: 'Hsinchu', zh: '竹市', area: 'north' },
  { en: 'HsinchuCounty', zh: '竹縣', area: 'north' },
  { en: 'YilanCounty', zh: '宜蘭', area: 'north' },
  { en: 'Keelung', zh: '基隆', area: 'north' },
  { en: 'MiaoliCounty', zh: '苗栗', area: 'central' },
  { en: 'Taichung', zh: '台中', area: 'central' },
  { en: 'ChanghuaCounty', zh: '彰化', area: 'central' },
  { en: 'NantouCounty', zh: '南投', area: 'central' },
  { en: 'YunlinCounty', zh: '雲林', area: 'central' },
  { en: 'ChiayiCounty', zh: '嘉縣', area: 'south' },
  { en: 'Chiayi', zh: '嘉市', area: 'south' },
  { en: 'Tainan', zh: '台南', area: 'south' },
  { en: 'Kaohsiung', zh: '高雄', area: 'south' },
  { en: 'PingtungCounty', zh: '屏東', area: 'south' },
  { en: 'HualienCounty', zh: '花蓮', area: 'east' },
  { en: 'TaitungCounty', zh: '臺東', area: 'east' },
  { en: 'KinmenCounty', zh: '金門', area: 'island' },
  { en: 'PenghuCounty', zh: '澎湖', area: 'island' },
  { en: 'LienchiangCounty', zh: '連江', area: 'island' },
]

const body = document.querySelector('body')
const panel = document.querySelector('.panel')
const navFilterBtn = document.querySelector('.nav__filterBtn')
const panelHideBtn = document.querySelector('.filter__toggle')

const citySelect = document.querySelector('.citySelect__choose')
const areaSection = document.querySelector('.citySelect__areaSection')
const toggleIcon = document.querySelector('.citySelect__toggleIcon')
const filterList = document.querySelectorAll('.citySelect__filterList')
const cityName = document.querySelector('.citySelect__cityName')
const searchKeyword = document.querySelector('.search__input')
const search = document.querySelector('.search__confirm')

let filterObj = {
  city: '',
  keyword: ''
}

// ----- 初始化 -----
loadCitiesToFilter()

// ----- 載入地區資料至目的地篩選清單 -----
function loadCitiesToFilter() {
  filterList.forEach(area => {
    let areaItem = ''
    cities.forEach(item => {
      if (item['area'] === area.dataset.area) {
        areaItem += /*html*/ `
        <li class="citySelect__filterItem">
          <a
            href="javascript:;"
            class="citySelect__filterBtn"
            data-name="${item['en']}"
          >${item['zh']}</a>
        </li>
        `
      }
    })
    area.innerHTML = areaItem
  })
}

// ----- Panel 展開 / 收合 -----
function togglePanel() {
  panel.classList.toggle('show')
}

// ----- 目的地篩選列表 展開 / 收合 -----
function toggleFilterList(e) {
  if (e.target.closest('.citySelect__close')) return
  e.stopPropagation()
  areaSection.classList.toggle('active')
  toggleIcon.classList.toggle('active')
}

function closeFilterList(e) {
  areaSection.classList.remove('active')
}

// ----- 點擊篩選地區後 => 傳入 cityName 文字  -----
function selectCity(e) {
  // console.log(e.target)
  if (!e.target.classList.contains('citySelect__filterBtn')) return
  cityName.textContent = e.target.textContent
  filterObj['city'] = e.target.dataset.name
  cityName.classList.add('citySelect__cityName--selected')
}

function clearCity(e) {
  if (!e.target.closest('.citySelect__close')) return
  cityName.textContent = '目的地'
  filterObj['city'] = ''
  cityName.classList.remove('citySelect__cityName--selected')
}

function keywordHandler(e) {
  // --- 待新增活動資訊 ---
  filterObj['keyword'] = e.target.value
}

function searchHandler() {
  console.log(filterObj)
}

// ----- 監聽 -----
navFilterBtn.addEventListener('click', togglePanel, false)
panelHideBtn.addEventListener('click', togglePanel, false)
citySelect.addEventListener('click', toggleFilterList, false)
body.addEventListener('click', closeFilterList, false)
areaSection.addEventListener('click', selectCity, false)
citySelect.addEventListener('click', clearCity, false)
// searchKeyword.addEventListener('keyup', keywordHandler, false)
searchKeyword.addEventListener('change', keywordHandler, false)
search.addEventListener('click', searchHandler, false)