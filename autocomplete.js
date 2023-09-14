// should be reusable between different projects and msut be able to be run several times in the same project
// should have no knowledge of 'movies' or 'recipes' or 'blogs' etc.
// create a function that will take a configuration object and render an autocomplete on the screen


const createAutoComplete = ( { root, renderOption, onOptionSelect, inputValue, fetchData } ) => {
  root.innerHTML = `
      <label><b>Search</b><label>
      <input class="input" />
      <div class="dropdown">
          <div class="dropdown-menu">
            <div class="dropdown-content results"> </div>
            </div>
          </div>
  `;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  const onInput = async (event) => {
    const items = await fetchData(event.target.value);
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    // clear input
    resultsWrapper.innerHTML = "";


    dropdown.classList.add("is-active");
    for (let item of items) {
      const option = document.createElement("a");
      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
      });

      resultsWrapper.appendChild(option);
    }
  };

  input.addEventListener("input", debounce(onInput, 500));

  // closes dropdown when user clicks outside of dropdown
  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
