// REDEFINIR SENHA
const button = document.querySelector("button"),
      toast = document.querySelector(".toast")
      closeIcon = document.querySelector(".close"),
      progress = document.querySelector(".progress");


button.addEventListener("click", () => {

    toast.classList.add("active");
    progress.classList.add("active");

    setTimeout(() =>{
        toast.classList.remove("active");
    }, 5000);

});

closeIcon.addEventListener("click", () => {

    toast.classList.remove("active");

    setTimeout(() =>{
        progress.classList.remove("active");
    }, 5300);

});