class LazyLoader {
  constructor(images = []) {
    this.config = {
      rootMargin: "50px 0px",
      threshold: 0.5
    };
    this.images = images;
    this.observer;
    this.init();
  }

  init() {
    // Check if the browser supports Interserction Observer
    if(!("IntersectionObserver" in window) && 
    !("IntersectionObserverEntry" in window) &&
    !("intersectionRatio" in window.IntersectionObserverEntry.prototype)) {
      console.warn("Intersection Observer API is not supported by your browser.");
      // If not supported, load the images instantly
      this.instantLoad();
      return;
    }

    // Check if there are given images
    if(this.images.length === 0) {
      console.error("You must give an array of images");
      return;
    }
    
    // Initialize Intersection Observer
    this.observer = new IntersectionObserver(this.intersectionCallback, this.config);
    // Observe every image inside the images array
    this.images.forEach(image => {
      this.observer.observe(image);
    }); 
  }

  intersectionCallback(entries, observer) {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        // Check if the entry is already inside the page
        if(entry.target.classList.contains("inview")) {
          return;
        }

        // REMINDER: "dataset" non è supportato dalle precedenti di IE11
        // Usare getAttribute() se necessario
        const imgSource = entry.target.dataset.src;
        entry.target.src = imgSource;
        entry.target.classList.add("inview");
      }
    }); 
  }

  instantLoad() {
    if(this.images.length === 0) {
      return;
    }

    this.images.forEach(image => {
      const imgSource = image.dataset.src;
      image.src = imgSource;
      image.classList.add("inview");
    })
  }
}