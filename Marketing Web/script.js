'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(function(btn){
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Fade Animation on Nav

const nav = document.querySelector('.nav');

const handleHover = function(e){

  if(e.target.classList.contains('.nav__link')){

    const link = e.target;
    const children = link.closest('nav').querySelectorAll('.nav--link');
    const logo = link.closest('nav').querySelector('img');

    children.forEach(function(el){

      if(el !== link){
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    })
  }
}
nav.addEventListener('mouseenter', handleHover.bind(1));
nav.addEventListener('mouseover', handleHover.bind(0.5));



document.querySelectorAll(".nav__link").forEach(function(el){
  el.addEventListener('click', function(e){
    e.preventDefault();

    const ids = this.getAttribute('href');
    
   document.querySelector(ids).scrollIntoView({behavior: 'smooth'});
  });
});

//Tabbed Component
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');

 tabContainer.addEventListener('click', function(e){
   const clicked = e.target.closest('.operations__tab');
     if(!clicked) return;
   
   //Active Tab    
   tabs.forEach(t => t.classList.remove('operations__tab--active'));
   tabContent.forEach(c => c.classList.remove('operations__content--active'));
   
   //Activate classes
   clicked.classList.add('operations__tab--active');
   
    
   document.querySelector(`.operations__content--${clicked.dataset.tab}`)
   .classList.add('operations__content--active');
 });

 //Fade Animation on nav__Links



 //Scroll Menu
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries){
  const [entry] = entries;


  if(!entry.isIntersecting )
   nav.classList.add('sticky');

  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);

//Revealing elements on Scroll

const allSections = document.querySelectorAll('.section');

const revealSections = function(entries, observe){

  const [entry] = entries;

  if(entry.isIntersecting){
    entry.target.classList.remove('section--hidden');
    observe.unobserve(entry.target);
  }
}

const revealObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15
});

allSections.forEach(function (section){
  revealObserver.observe(section);
//  section.classList.add('section--hidden');
});

//Loading images
const loadImages = document.querySelectorAll('img[data-src]');


const imagesCallback = function(entries, observer){

  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });

};
const observerImg = new IntersectionObserver(imagesCallback, {
  root: null,
  threshold: 0
});
loadImages.forEach(function(images){
  observerImg.observe(images);
});


//Slides

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const maxSlide = slides.length;
const dotContainer = document.querySelector('.dots');
let currentSlide = 0;

const createDots = function () {
  slides.forEach(function(_, i){
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  }); 
   
}
createDots();

const activateDots = function(slide){
  document.querySelectorAll('.dots__dot').forEach(function(dot){
    dot.classList.remove('dots__dot--active');

    document.querySelector(`.dots__dot[data-slide ="${slide}"]`).classList.add("dots__dot--active");
  });
}
activateDots(0)

const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.4) translateX(-1043px)';
// slider.style.overflow = 'visible';

const gotoSlide = function(slide){
slides.forEach((s, i) => 
(s.style.transform = `translateX(${100 * (i - slide)}%)`));
}
gotoSlide(0);

const nextSlide = function(){
  if(currentSlide  === maxSlide - 1){
    currentSlide = 0;
  }else{
    currentSlide++;
  }
  gotoSlide(currentSlide);
  activateDots(currentSlide);
}

const prevSlide = function(){

  if(currentSlide === 0){
    currentSlide = maxSlide - 1;
  }
  else{
    currentSlide--;
  }
  gotoSlide(currentSlide);
  activateDots(currentSlide);
}

//Event Handlers
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowRight'){
    nextSlide();  
  }
  else{
    e.key === 'ArrowLeft' && prevSlide();
  }
});
dotContainer.addEventListener('click', function(e){
  const slides = e.target.dataset.slide;
  gotoSlide(slides);
  activateDots(currentSlide);
})

