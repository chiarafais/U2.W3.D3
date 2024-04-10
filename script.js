const fetchCharacters = () => {
  fetch("https://striveschool-api.herokuapp.com/books?")
    .then((response) => {
      console.log(response);

      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 400) {
          throw new Error("Bad Request");
        }
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        if (response.status === 403) {
          throw new Error("Forbidden");
        }
        if (response.status === 404) {
          throw new Error("Not Found");
        }
        if (response.status === 500) {
          throw new Error("Server Error");
        }
        throw new Error("Generic Fetch Error");
      }
    })
    .then((libraryData) => {
      // qui dentro possiamo avere l'assoluta certezza di essere sincronizzati con l'arrivo del dato,
      // perché questo .then() scatterà solo dopo la risoluzione del .json() precedente

      // a questo punto possiamo usare il dato contenuto nel parametro (in questo caso chiamato disneyData) come ci pare!

      // es. DOM MANIPULATION!
      console.log(libraryData); // oggetto intero
      // array interno all'oggetto

      const row = document.getElementById("libraries-row");

      // utilizziamo il dato come di consueto, è un semplice array a questo punto che possiamo ciclare per generare elementi nel DOM
      libraryData.forEach((char) => {
        const col = document.createElement("col");
        col.classList.add("col-md-3", "col-12", "col-sm-6", "col-lg-2", "mb-3");
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = char.img;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const h5 = document.createElement("h5");
        h5.classList.add("card-title");
        h5.innerText = char.title;

        const p = document.createElement("p");
        p.classList.add("card-text", "card-price");
        p.innerText = "€ " + char.price;

        const button = document.createElement("button");
        button.classList.add("btn", "btn-primary");

        button.innerHTML = "SCARTA " + '<i class="bi bi-trash3-fill"></i>';

        const buttonAdd = document.createElement("button");
        buttonAdd.classList.add("btn", "btn-primary");
        buttonAdd.innerHTML = "AGGIUNGI " + '<i class="bi bi-cart-plus"></i>';

        button.addEventListener("click", function () {
          col.remove();
        });

        let cartUl = document.querySelector("ul");
        buttonAdd.addEventListener("click", function () {
          const titleCart = document.createElement("li");
          titleCart.classList.add("titleList");

          titleCart.innerText = char.title + " - € " + char.price;

          cartUl.appendChild(titleCart);
        });

        col.appendChild(card);
        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(h5);
        cardBody.appendChild(p);
        cardBody.appendChild(button);
        cardBody.appendChild(buttonAdd);
        row.appendChild(col);
      });
    })
    .catch((error) => console.log(error));
};

window.onload = () => {
  fetchCharacters();
};
