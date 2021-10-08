
window.addEventListener("DOMContentLoaded", () => {
	const urlParams = new URLSearchParams(window.location.search);
	tv = urlParams.get('id')
	loadMovie(tv);
})


async function loadMovie(tv_id) {
	Promise.all([
			fetch("https://api.themoviedb.org/3/tv/" + tv_id + "?api_key=" + env.api_key + "&language=" + env.lang), 
			fetch("https://api.themoviedb.org/3/tv/" + tv_id + "/watch/providers?api_key=" + env.api_key)
		]).then((responses) => {
			return Promise.all(responses.map((response) => {
				return response.json();
			}));

		}).then((data) => {
			const background = document.getElementById("background")
			/*

			Det kan vara både Buy - Rent och Flatrate, se till att alla kan bli valda och bygg en meny med dess index.

			*/

			flatrate = ""
			rent = ""
			buy = ""
			// data[1].results.US.hasOwnProperty("flatrate") ? data[1].results.US.flatrate.map((obj, index) => { Object.keys(data[1].results.US.flatrate).length-1 > index ? flatrate += obj.provider_name + ", " : flatrate += obj.provider_name }) : flatrate = "You cannot stream this movie"

			// data[1].results.US.hasOwnProperty("rent") ? data[1].results.US.rent.map((obj, index) => { Object.keys(data[1].results.US.rent).length-1 > index ? rent += obj.provider_name + ", " : rent += obj.provider_name }) : rent = "You cannot rent this movie"

			// data[1].results.US.hasOwnProperty("buy") ? data[1].results.US.buy.map((obj, index) => { Object.keys(data[1].results.US.buy).length-1 > index ? buy += obj.provider_name + ", " : buy += obj.provider_name }) : buy = "You cannot buy this movie"

			data[1].hasOwnProperty("results") ? data[1].results.hasOwnProperty("US") ? data[1].results.US.hasOwnProperty("flatrate") ? data[1].results.US.flatrate.map((obj) => { flatrate += "<img src='https://image.tmdb.org/t/p/original" + obj.logo_path + "'>" }) : flatrate = "<p>You cannot stream this movie</p>" : flatrate = "<p>This movie has not come out</p>" : "<p>This movie has not come out</p>"

			data[1].results.hasOwnProperty("US") ? data[1].results.US.hasOwnProperty("rent") ? data[1].results.US.rent.map((obj) => { rent += "<img src='https://image.tmdb.org/t/p/original" + obj.logo_path + "'>" }) : rent = "<p>You cannot rent this movie</p>" : rent = "<p>This movie has not come out</p>"

			data[1].results.hasOwnProperty("US") ? data[1].results.US.hasOwnProperty("buy") ? data[1].results.US.buy.map((obj) => { buy += "<img src='https://image.tmdb.org/t/p/original" + obj.logo_path + "'>" }) : buy = "<p>You cannot buy this movie</p>" : buy = "<p>This movie has not come out</p>"

			background.style.backgroundImage = "url(https://image.tmdb.org/t/p/original" + data[0].backdrop_path +")"
			
			//Get Genres
			// let genres = "";
			// data.genres.map((obj) => { genres += obj.name + ", "; return genres })
			// let companies = "";
			// data.production_companies.map((obj) => { companies += obj.name + ", "; return companies })

			//Append content
			background.innerHTML += 
			`
				<div class="wrapper">
					<h1> ${data[0].name} </h1>

					<p> ${data[0].overview} </p>
				</div>

				<div class="background_title">
						<span> ${data[0].name} </span>
				</div>
			`
			document.getElementById("content").innerHTML += data[1].results.hasOwnProperty("US") ? data[1].results.US.hasOwnProperty("flatrate") ? flatrate : data[1].results.US.hasOwnProperty("rent") ? rent : data[1].results.US.hasOwnProperty("buy") ? buy : "<p>This movie is not available.</p>" : "<p>This movie is not available.</p>"
		})
}