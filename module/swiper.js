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
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})