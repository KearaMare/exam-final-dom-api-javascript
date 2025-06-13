const TitleInput = document.querySelector("#titre");
const URLInput = document.querySelector("#url");
const DescriptionInput = document.querySelector("#description");
const FormAddFavorite = document.querySelector("#favori-form");
const Container = document.querySelector(".favoris-container");

async function AddFavorite() {
	const Info = await fetch("http://10.69.0.17:8100/bookmarks", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer 2db786ae57233606a3d72a3b29cea1a2",
		},
		body: JSON.stringify({
			title: TitleInput.value,
			url: URLInput.value,
			description: DescriptionInput.value,
		}),
	});
	const data = await Info.json();
	const ID = data.id;

	const Infos = await fetch("http://10.69.0.17:8100/bookmarks/" + ID, {
		method: "GET",
		headers: {
			Authorization: "Bearer 2db786ae57233606a3d72a3b29cea1a2",
		},
	});
	const dataD = await Infos.json();

	const resultTitle = document.createElement("a");
	const resultDescription = document.createElement("p");
	const LiCreate = document.createElement("li");
	Container.appendChild(LiCreate);
	LiCreate.appendChild(resultTitle);
	LiCreate.appendChild(resultDescription);
	resultTitle.href = data.url;
	resultTitle.textContent = data.title;
	resultDescription.textContent = data.description;
}

FormAddFavorite.addEventListener("submit", (e) => {
	e.preventDefault();
	AddFavorite();
});
