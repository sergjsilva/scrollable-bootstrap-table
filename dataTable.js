const stopsUrl =
  "https://sergjsilva.github.io/mino-timetable/JSON/stops-ferrol-to-coruna.JSON";

const routeUrl =
  "https://sergjsilva.github.io/mino-timetable/JSON/bus-laborDay-ferrol-to-coruna.JSON";

async function LoadData() {
  const cities = await fetch(stopsUrl).then((data) => data.json());
  const routes = await fetch(routeUrl).then((data) => data.json());

  // Get the elements
  const tHeader = document.querySelector("#thead-content tr");
  const tBody = document.querySelector("#tbody-content");

  if (!tHeader || !tBody) {
    console.error("Table header or body element not found");
    return;
  } else {
    console.log("tHeader and tBody were found!");
  }

  let tHeaderContent = `<th>City</th>`;
  routes.forEach((data) => {
    tHeaderContent += `<th>${data.route}</th>`;
  });

  document.querySelector("#table thead tr").innerHTML = tHeaderContent;

  let tBodyContent = "";
  cities.forEach((city, index) => {
    if (city == "Miño") {
      tBodyContent += `<tr class="table-info"><td>${city}</td>`;
    } else {
      tBodyContent += `<tr><td>${city}</td>`;
    }
    routes.forEach((route) => {
      tBodyContent += `<td>${route.stops[index]}</td>`;
    });
    tBodyContent += `</tr>`;
  });

  tBody.innerHTML = tBodyContent;
}

// On Load
document.addEventListener("DOMContentLoaded", () => {
  LoadData();
});
