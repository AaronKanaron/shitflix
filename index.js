let page = 1



async function loadPopular(currentPage){
	await fetch("https://api.themoviedb.org/3/movie/popular?api_key="+ env.api_key + "&language=en-US&page=" + currentPage, { 
		method: "GET"
			
		}).then((response) => {
			return response.json();

		}).then((data)=> {
			data.results.map((obj) => {
				document.getElementById("popular-scrolling-wrapper").innerHTML += 
				`
				<div class="card" onclick="window.location.href = 'movie.html?id=` + obj.id +`'">
					<img src="https://image.tmdb.org/t/p/w500` + obj.poster_path + `" alt="` + obj.title + `">
					<!--
					<div class="overlay"></div>
					<div class="wrapper">
						<h1>` + obj.title + `</h1>
						<p>` + obj.overview +`</p>
					</div>
					-->
				</div>
				`;
					
			})
		})
}

function nextPage() {
	page += 1
	loadPopular(page)
}

loadPopular()