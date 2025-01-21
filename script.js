const cards = document.querySelectorAll(".card");

//setting the back image for each card
cards.forEach(
    (el, index) => {
       let img = document.createElement("img");
       img.src = "/memory-game/images/back-pattern.jpg";
       el.appendChild(img); 
    }
);
