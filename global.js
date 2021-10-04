/*VARIABLES*/

/*ENVIROMENT KEYS*/
let env = {
	"api_key" : "3555d01f29466ed45ea26ca820ff7474",
	"lang" : "en-US",
	"adult" : "false"
}

/*ELEMENTS*/
const searchElement = document.getElementById("search")


searchElement.addEventListener("keyup", (input) => {
	if(input.key !== "Enter") return;
	window.location.href = "search.html?q=" + searchElement.value;
	searchElement.value = ""
	input.preventDefault();
})