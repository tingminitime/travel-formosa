// ------ 景點 -----
const spotRequest = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot',
  headers: GetAuthorizationHeader()
})

// ------ 美食 -----
const foodRequest = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant',
  headers: GetAuthorizationHeader()
})

// ------ 住宿 -----
const hotelRequest = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel',
  headers: GetAuthorizationHeader()
})

// ------ 活動 -----
const activityRequest = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity',
  headers: GetAuthorizationHeader()
})

// 景點 api
export const SPOT_apiRequest = () => {
  // 關鍵字搜尋
  const spotAllFilter = keyword => spotRequest.get(`?$filter=contains(Name,'${keyword}')&$format=JSON`)
  // 取隨機首幾筆 (必須有照片)
  const spotAllTop = (top, skip) => spotRequest.get(`?$filter=Picture/PictureUrl1 ne null&$top=${top}&$skip=${skip}&$format=JSON`)
  const spotCity = city => spotRequest.get(`/${city}?$format=JSON`)
  return { spotAllFilter, spotAllTop, spotCity }
}

// 美食 api
export const FOOD_apiRequest = () => {
  // 關鍵字搜尋
  const foodAllfilter = keyword => foodRequest.get(`?$filter=contains(Name,'${keyword}')&$format=JSON`)
  // 取隨機首幾筆 (必須有照片)
  const foodAllTop = (top, skip) => foodRequest.get(`?$filter=Picture/PictureUrl1 ne null&$top=${top}&$skip=${skip}&$format=JSON`)
  const foodCity = city => foodRequest.get(`/${city}?$format=JSON`)

  return { foodAllfilter, foodAllTop, foodCity }
}

// 住宿 api
export const HOTEL_apiRequest = () => {
  // 關鍵字搜尋
  const hotelAllfilter = keyword => hotelRequest.get(`?$filter=contains(Name,'${keyword}')&$format=JSON`)
  // 取隨機首幾筆 (必須有照片)
  const hotelAllTop = (top, skip) => hotelRequest.get(`?$filter=Picture/PictureUrl1 ne null&$top=${top}&$skip=${skip}&$format=JSON`)
  const hotelCity = city => hotelRequest.get(`/${city}?$format=JSON`)

  return { hotelAllfilter, hotelAllTop, hotelCity }
}

// 活動 api
export const ACTIVITY_apiRequest = () => {
  // 關鍵字搜尋
  const activityAllfilter = keyword => activityRequest.get(`?$filter=contains(Name,'${keyword}')&$format=JSON`)
  // 取隨機首幾筆 (必須有照片)
  const activityAllTop = (top, skip) => activityRequest.get(`?$filter=Picture/PictureUrl1 ne null&$top=${top}&$skip=${skip}&$format=JSON`)
  const activityCity = city => activityRequest.get(`/${city}?$format=JSON`)

  return { activityAllfilter, activityAllTop, activityCity }
}

// API 驗證 (TDX 提供)
function GetAuthorizationHeader() {
  var AppID = '298e24d8dcd5462d94df034984044beb';
  var AppKey = 'u2fa9eTpee-g9HdU2diZCLoFDhY';

  var GMTString = new Date().toGMTString();
  var ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  var HMAC = ShaObj.getHMAC('B64');
  var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

  return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/ }; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}