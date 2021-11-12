const swiper_header = new Swiper('.swiper-header', {
  speed: 800,
  spaceBetween: 100,
  grabCursor: true,

  // Optional parameters
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination-header',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})

const swiper_hotSpot = new Swiper('.swiper-hotSpot', {
  speed: 400,
  spaceBetween: 12,
  grabCursor: true,
  slidesPerView: 'auto',
  lazy: {
    loadPrevNext: true,
    loadPrevNextAmount: 100,
  },
  breakpoints: {
    320: {
      spaceBetween: 12
    },
    767: {
      spaceBetween: 12
    },
    992: {
      spaceBetween: 24
    },
  },

  // Optional parameters
  direction: 'horizontal',
  loop: false,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next-hotSpot',
    prevEl: '.swiper-button-prev-hotSpot',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})

const swiper_page = new Swiper('.swiper-page', {
  speed: 800,
  spaceBetween: 20,
  grabCursor: true,
  lazy: {
    loadPrevNext: true,
    loadPrevNextAmount: 10,
  },

  // Optional parameters
  direction: 'horizontal',
  loop: false,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination-page',
  },

  navigation: {
    nextEl: '.swiper-button-next-page',
    prevEl: '.swiper-button-prev-page',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})