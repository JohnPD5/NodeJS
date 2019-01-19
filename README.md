# To run the express application
  > npm run express

# To run the node server
  > npm run nodeServer

# Lazy loading image logic
  - Prendo tutte le immagini all'interno della pagina
  - N.B Le immagini già presenti in pagina sono di qualità bassa (in modo da non appesantire il caricamento)
  
  - Dal JS > Creo un elemento <img> per ogni immagine nella pagina ??
  - Ad ogni elemento creato, assegno un attributo src con il path dell'immagine di qualità alta,
    che prenderò da un file.
  - Dopo che si sono caricati gli elementi che ho creato dal js
  - Prendo i loro attributi "src"
  - Rimpiazzo gli "src" delle immagini già in pagina con quelli di qualità alta

  - TO DO:
    > Trovare il modo per mappare ogni immagine di
      bassa qualità al suo corrispondente in alta qualità.