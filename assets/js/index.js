// Categories
const categoriesContainer = document.getElementById("categoriesContainer");
const categoriesArray = Array.from(document.querySelectorAll('#categoriesContainer>input[type="checkbox"]'));
let categoriesFilter = [];

// Categories ➜ Container ➜ Event (change)
categoriesContainer.addEventListener("change", (event) => {
  // Categories ➜ Filter
  categoriesFilter = categoriesArray.filter((category) => category.checked);

  // Search ➜ Input (clear)
  searchInput.value = "";

  // Cards ➜ Render
  cardsRender();
});

// Search
const searchContainer = document.getElementById("searchContainer");
const searchInput = document.getElementById("searchInput");

// Search ➜ Container ➜ Event (submit)
searchContainer.addEventListener("submit", (event) => {
  // Cancel ➜ Event (submit)
  event.preventDefault();
});

// Search ➜ Input ➜ Event (keyup)
searchInput.addEventListener("keyup", (event) => {
  // Keyup ➜ Enter (cancel)
  if (event.key === "Enter") return;

  // Cards ➜ Render
  cardsRender();
});

// Cards
const cardsContainer = document.getElementById("cardsContainer");

function cardsRender() {
  let search = searchInput.value.trim().toLowerCase();
  let html = "";

  // Data
  data.events.forEach((element) => {
    if (categoriesFilter.length == 0) {
      if (element.name.toLowerCase().includes(search) || element.category.toLowerCase().includes(search) || element.description.toLowerCase().includes(search))
        // HTML (update)
        htmlUpdate(element);
    } else {
      if (categoriesFilter.some((category) => category.name == element.category) && (element.name.toLowerCase().includes(search) || element.category.toLowerCase().includes(search) || element.description.toLowerCase().includes(search)))
        // HTML (update)
        htmlUpdate(element);
    }
  });

  function htmlUpdate(element) {
    // HTML (update)
    html += `
            <div class="col">
                <div class="card card-shadow h-100">
                    <img src="${element.image}" height="200px" class="card-img-top object-fit-cover" alt="event" />
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${element.name}</h5>
                        <h6 class="card-title">${element.category}</h6>
                        <h6 class="text-muted">${element.date}</h6>
                        <p class="card-text">${element.description}</p>
                    </div>
                    <div class="card-footer d-flex flex-row justify-content-between align-items-center">
                        <h6 class="text-muted">Price $${element.price}</h6>
                        <a href="./details.html?id=${element._id}" class="btn btn-primary">Details</a>
                    </div>
                </div>
            </div>
            `;
  }

  // HTML (empty)
  if (html === "")
    // HTML (update)
    html = `<p class="pt-4 w-100 text-center text-muted display-6">"No event found..."</h6>`;

  // Cards ➜ Container (update)
  cardsContainer.innerHTML = html;
}

// Data
let data;
let dataCurrentDate;

//fetch("https://mindhub-xj03.onrender.com/api/amazing")
fetch("./assets/json/amazing.json")
  .then((response) => {
    // Response
    if (!response.ok) throw new Error("Network response was not OK");

    // JSON
    return response.json();
  })
  .then((json) => {
    // Data
    data = json;
    dataCurrentDate = new Date(data.currentDate);

    // Cards ➜ Render (initialize)
    cardsRender();
  })
  .catch((err) => {
    // Cards ➜ Container (update)
    cardsContainer.innerHTML = `<p class="pt-4 w-100 text-center text-muted display-6">‟${err}”...</h6>`;
  });
