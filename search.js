window.addEventListener("DOMContentLoaded", () => {
	const urlParams = new URLSearchParams(window.location.search);
	searchQuery = urlParams.get('q')
	searchContent(searchQuery)
})


async function searchContent(query) {
	await fetch(" https://api.themoviedb.org/3/search/movie?api_key=" + env.api_key + "&language=" + env.lang + "&query=" + query + "&page=1&include_adult=false", {
		method: "GET"

	}).then((response) => {
		return response.json();

	}).then((data)=> {
		data.results.map((obj) => {
			if(obj.poster_path != null) {
			
				document.getElementById("content").innerHTML += 
				`
				<div class="card" onclick="window.location.href = 'movie.html?id=` + obj.id +`'">
					<img src="https://image.tmdb.org/t/p/w500` + obj.poster_path + `" alt="` + obj.title + `">
				</div>
				`
			} else { console.log("shit your pants") }
		})
	})
}