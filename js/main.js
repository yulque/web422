/*********************************************************************************
 *  WEB422 – Assignment 2
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Yu Ri Yoon_ Student ID: 135023190_ Date: 30 Jan 2021_
 *
 *
 ********************************************************************************/

let restaurantData = [];
let currentRestaurant = {};
let page = 1;
const perPage = 10;
let map = null;

function avg(grades) {
  const score = grades.map((grade) => grade.score);
  const avg = score.reduce((a, b) => a + b, 0) / grades.length;
  return avg.toFixed(2);
}

// <% to execute javascript ->
// <%= to create a compiled template -> simply get the value from object
// <%- to escape data property values -> unlock everything and show the return
const tableRows = _.template(
  `<% _.forEach(obj, function(elem){ %>
<tr data-id=<%= elem._id %>>
<td><%= elem.name %></td>
<td><%= elem.cuisine %></td>
<td><%= elem.address.building %> <%= elem.address.street %></td>
<td><%- avg(elem.grades) %></td>
</tr>
<% }) %>`
);

function loadRestaurantData() {
  fetch(
    `https://yurisweb422.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`
  )
    .then((response) => response.json())
    .then((json) => {
      // set the global array to be the data
      restaurantData = json.info;
      const templated = tableRows(restaurantData);
      $("tbody").html(templated);
      $("#current-page").html(page);
    })
    .catch((err) => console.log(err));
}

$(function () {
  loadRestaurantData();

  // modal
  $(document).on("click", "#restaurant-table tbody tr", function () {
    currentRestaurant = restaurantData.find(
      (restaurant) => restaurant._id == $(this).attr("data-id")
    );
    $(".modal-title").html(currentRestaurant.name);
    $("#restaurant-address").html(
      `${currentRestaurant.address.building} ${currentRestaurant.address.street}`
    );
    $("#restaurant-modal").modal({ keyboard: true });
  });

  // previous page
  $("#previous-page").on("click", function () {
    if (page > 1) {
      page = page - 1;
      loadRestaurantData();
    }
  });

  // next page
  $("#next-page").on("click", function () {
    page = page + 1;
    loadRestaurantData();
  });

  // shown bs modal
  $("#restaurant-modal").on("shown.bs.modal", function () {
    map = new L.Map("leaflet", {
      center: [
        currentRestaurant.address.coord[1],
        currentRestaurant.address.coord[0],
      ],
      zoom: 18,
      layers: [
        new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
      ],
    });

    L.marker([
      currentRestaurant.address.coord[1],
      currentRestaurant.address.coord[0],
    ]).addTo(map);
  });

  // remove bs modal
  $("#restaurant-modal").on("hidden.bs.modal", function () {
    map.remove();
  });
});
