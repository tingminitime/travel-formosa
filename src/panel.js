import { renderByUrl } from './router.js'
import { cities } from './module/template.js'

const body = document.querySelector('body')
const panel = document.querySelector('.panel')
const navFilterBtn = document.querySelector('.nav__filterBtn')

// ----- Pannel 元件 -----
// 手機版收和按鈕
const panelHideBtn = document.querySelector('.filter__toggle')
// 目的地選擇
const citySelect = document.querySelector('.citySelect__choose')
const areaSection = document.querySelector('.citySelect__areaSection')
const toggleIcon = document.querySelector('.citySelect__toggleIcon')
const filterList = document.querySelectorAll('.citySelect__filterList')
const cityName = document.querySelector('.citySelect__cityName')
// 搜尋關鍵字 input
const keywordInput = document.querySelector('.search__input')
// 精選主題
const themeList = document.querySelector('.theme__list')
// 搜尋按鈕
const search = document.querySelector('.search__confirm')

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
            data-city="${item['en']}"
          >${item['name']}</a>
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

// 點擊篩選地區後 => 傳入 cityName 文字
function selectCity(e) {
  // console.log(e.target)
  if (!e.target.classList.contains('citySelect__filterBtn')) return
  cityName.textContent = e.target.textContent
  cityName.classList.add('citySelect__cityName--selected')
  cityName.dataset.city = e.target.dataset.city
}

// 清除目的地
function clearCity(e) {
  if (!e.target.closest('.citySelect__close')) return
  cityName.textContent = '目的地'
  cityName.classList.remove('citySelect__cityName--selected')
  cityName.dataset.city = 'all'
}

// 精選主題選擇
let prevThemeBtn
function themeSelect(e) {
  if (!e.target.closest('.theme__item')) return
  let themeBtn = e.target.closest('.theme__item .theme__btn')
  themeBtn.classList.toggle('active')

  themeBtn.dataset.select === 'false' ?
    themeBtn.dataset.select = 'true' :
    themeBtn.dataset.select = 'false'
  if (prevThemeBtn && prevThemeBtn !== themeBtn) {
    prevThemeBtn.classList.remove('active')
    prevThemeBtn.dataset.select = 'false'
  }
  prevThemeBtn = themeBtn
}

// 搜尋 Task
let filterObj = {
  keyword: '',
  city: '',
  sort: ''
}

function searchHandler() {
  // 檢查 精選主題 是否有選擇
  const themeBtn = document.querySelectorAll('.theme__btn')
  const themeSelectStatus = [...themeBtn].every(item => {
    return item.dataset.select === 'false'
  })
  if (themeSelectStatus) {
    alert('請選擇「精選主題」')
    console.log('prevThemeBtn: ', prevThemeBtn)
    return
  }

  // 關鍵字
  const searchKeyword = document.querySelector('.search__input')
  filterObj['keyword'] = searchKeyword.value
  // 目的地
  const selectCity = document.querySelector('.citySelect__cityName')
  filterObj['city'] = selectCity.dataset.city
  // 精選主題
  const selectThemeBtn = [...themeBtn].find(item => {
    return item.dataset.select === 'true'
  })
  filterObj['sort'] = selectThemeBtn.dataset.sort

  // 搜尋後 => 變換 url hash
  const { keyword, city, sort } = filterObj
  const url = keyword ? `#/${sort}/${city}?search=${keyword}` : `#/${sort}/${city}`
  // console.log(url)
  history.pushState(null, null, url)
  // router 判斷渲染畫面
  renderByUrl(location.hash)
  console.log(filterObj)
}

// ----- 監聽 -----
// Panel
navFilterBtn.addEventListener('click', togglePanel, false)
panelHideBtn.addEventListener('click', togglePanel, false)
citySelect.addEventListener('click', toggleFilterList, false)
body.addEventListener('click', closeFilterList, false)
areaSection.addEventListener('click', selectCity, false)
citySelect.addEventListener('click', clearCity, false)
themeList.addEventListener('click', themeSelect, false)
search.addEventListener('click', searchHandler, false)
keywordInput.addEventListener('keyup', function (e) {
  if (e.keyCode === 13) searchHandler()
  else return
}, false)

// ----- export -----
export { filterObj }