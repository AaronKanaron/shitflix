window.addEventListener("DOMContentLoaded", () => {
	const urlParams = new URLSearchParams(window.location.search);
	searchQuery = urlParams.get('q')
	searchContent(searchQuery)
})


async function searchContent(query) {
	Promise.all([
		fetch("https://api.themoviedb.org/3/search/movie?api_key=" + env.api_key + "&language=" + env.lang + "&query=" + query + "&page=1&include_adult=" + env.adult),
		fetch("https://api.themoviedb.org/3/search/tv?api_key=" + env.api_key + "&language=" + env.lang + "&query=" + query + "&page=1&include_adult=" + env.adult)
	
	]).then((responses) => {

		return Promise.all(responses.map((response) => {
			return response.json();
		}));

	}).then((data) => {
		document.getElementById("title").innerHTML = "Showing results for: " + query
		
		let result = []

		data[1].results.map((obj) => {
			result.push({popularity : obj.popularity, id : obj.id, poster_path: obj.poster_path, type: "series"})
		})
		data[0].results.map((obj) => {
			result.push({popularity : obj.popularity, id : obj.id, poster_path: obj.poster_path, type: "movie"})
		})
		console.log(result)
		//SORT
		result.sort((a, b) => {
			return b.popularity - a.popularity;
		});
		console.log(result)
		result.map((obj) => {
			if(obj.poster_path != null) {
				if(obj.type = "movie") {
					document.getElementById("content").innerHTML += 
					`
					<div class="card" onclick="window.location.href = 'movie.html?id=` + obj.id +`'">
						<img src="https://image.tmdb.org/t/p/w500` + obj.poster_path + `" alt="` + obj.title + `">
					</div>
					`
				} else {
					document.getElementById("content").innerHTML += 
					`
					<div class="card" onclick="window.location.href = 'show.html?id=` + obj.id +`'">
						<img src="https://image.tmdb.org/t/p/w500` + obj.poster_path + `" alt="` + obj.title + `">
					</div>
					`
				}
			} else { console.log("This movie / Series does not have a poster") }
		})
		// data[1].results.map((obj) => {
		// 	if(obj.poster_path != null) {
			
		// 		document.getElementById("content").innerHTML += 
		// 		`
		// 		<div class="card" onclick="window.location.href = 'show.html?id=` + obj.id +`'">
		// 			<img src="https://image.tmdb.org/t/p/w500` + obj.poster_path + `" alt="` + obj.title + `">
		// 		</div>
		// 		`
		// 	} else { console.log("shit your pants") }
		// })

		

		console.log(result);
	})
}


