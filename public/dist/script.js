window.addEventListener("load", function () {
  document
    .querySelector("#showMenu")
    .addEventListener("click", function (event) {
      document.querySelector("#mobileNav").classList.remove("hidden");
    });

  document
    .querySelector("#hideMenu")
    .addEventListener("click", function (event) {
      document.querySelector("#mobileNav").classList.add("hidden");
    });

  document.querySelectorAll("[toggleElement]").forEach((toggle) => {
    toggle.addEventListener("click", function (event) {
      console.log(toggle);
      const answerElement = toggle.querySelector("[answer]");
      const caretElement = toggle.querySelector("img");
      console.log(answerElement);
      if (answerElement.classList.contains("hidden")) {
        answerElement.classList.remove("hidden");
        caretElement.classList.add("rotate-90");
      } else {
        answerElement.classList.add("hidden");
        caretElement.classList.remove("rotate-90");
      }
    });
  });
  
  const newMoviesSection = document.getElementById("new-movies");
  const newMovies = loadNewMovies();
  
  if (newMoviesSection) {
    newMovies.then((newMovies) => {
      if (!newMovies) return;
      
      newMovies.forEach((movie, index) => {
        if (index >= 3) return;
        
        const strCategories = movie.category.map((cat) => `<span class="bg-black text-white px-2 py-1 rounded-md mr-2">${cat.name}</span>`).join(" - ");
        
        const movieElement = `
          <div class="flex-1 mx-8 flex flex-col items-center my-4">
            <div class="border-2 rounded-full bg-secondary text-black h-12 w-12 flex justify-center items-center mb-3">
              ${index + 1}
            </div>
            <h3 class="font-montserrat font-medium text-xl h-14 mb-2">${movie.name}</h3>
            <p class="text-center font-montserrat">
              ${strCategories}
            </p>
          </div>
        `;
        
        newMoviesSection.innerHTML += movieElement;
      });
    });
  }  
});

const baseAPI = "https://ophim1.com/v1/api/";
const options = {method: 'GET', headers: {accept: 'application/json'}};
const imgAPI = "https://img.ophim.live/uploads/movies/";

async function loadAPI(path) {
  if (!path.trim()) return null;

  try {
    const res = await fetch(`${baseAPI}/${path}`, options);
    const json = await res.json();

    return json.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function loadNewMovies() {
  try {
    const response = await loadAPI("danh-sach/phim-moi");
    
    return response.items;
  } catch (err) {
    console.error(err);
    return null;
  }
}