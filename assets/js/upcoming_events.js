let cards = document.getElementById("cards");

let currentDate = new Date(data.currentDate);

let html = "";

for (data of data.events) {
  if (new Date(data.date) > currentDate) {
    html += `
        <div class="col">
            <div class="card card-shadow h-100">
                <img src="${data.image}" height="200px" class="card-img-top object-fit-cover" alt="event" />
                <div class="card-body">
                    <h5 class="card-title fw-bold">${data.name}</h5>
                    <h6>${data.date}</h6>
                    <p class="card-text">${data.description}</p>
                </div>
                <div class="card-footer d-flex flex-row justify-content-between align-items-center">
                    <h6 class="text-muted">Price $${data.price}</h6>
                    <a href="./details.html?id=${data._id}" class="btn btn-primary">Details</a>
                </div>
            </div>
        </div>
    `;
  }
}

cards.innerHTML = html;