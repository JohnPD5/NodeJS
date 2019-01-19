// Prendo tutte le immaggini dentro il document e le salvo all'interno di un array
let images = Array.from(document.images);

images.forEach((image) => {
  let oldResource = image.getAttribute("src");
  let newResource = oldResource.replace("640", "1920");

  // Creo un elemento image
  let bigImage = document.createElement("img"); 

  // Quando l'elemento image viene creato
  bigImage.onload = () => {
    // Cambio l'attributo src dell'immagine piccola
    // E gli metto il path dell'immagine grande
    image.setAttribute("src", bigImage.getAttribute("src"));
    image.classList.replace("blur", "noblur");
  }

  // Setto l'attributo src all'elemento che ho creato
  setTimeout(() => bigImage.setAttribute("src", newResource), 50);
})





