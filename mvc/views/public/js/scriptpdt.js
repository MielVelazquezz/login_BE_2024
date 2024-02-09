"use strict";

const imgBtn = Array.from(document.querySelectorAll(".img-btn"));
const img = document.querySelector(".img-main");
const mainImgBtns = Array.from(document.querySelectorAll(".img-main__btn"));

const overlayCon = document.querySelector(".overlay-container");
const overlayImg = document.querySelector(".item-overlay__img");
const overlayImgBtn = Array.from(
  document.querySelectorAll(".overlay-img__btn")
);
const overlayBtnImgs = Array.from(
  document.querySelectorAll(".overlay-img__btn-img")
);
const overlayCloseBtn = document.querySelector(".item-overlay__btn ");
const overlayBtns = Array.from(document.querySelectorAll(".overlay-btn"));

const cartBtn = document.querySelector(".head-rgt__btn");
const cart = document.querySelector(".head-cart");
const cartItem = document.querySelector(".head-cart__item");
const emptyCartTxt = document.querySelector(".head-cart__txt");
const addToCart = document.querySelector(".price-cart__btn");
const clearCart = document.querySelector(".head-cart__item-btn");
const priceSingle = document.querySelector(".head-cart__price-single");
const priceTotal = document.querySelector(".head-cart__price-total");

const priceBtns = Array.from(document.querySelectorAll(".price-btn__img"));
const totalItems = document.querySelector(".price-btn__txt");

const menuOpen = document.querySelector(".head-lft__btn");
const menu = document.querySelector(".head-nav");
const menuBtnImg = document.querySelector(".head-lft__btn-img");

const bodyOverlay = document.querySelector(".body-wrapper");
const body = document.querySelector("body");

const headerCart = document.querySelector(".head-rgt");

let nextImg = 0,
  noOfItems = 0,
  clicked,
  trasitionTimer;

const minQuery = window.matchMedia("(min-width: 850px)"),
  maxQuery = window.matchMedia("(max-width: 850px)");

// FUNÇÕES
function transitionDelay() {
  body.classList.add("preload");
  clearTimeout(trasitionTimer);
  trasitionTimer = setTimeout(() => {
    body.classList.remove("preload");
  }, 1000);
}

/* função pra mudar imagem atraves da setinha*/
function imgBtns(btns, img, imgName) {
  btns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      if (e.target.classList.contains(`${imgName}__btnlft-img`)) {
        if (nextImg <= 0) nextImg = 3;
        else nextImg--;

        img.src = `images/image-product-${nextImg + 1}.jpg`;
      }

      if (e.target.classList.contains(`${imgName}__btnrgt-img`)) {
        if (nextImg >= 3) nextImg = 0;
        else nextImg++;

        img.src = `images/image-product-${nextImg + 1}.jpg`;
      }
    });
  });
}

imgBtns(overlayBtns, overlayImg, "item-overlay");
imgBtns(mainImgBtns, img, "img-main");

/* função pra mostrar o preço no carrinho  */
function productPrice(items) {
  totalItems.textContent = items;
  priceSingle.textContent = `25 * R${items}`;
  priceTotal.textContent = `R$${25 * items}`;
  if (items >= 1) {
    headerCart.setAttribute("data-content", `${items}`);
    headerCart.style.setProperty("--display", `block`);
  } else {
    headerCart.style.setProperty("--display", `none`);
  }
}

/* função de fechamento da barra lateral (carrinho) */
function closeMenu() {
  menu.classList.remove("open-menu");
  body.style.overflow = "visible";
  bodyOverlay.classList.remove("open-overlay");
  menuBtnImg.src = "images/icon-menu.svg";
}

/* função de abrir o carrinho */

function openMenu() {
  menu.classList.add(".open-menu");
  menuBtnImg.src = "images/icon-close.svg";
  body.style.overflow = "hidden";
  cart.classList.remove("open-cart");
  bodyOverlay.classList.add("open-overlay");
}

function cartIt() {
  cartItem.classList.add("open-cart");
  emptyCartTxt.classList.remove("open-cart");
}


function cartTx() {
  cartItem.classList.remove("open-cart");
  emptyCartTxt.classList.add("open-cart");
}

function emptyCart() {
  cartItem.classList.remove("open-cart");
  emptyCartTxt.classList.remove("open-cart");
}


cartBtn.addEventListener("click", function () {
  cart.classList.toggle("open-cart");
  if (cart.classList.contains("open-cart")) {
    if (noOfItems >= 1 && clicked === true) cartIt();
    else cartTx();
  } else {
    emptyCart();
  }
});

priceBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    clicked = false;
    if (e.target.classList.contains("price-btn__add-img")) {
      if (noOfItems >= 10) return;
      noOfItems++;
      productPrice(noOfItems);
    } else if (e.target.classList.contains("price-btn__remove-img")) {
      if (noOfItems <= 0) return;
      noOfItems--;
      productPrice(noOfItems);
    }
  });
});

addToCart.addEventListener("click", function (e) {
  clicked = true;
  if (cart.classList.contains("open-cart")) {
    if (noOfItems >= 1) {
      cartIt();
    } else if (noOfItems <= 0) {
      cartTx();
    }
  }
});

clearCart.addEventListener("click", function () {
  cartTx();
  noOfItems = 0;
  totalItems.textContent = noOfItems;
  headerCart.style.setProperty("--display", `none`);
});

img.addEventListener("click", function () {
  if (minQuery.matches) {
    overlayCon.style.display = "block";
    overlayImg.src = img.src;
  }
});

overlayCloseBtn.addEventListener("click", function () {
  if (minQuery.matches) {
    overlayCon.style.display = "none";
  }
});

overlayImgBtn.forEach((btn, i) => {
  btn.addEventListener("click", function (e) {
    overlayImg.src = `images/image-product-${i + 1}.jpg`;
    nextImg = e.target.dataset.img;
  });
});

imgBtn.forEach((btn, i) => {
  btn.addEventListener("click", function () {
    img.src = `images/image-product-${i + 1}.jpg`;
  });
});

// MENU
menuOpen.addEventListener("click", function () {
  menu.classList.toggle("open-menu");
  if (menu.classList.contains("open-menu")) {
    openMenu();
    emptyCart();
  } else {
    closeMenu();
  }
});

window.addEventListener("resize", function () {
  transitionDelay();

  if (maxQuery.matches) overlayCon.style.display = "none";

  if (minQuery.matches) closeMenu();
});

window.addEventListener("load", function () {
  transitionDelay();
});
