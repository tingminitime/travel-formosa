import { renderByUrl } from './router.js'

export let pageInfo = {
  CARDS_COUNT_PER_PAGE: 9,
  aroundCurr: 2,
  currentPage: 1
}

// ----- 監聽歷史紀錄變化 -----
window.addEventListener('hashchange', function (e) {
  // Filter 換頁不觸發 renderByUrl，及初始化 currentPage
  if (!location.hash.includes('&page=')) {
    renderByUrl(location.hash)
    pageInfo['currentPage'] = 1
  }
  console.log('偵測網址變更')
}, false)