// Tables
const table1 = document.getElementById("statisticsEventTable1");
const table2 = document.getElementById("statisticsEventTable2");
const table3 = document.getElementById("statisticsEventTable3");

// Calculate statistics
let c0 = { index: 0, value: 0 };
let c1 = { index: 0, value: 0 };
let c2 = { index: 0, value: 0 };
let c3 = [
  { name: "Books", revenues: 0, capabilities: 0, estimates: 0 },
  { name: "Concert", revenues: 0, capabilities: 0, estimates: 0 },
  { name: "Food", revenues: 0, capabilities: 0, estimates: 0 },
  { name: "Museum", revenues: 0, capabilities: 0, estimates: 0 },
  { name: "Party", revenues: 0, capabilities: 0, estimates: 0 },
  { name: "Race", revenues: 0, capabilities: 0, estimates: 0 },
];
let c4 = [
  { name: "Books", revenues: 0, capabilities: 0, assists: 0 },
  { name: "Cinema", revenues: 0, capabilities: 0, assists: 0 },
  { name: "Concert", revenues: 0, capabilities: 0, assists: 0 },
  { name: "Food", revenues: 0, capabilities: 0, assists: 0 },
  { name: "Museum", revenues: 0, capabilities: 0, assists: 0 },
  { name: "Party", revenues: 0, capabilities: 0, assists: 0 },
  { name: "Race", revenues: 0, capabilities: 0, assists: 0 },
];
let c;

function calculateStatistics() {
  data.events.forEach((element, index) => {
    // Table 1 ➜ Calculations
    if (element.assistance) {
      // Attendance percentage calculation
      c = (element.assistance * 100.0) / element.capacity;

      // Higher percentage of attendance
      if (c > c0.value || index == 0) {
        c0.index = index;
        c0.value = c;
      }

      // Lowest attendance percentage
      if (c < c1.value || index == 0) {
        c1.index = index;
        c1.value = c;
      }

      // Largest capacity event
      if (element.capacity > c2.value || index == 0) {
        c2.index = index;
        c2.value = element.capacity;
      }
    }

    // Table 2 ➜ Calculations
    // Date (upcoming)
    if (new Date(element.date) > dataCurrentDate) {
      c3.forEach((category) => {
        if (category.name === element.category) {
          // Revenues
          category.revenues += element.price * element.estimate;

          // Percentage
          category.capabilities += element.capacity;
          category.estimates += element.estimate;          
        }
      });
    }

    // Table 3 ➜ Calculations
    // Date (past)
    if (new Date(element.date) < dataCurrentDate) {
      c4.forEach((category) => {
        // Category
        if (category.name === element.category) {
          // Revenues
          category.revenues += element.price * element.assistance;

          // Percentage
          category.capabilities += element.capacity;
          category.assists += element.assistance;
        }
      });
    }
  });

  // Tables ➜ Render
  table1Render();
  table2Render();
  table3Render();
}

// Table 1 ➜ Render
function table1Render() {
  /* let td0 = document.createElement("td");
  td0.innerText = `${data.events[c0ID].name} (${c0.toFixed(2)}%)`;
  
  let td1 = document.createElement("td");
  td1.innerText = `${data.events[c1ID].name} (${c1.toFixed(2)}%)`;
  
  let td2 = document.createElement("td");
  td2.innerText = `${data.events[c2ID].name} (${c2})`;
  
  let tr = document.createElement("tr");
  tr.appendChild(td0);
  tr.appendChild(td1);
  tr.appendChild(td2); */

  let tr = document.createElement("tr");
  tr.innerHTML = `<td>${data.events[c0.index].name} (${c0.value.toFixed(2)}%)</td><td>${data.events[c1.index].name} (${c1.value.toFixed(2)}%)</td><td>${data.events[c2.index].name} (${c2.value})</td>`;

  table1.appendChild(tr);
}

// Table 2 ➜ Render
function table2Render() {
  c3.forEach((element) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${element.name}</td><td>$${element.revenues}</td><td>${(element.estimates * 100 / element.capabilities).toFixed(2)}%</td>`;

    table2.appendChild(tr);
  });
}

// Table 3 ➜ Render
function table3Render() {
  c4.forEach((element) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${element.name}</td><td>$${element.revenues}</td><td>${(element.assists * 100 / element.capabilities).toFixed(2)}%</td>`;

    table3.appendChild(tr);
  });
}

// Data
let data;
let dataCurrentDate;

//fetch("https://mindhub-xj03.onrender.com/api/amazing")
fetch("./assets/json/amazing.json")
  .then((response) => {
    // Response
    if (response.status === 200) {
      // JSON
      return response.json();
    } else {
      // Error
      throw new Error("Something went wrong on API server!");
    }
  })
  .then((json) => {
    // Data
    data = json;
    dataCurrentDate = new Date(data.currentDate);

    // Calculate statistics
    calculateStatistics();
  })
  .catch((err) => {
    // Tables (update)
    let tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="3">${err.message}</td>`;

    table1.appendChild(tr);
  });
