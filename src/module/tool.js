import { cities, noDataHTML } from './template.js'

// 找出 city 的 en (網址篩選用)
export function cityEnFilter(name = 'all') {
  // 更新 : 因為 api 資料有些沒有 city 欄位，改用地址取出縣市
  const cityZh = name.slice(0, 3)
  const targetCityEn = cities.find(item => item['zh'] === cityZh)
  return targetCityEn['en']
}

// 找出 city (顯示用)
export function cityFilter(name) {
  // 更新 : 因為 api 資料有些沒有 city 欄位，改用地址取出縣市
  if (name === undefined) return '未標示'
  const cityZh = name.slice(0, 3)
  return cityZh
}

// 取得隨機數
export function randomNum(num) {
  return Math.floor(Math.random() * num)
}

// 時間格式 ex : 2021-
export function parseDate(date) {
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

// 活動時間格式轉換
export function dateFormat(data) {
  data.forEach(item => {
    const { year: startYear, month: startMon, day: startDate } = parseDate(item['StartTime'])
    const { year: endYear, month: endMon, day: endDate } = parseDate(item['EndTime'])
    item['StartTime'] = `${startYear}-${startMon}-${startDate}`
    item['EndTime'] = `${endYear}-${endMon}-${endDate}`
  })
}

// 介紹文字斷行
export function chineseBreakWord(para) {
  if (para === undefined) return noDataHTML
  let contentAry = para.split('。')
  contentAry.pop()
  const paragraph = contentAry.reduce((html, para) => {
    html += `
    <p>${para}。</p>
    `
    return html
  }, ``)
  return paragraph
}