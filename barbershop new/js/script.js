    const navMain = document.querySelector('.main-nav');
    const navToggle = document.querySelector('.main-nav__toggle');
    const link = document.querySelector('.main-nav__user-login');
    const popup = document.querySelector('.modal-login');
    const close = popup.querySelector('.modal-login__close');
    const form = popup.querySelector('form');
    const login = popup.querySelector("[name=login]");
    const password = popup.querySelector("[name=password]");

    let isStorageSupport = true;
    let storage = '';

    navMain.classList.remove('main-nav--nojs');

    navToggle.addEventListener('click', function () {
      if (navMain.classList.contains('main-nav--closed')) {
        navMain.classList.remove('main-nav--closed');
        navMain.classList.add('main-nav--opened');
      } else {
        navMain.classList.add('main-nav--closed');
        navMain.classList.remove('main-nav--opened');
      }
    });

    try {
      storage = localStorage.getItem('login');
      } catch (err) {
        isStorageSupport = false;
      }

      link.addEventListener('click', event => {
        event.preventDefault();
        popup.classList.add('modal-login--show');

      if (storage) {
        login.value = storage;
        password.focus();
      } else {
        login.focus();
      }
    });

    close.addEventListener('click', event => {
      event.preventDefault();
      popup.classList.remove('modal-login--show');
      popup.classList.remove('modal-login--error');
    });

    form.addEventListener('submit', event => {
      if (!login.value || !password.value) {
        event.preventDefault();
        popup.classList.remove('modal-login--error');
        popup.offsetWidth = popup.offsetWidth;
        popup.classList.add('modal-login--error');
        } else {
          if (isStorageSupport) {
            localStorage.setItem('login', login.value);
          }
        }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        if (popup.classList.contains('modal-login--show')) {
          event.preventDefault();
          popup.classList.remove('modal-login--show');
          popup.classList.remove('modal-login--error');
        }
      }
    });

    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlide() {
      showSlides(slideIndex += 1);
    }

    function minusSlide() {
      showSlides(slideIndex -= 1);
    }

    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
      const slides = document.querySelectorAll('.reviews__item');
      const sliderToggles = document.querySelectorAll('.slider__toggle')
      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }
      for (let item of slides) {
        item.style.display = 'none';
      }
      for (let toggle of sliderToggles) {
        toggle.classList.remove('slider__toggle--active');
      }
      slides[slideIndex - 1].style.display = 'block';
      sliderToggles[slideIndex + 2].classList.add('slider__toggle--active');
    }