const botao = document.getElementById("botaoBanner");

botao.addEventListener("click", function () {

    alert("Bem-vindo à Sweet Cake 🍰");

});

// efeito nos  cards

const cards = document.querySelectorAll(".card");

cards.forEach(function(card){

    card.addEventListener("mouseenter", function(){

        card.style.transition = "0.4s";

    });

});
