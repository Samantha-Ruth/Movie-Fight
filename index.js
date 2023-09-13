// Fetching movie data
// Network request using AXIOS
const fetchData = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "",
      s: searchTerm,
      // i: 'tt0848228'
    },
  });
  console.log(response.data);
};

// API key: http://www.omdbapi.com/?i=tt3896198&apikey=487df51d
// URL: http://www.omdbapi.com/?apikey=[yourkey]&
// parameters: s (interpreted as movie title we are searching for)

// fetching single movie

// Autocomplete Widget design

const input = document.querySelector("input");

//wrapper function that restricts calls to onInput, but returns a function as well
// creating a re-usable debounce helper function
const debounce = (func, delay = 500) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const onInput = debounce((event) => {
  fetchData(event.target.value);
});
input.addEventListener("input", onInput);
