let restaurantData = [];
let currentRestaurant = {};
let page = 1;
const perPage = 10;
const map = null;

function avg(grades) {
  const score = grades.map((grade) => grade.score);
  const avg = score.reduce((a, b) => a + b, 0) / grades.length;
  console.log(avg);
  return avg;
}
const tableRows = _.template(
  `<tr data-id=<%= _id %>>
<td><%= name %></td>
<td><%= cuisine %></td>
<td><%= address.building %> <%= address.street %></td>
<td><%- avg(grades) %></td>
</tr>`
);

function loadRestaurantData() {
  fetch(
    `https://yurisweb422.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json.info);
      restaurantData = json.info;
      const templated = tableRows(restaurantData[0]);
      console.log(templated);
    })
    .catch((err) => console.log(err));
}

loadRestaurantData();
