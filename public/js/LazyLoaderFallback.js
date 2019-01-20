class LazyLoaderFallback {
  constructor(images = []) {
    this.images = images;
    this.init();
  }

  init() {
    if(this.images.length === 0) {
      return;
    }

    this.images.forEach(image => {
      // Prendo il path dell'immagine a bassa qualità
      const oldSource = image.getAttribute("src");
      // Creo una stringa che registra il path dell'immagine di alta qualità 
      const newSource = oldSource.replace("640", "1920");

      // Creo un elemento img
      // N.B => Questo elemento non viene inserito nel DOM
      const bigImage = document.createElement("img");

      // Quando il mio elemento viene creato
      bigImage.onload = () => {
        // Cambio l'attributo src dell'immagine all'interno del DOM
        // Settandogli l'attributo src dell'elemento che ho creato
        image.setAttribute("src", bigImage.getAttribute("src"));
        image.classList.replace("blur", "noblur");
      }

      // Setto l'attributo src all'elemento che ho creato
      // dandogli il path dell'immagine di alta qualità
      setTimeout(() => { bigImage.setAttribute("src", newSource) }, 50);
    });
  }
}