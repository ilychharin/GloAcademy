const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const logInInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

const restaurantTitle = document.querySelector('.restaurant-title');
const rating = document.querySelector('.rating');
const minPrice = document.querySelector('.price');
const category = document.querySelector('.category');

let login = localStorage.getItem('gloDelivery');


const getData = async function(url){

  const response = await fetch(url);

  if (!response.ok){
    throw new Error(`Ошибка по адресу ${url},
     статус ошибка ${response.status}`);
  }

    return await response.json();

};



function toogleModalAuth() { // Закрываем и открываем окно авторизации
  modalAuth.classList.toggle('is-open');
  logInInput.style.borderColor = '';
}

function toggleModal() {
  modal.classList.toggle("is-open");
}



function authorized(){
  function logOut(){
    login = null;
    localStorage.removeItem('gloDelivery');
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
  }

  console.log('Авторизован');
  userName.textContent = login;
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';
  buttonOut.addEventListener('click', logOut);
}

function notAuthorized () {
  console.log('Не авторизован');
  function logIn(event){
    event.preventDefault();
    if (logInInput.value){
      login = logInInput.value;
      localStorage.setItem('gloDelivery', login);
      toogleModalAuth();
      buttonAuth.removeEventListener('click', toogleModalAuth);
      closeAuth.removeEventListener('click', toogleModalAuth);
      logInForm.removeEventListener('submit', logIn);
      logInForm.reset();
      checkAuth();
    } else {
      logInInput.style.borderColor = 'red';
    }
  }
  buttonAuth.addEventListener('click', toogleModalAuth);
  closeAuth.addEventListener('click', toogleModalAuth);
  logInForm.addEventListener('submit', logIn);
}




function checkAuth(){
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}



function createCardRestaurant(restaurant) {

  const {
    image,
    kitchen,
    name,
    price,
    stars,
    products,
    time_of_delivery : timeOdDelivery
  } = restaurant;

const card = `
 <a class="card card-restaurant" data-products = "${products}"
 data-info ="${[name, price, stars, kitchen]}"
 >
     <img src="${image}" alt="image" class="card-image"/>
     <div class="card-text">
         <div class="card-heading">
            <h3 class="card-title">${name}</h3>
             <span class="card-tag tag">${timeOdDelivery} мин.</span>
         </div>
         <div class="card-info">
             <div class="rating">
             ${stars}
             </div>
         <div class="price">От ${price} р</div>
         <div class="category">${kitchen}</div>
         </div>
     </div>
  </a>
`;

cardsRestaurants.insertAdjacentHTML('beforeend', card);


}

function createCartGood(goods){

  const {
      description,
      id,
      image,
      name,
      price
  } = goods;

  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('beforeend',`
\t\t\t\t\t\t<img src="${image}" alt="image" class="card-image"/>
\t\t\t\t\t\t<div class="card-text">
\t\t\t\t\t\t\t<div class="card-heading">
\t\t\t\t\t\t\t\t<h3 class="card-title card-title-reg">${name}</h3>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="card-info">
\t\t\t\t\t\t\t\t<div class="ingredients">${description}
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="card-buttons">
\t\t\t\t\t\t\t\t<button class="button button-primary button-add-cart">
\t\t\t\t\t\t\t\t\t<span class="button-card-text">В корзину</span>
\t\t\t\t\t\t\t\t\t<span class="button-cart-svg"></span>
\t\t\t\t\t\t\t\t</button>
\t\t\t\t\t\t\t\t<strong class="card-price-bold">${price} ₽</strong>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</div>
  `);

  cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {

  if (login){
    const target = event.target;
    const restaurant = target.closest('.card-restaurant');

    if  (restaurant){

      const info = restaurant.dataset.info.split(',');
      const [name, price, stars, kitchen] = info;

      cardsMenu.textContent = "";
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');

      restaurantTitle.textContent = name;
      rating.textContent = stars;
      minPrice.textContent = 'От' + price + 'Р';
      category.textContent = kitchen;


      getData(`./db/${restaurant.dataset.products}`).then(function (data) {
        data.forEach(createCartGood);
    });
    }
  }
  else{
      toogleModalAuth();
    }
}


getData('./db/partners.json').then(function (data) {
  data.forEach(createCardRestaurant);
});



function init() {
  cartButton.addEventListener("click", toggleModal);

  close.addEventListener("click", toggleModal);

  cardsRestaurants.addEventListener('click', openGoods);

  logo.addEventListener('click', function () {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
  });

  checkAuth();
}

  init();

