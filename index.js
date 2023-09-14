// Fetch movie data
const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    // use Axios to enter key and parameters
    params: {
      apikey: "",
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
