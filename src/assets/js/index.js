import '../styles/styles.scss';
import '../styles/recet.scss';
import '../styles/mixins.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-cards';

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectCards } from 'swiper/modules';
import { languages } from './languages';
Swiper.use([Navigation, Pagination, Autoplay, EffectCards]);

const classes = {
  active: 'active',
};

const menuLink = document.querySelectorAll('.menu-link');
const accordionItems = document.querySelectorAll('.accordion-item');
const scrollIndicator = document.querySelector('.description-scroll-indicator');
const aboutSection = document.getElementById('about');
const languageElements = document.querySelectorAll('.header-menu__language');
const currentLangElement = document.querySelector('.current-lang');

const scrollToSection = (e) => {
  e.preventDefault();

  const targetId = e.currentTarget.getAttribute('href');

  if (!targetId || !targetId.startsWith('#')) return;
  const section = targetId.slice(1);
  const top = document.getElementById(section)?.offsetTop || 0;

  window.scrollTo({
    top: top,
    behavior: 'smooth',
  });
};

const scrollToAbout = () => {
  aboutSection.scrollIntoView({ behavior: 'smooth' });
};

accordionItems.forEach((item) => {
  const header = item.querySelector('.accordion-header');
  const content = item.querySelector('.accordion-content');

  header.addEventListener('click', () => {
    item.classList.toggle(classes.active);
    content.style.maxHeight = item.classList.contains(classes.active)
      ? content.scrollHeight + 'px'
      : '0';

    const line = item.querySelector('.accordion-line');

    if (item.classList.contains(classes.active) && !line) {
      const newLine = document.createElement('div');
      newLine.classList.add('accordion-line');
      header.appendChild(newLine);
    } else if (!item.classList.contains(classes.active) && line) {
      line.remove();
    }
  });
});

const initSlider = () => {
  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    speed: 500,
    effect: 'cards',
    slidesPerView: 1,
    freeMode: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 2000,
    },
  });
};

const currentLang = localStorage.getItem('lang') || 'en';
if (currentLangElement) {
  currentLangElement.innerText = currentLang.toUpperCase();
}

const setTexts = () => {
  const lang = localStorage.getItem('lang') || 'en';
  const content = languages[lang];
  Object.entries(content).forEach(([key, value]) => {
    const items = document.querySelectorAll(`[data-text='${key}']`);
    items.forEach((item) => {
      item.innerText = value;
    });
  });
};

const toggleLanguage = ({ target }) => {
  const { lang } = target.dataset;

  if (!lang) return;

  localStorage.setItem('lang', lang);
  setTexts();

  if (currentLangElement) {
    currentLangElement.innerText = lang.toUpperCase();
  }
};

setTexts();
initSlider();
menuLink.forEach((item) => item.addEventListener('click', scrollToSection));
languageElements.forEach((lang) => {
  lang.addEventListener('click', toggleLanguage);
});
scrollIndicator.addEventListener('click', scrollToAbout);
