// Fetch movie data
const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    // use Axios to enter key and parameters
    params: {
      apikey: "487df51d",
      s: searchTerm,
      // i: 'tt0848228'
    },
  });

  if (response.data.Error) {
    return []
  }

  return (response.data.Search);
};

const root = document.querySelector(".autocomplete");
root.innerHTML = `
    <label><b>Search for a Movie</b><label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
          <div class="dropdown-content results"> </div>
          </div>
        </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');


const onInput = async event => {
    const movies = await fetchData(event.target.value);
    // removes dropdown if no movies are entered
    if (!movies.length) {
        dropdown.classList.remove('is-active');
        return;
    }

    // clear input
    resultsWrapper.innerHTML = '';

    // create dropdown to display all movies and images
    dropdown.classList.add('is-active');
    // iterate over all movies and display poster and titles
    for(let movie of movies) {
        const option = document.createElement('a');
        // if image doesn't exist, don't show it
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        // create a dropdown item
        option.classList.add('dropdown-item');
        // display movie posters an dtitles
        option.innerHTML = `
            <img src="${imgSrc}" />
            ${movie.Title}
            `;
            // If user clicks on movie, put movie name into input
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = movie.Title;
                onMovieSelect(movie);
            });

            resultsWrapper.appendChild(option);
    };
};




input.addEventListener("input", debounce(onInput, 500));

// closes dropdown when user clicks outside of dropdown
document.addEventListener('click', event => {
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active');
    }
});

const onMovieSelect = async movie => {
    const response = await axios.get("http://www.omdbapi.com/", {
        // use Axios to enter key and parameters
        params: {
          apikey: "487df51d",
          i: movie.imdbID
        },
      });
      document.querySelector("#summary").innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
    return `
    <article class="media"> 
        <figure class="media-left">
            <p class="image">
                <img src="${movieDetail.Poster}" />
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
        </div>
    </article>
    <article class="notification is=primary>
        <p class="title">${movieDetail.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
        <article class="notification is=primary>
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="subtitle">BoxOffice</p>
    </article>
        <article class="notification is=primary>
        <p class="title">${movieDetail.Metascore}</p>
    <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is=primary>
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="subtitle">IMBD Rating</p>
    </article>
    <article class="notification is=primary>
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="subtitle">IMBD Votes</p>
    </article>
    `
};


// PROBLEM WITH THIS CODE!  NOT REUSABLE AND TOO MANY OVERLAPPING VARIABLES.