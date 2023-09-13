// Fetching movie data
// Network request using AXIOS
const fetchData = async () => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: 'APIKEY',
            s: 'avengers'
        }
    });
    console.log(response.data);
};

fetchData();

// API key: http://www.omdbapi.com/?i=tt3896198&apikey=487df51d
// URL: http://www.omdbapi.com/?apikey=[yourkey]&
// parameters: s (interpreted as movie title we are searching for)

// fetching single movie

// Autocomplete Widget design
