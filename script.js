import { filtersText } from "./data.js";
import { menu } from "./data.js";
const filtersList = document.querySelector(".filters");
const foodItemsContainer = document.querySelector(".food-items");

const displayMenuItems = (arrayItem) => {
  foodItemsContainer.innerHTML = "";
  const fragment = new DocumentFragment();
  arrayItem.forEach((foodItem) => {
    const menuItem = document.createElement("li");
    menuItem.innerHTML = `
    <div class="menuItem">
    <div class="images">
    <img src="${foodItem.img}"  alt="${foodItem.title}" class="image"/>
    </div>
    <div class="details">
    <p class="title">${foodItem.title}</p>
    <p class="price">${foodItem.price}</p>
    <p class="desc">${foodItem.desc}</p>
    </div>
    </div>`;

    fragment.appendChild(menuItem);
  });
  foodItemsContainer.appendChild(fragment);
};
const filterMeals = (type) => {
  let filterResults = menu.filter((item) => {
    return item.category === type;
  });
  if (type === "All") {
    filterResults = menu;
  }
  displayMenuItems(filterResults);
  return filterResults;
};

window.addEventListener("DOMContentLoaded", () => {
  const fragment = new DocumentFragment();
  filtersText.forEach((filterWord) => {
    const filterLi = document.createElement("li");
    filterLi.textContent = filterWord;
    filterLi.classList.add("filterButton");
    filterLi.addEventListener("click", () => {
      filterMeals(filterWord);
    });
    fragment.appendChild(filterLi);
  });
  filtersList.appendChild(fragment);
});
window.addEventListener("DOMContentLoaded", () => {
  return displayMenuItems(menu);
});
