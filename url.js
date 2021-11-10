// -----  -----
const wrapper = document.querySelector('#wrapper')
const nav = document.querySelector('.nav')

// ----- 預設連結並渲染畫面 -----
window.onload = function () {
  history.pushState(null, null, '/F2E_3rd/travel-formosa/#')
  renderByUrl(location.hash)
}

// ----- 判斷連結並渲染 -----
function renderByUrl(url) {
  console.log("目前路徑為:", url)

  if (location.hash === '') {
    location.href = '#/'
    return
  }

  // google template
  if (url === "" ||
    url === "#/" ||
    url === "#/Home") {
    wrapper.innerHTML = "這是主頁"; // 
  } else if (url === "#/About") {
    wrapper.innerHTML = "這是關於頁";
  } else if (url === "#/Contact") {
    wrapper.innerHTML = "這是聯繫頁";
  } else {
    wrapper.innerHTML = /*html*/`
      <h1>找不到頁面</h1>
    `
  }
}

// ----- 點擊 a 連結改變網址 -----
function changeUrl(e) {
  e.preventDefault()
  if (!e.target.classList.contains('navLink')) return
  // 改變網址
  history.pushState(null, null, e.target.getAttribute('href'))
  renderByUrl(location.hash)
}

// ----- 監聽歷史紀錄變化 -----
window.addEventListener('popstate', function (e) {
  renderByUrl(location.hash)
})

// ----- 點擊 a 連結改變網址 -----
// nav.addEventListener('click', changeUrl, false)
