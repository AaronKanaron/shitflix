let page = 1



async function loadPopular(currentPage){
	Promise.all([
		await fetch("https://api.themoviedb.org/3/movie/popular?api_key="+ env.api_key + "&language=" + env.lang +"&page=" + currentPage),
		await fetch(" https://api.themoviedb.org/3/tv/popular?api_key=" + env.api_key +"&language=" + env.lang + "&page=" + currentPage) 

		]).then((responses) => {
			return Promise.all(responses.map((response) => {
				return response.json();
			}));

		}).then((data)=> {
			//POPULAR MOVIES
			data[0].results.map((obj) => {
				document.getElementById("popular-movies").innerHTML += 
				`
				<li class="card__item" onclick="window.location.href = 'movie.html?id=` + obj.id +`'">
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

			data[1].results.map((obj) => {
				document.getElementById("popular-series").innerHTML += 
				`
				<li class="card__item" onclick="window.location.href = 'show.html?id=` + obj.id +`'">
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
		
		})
}

// function nextPage() {
// 	page += 1
// 	loadPopular(page)
// }

loadPopular()

//Scroll with arrow
let instance = document.querySelector(".card__wrapper")
console.log(instance)
Array.prototype.forEach.call(instance, (key, value) => {
	console.log("Pressed arrow")
	let arrows = document.querySelector(instance[key]).querySelector(".arrow"),
		prevArrow = arrows.filter(".arrow-prev"),
		nextArrow = arrows.filter(".arrow-next"),
		box = document.querySelector(instance[key]).querySelector(".hs"),
		x = 0,
		mx = 0,
		maxScrollWidth = box[0].scrollWidth - (box[0].clientWidth / 2) - (box.width() / 2);
	
	document.querySelector(arrows).addEventListener("click", () => {
		if(document.querySelector(this).classList.contains("arrow-next")) {
			x = ((box.width() / 2)) + box.scrollLeft() - 10;
			box.animate({
				scrollLeft: x,
			})
		} else{
			x = ((box.width() / 2)) - box.scrollLeft() - 10;
			box.animate({
				scrollLeft: -x,
			})
		}
	})
})