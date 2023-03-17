// URL ➜ Parameters
const urlParameters = new URLSearchParams(location.search);
const id = Number(urlParameters.get("id"));

// Cards
const cardsContainer = document.getElementById("cardsContainer");

function cardRender(id) {
  // Filter
  const element = data.events.filter((element) => element._id == id)[0];

  // Cards ➜ Container (update)
  cardsContainer.innerHTML = `
        <div class="col">
            <div class="card card-shadow h-100">
                <img src="${element.image}" height="200px" class="card-img-top object-fit-cover" alt="event" />
                <div class="card-body">
                    <h3 class="card-title fw-bold">${element.name}</h3>
                    <h5 class="card-title">${element.category}</h5>
                    <h6 class="text-muted">${element.date}</h6>
                    <p class="card-text">${element.description}</p>
                    <p class="card-text">Assistance: ${element.assistance}</p>
                    <p class="card-text">Capacity: ${element.capacity}</p>
                    <p class="card-text">Place: ${element.place}</p>
                </div>
                <div class="card-footer d-flex flex-row justify-content-between align-items-center">
                    <h5 class="card-title">Price $${element.price}</h5>
                </div>
            </div>
        </div>
        `;
}

cardRender(id);
