const registraBotao = document.getElementById("register");
const loginBotao = document.getElementById("login");
const container = document.getElementById("container");

registraBotao.addEventListener("click", () => {

    container.classList.add("right-panel-active");

});

loginBotao.addEventListener("click", () => {

    container.classList.remove("right-panel-active");

});