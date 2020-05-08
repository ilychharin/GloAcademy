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

let login = localStorage.getItem('gloDelivery');



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



function createCardRestaurant() {
const card = `
 <a class="card card-restaurant">
     <img src="img/food-band/preview.jpg" alt="image" class="card-image"/>
     <div class="card-text">
         <div class="card-heading">
            <h3 class="card-title">FoodBand</h3>
             <span class="card-tag tag">40 мин</span>
         </div>
         <div class="card-info">
             <div class="rating">
             4.5
             </div>
         <div class="price">От 450 ₽</div>
         <div class="category">Пицца</div>
         </div>
     </div>
  </a>
`;

cardsRestaurants.insertAdjacentHTML('beforeend', card);


}

function createCartGood(){
  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('beforeend',`
\t\t\t\t\t\t<img src="img/pizza-plus/pizza-oleole.jpg" alt="image" class="card-image"/>
\t\t\t\t\t\t<div class="card-text">
\t\t\t\t\t\t\t<div class="card-heading">
\t\t\t\t\t\t\t\t<h3 class="card-title card-title-reg">Пицца Оле-Оле</h3>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="card-info">
\t\t\t\t\t\t\t\t<div class="ingredients">Соус томатный, сыр «Моцарелла», черри, маслины, зелень, майонез
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t<div class="card-buttons">
\t\t\t\t\t\t\t\t<button class="button button-primary button-add-cart">
\t\t\t\t\t\t\t\t\t<span class="button-card-text">В корзину</span>
\t\t\t\t\t\t\t\t\t<span class="button-cart-svg"></span>
\t\t\t\t\t\t\t\t</button>
\t\t\t\t\t\t\t\t<strong class="card-price-bold">440 ₽</strong>
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
      cardsMenu.textContent = "";
      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');

      createCartGood();
      createCartGood();
      createCartGood();
    }
  }
  else{
      modalAuth.classList.toggle('is-open');
    }
}


  cartButton.addEventListener("click", toggleModal);

  close.addEventListener("click", toggleModal);

  cardsRestaurants.addEventListener('click', openGoods);

  logo.addEventListener('click', function () {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
});

checkAuth();
createCardRestaurant();
createCardRestaurant();
createCardRestaurant();
