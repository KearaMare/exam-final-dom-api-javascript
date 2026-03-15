const TitleInput = document.querySelector("#titre");
const URLInput = document.querySelector("#url");
const DescriptionInput = document.querySelector("#description");
const FormAddFavorite = document.querySelector("#favori-form");
const Container = document.querySelector(".favoris-container");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function displayFavorites() {
  Container.innerHTML = "";
  favorites.forEach((fav, index) => {
    const LiCreate = document.createElement("li");
    const resultTitle = document.createElement("a");
    const resultDescription = document.createElement("p");

    resultTitle.href = fav.url;
    resultTitle.textContent = fav.title;
    resultTitle.target = "_blank";
    resultDescription.textContent = fav.description;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.addEventListener("click", () => {
      favorites.splice(index, 1);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      displayFavorites();
    });

    LiCreate.appendChild(resultTitle);
    LiCreate.appendChild(resultDescription);
    LiCreate.appendChild(deleteBtn);
    Container.appendChild(LiCreate);
  });
}

function AddFavorite() {
  const newFav = {
    title: TitleInput.value,
    url: URLInput.value,
    description: DescriptionInput.value,
  };

  favorites.push(newFav);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayFavorites();
  FormAddFavorite.reset();
}

FormAddFavorite.addEventListener("submit", (e) => {
  e.preventDefault();
  AddFavorite();
});

displayFavorites();