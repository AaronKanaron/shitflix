let page = 1


async function loadPopular(currentPage){
	Promise.all([


		await fetch("https://api.themoviedb.org/3/movie/popular?api_key="+ env.api_key + "&language=" + env.lang +"&page=" + currentPage),
		await fetch("https://api.themoviedb.org/3/discover/movie?api_key=" + env.api_key +"&language=" + env.lang + "&sort_by=popularity.desc&include_adult=false&page=1&with_genres=" + env.genres[0]),
		await fetch("https://api.themoviedb.org/3/discover/movie?api_key=" + env.api_key +"&language=" + env.lang + "&sort_by=popularity.desc&include_adult=false&page=1&with_genres=" + env.genres[1]),
		await fetch("https://api.themoviedb.org/3/discover/movie?api_key=" + env.api_key +"&language=" + env.lang + "&sort_by=popularity.desc&include_adult=false&page=1&with_genres=" + env.genres[2])

	
	
		]).then((responses) => {
			return Promise.all(responses.map((response) => {
				return response.json();
			}));

		}).then((data)=> {
			//POPULAR MOVIES

			let idArray = [
				"popular",
				"horror",
				"action",
				"mystery"
			]

			for (let i = 0; i < idArray.length; i++) {
				data[i].results.map((obj) => {
					document.getElementById(idArray[i]).innerHTML += 
					`
					<li class="card__item" onclick="window.location.href = 'content/movie.html?id=` + obj.id +`'">
						<img class="card__item__image" src="https://image.tmdb.org/t/p/w500` + obj.poster_path + `" alt="` + obj.title + `">
						<!--
						<div class="overlay"></div>
						<div class="wrapper">
							<h1>` + obj.title + `</h1>
							<p> ${obj.overview} </p>
						</div>
						-->
					</li>
					`;
				})
			}
		})
}

// function nextPage() {
// 	page += 1
// 	loadPopular(page)
// }

loadPopular()

//Scroll with arrow
let arrows = document.getElementsByTagName("card__arrows")

for (let i = 0; i < arrows.length; i++) {
	arrows[i].onclick = () => {
		console.log("pressed button")
	}
} 
