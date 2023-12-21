import { filtersText } from "./data.js";
import { menu } from "./data.js";
const filtersList = document.querySelector(".filters");
const foodItemsContainer = document.querySelector(".food-items");
const clearOutUl = () => {
  foodItemsContainer.innerHTML = "";
};
/**
 * Gets the unique category names from the menu items so we can create the
 * category buttons
 * @returns array of unique categories strings
 */
const getCategories = () => {
  const categoryText = new Set(menu.map((item) => item.category));
  const uniqueCategoryText = [...categoryText,"All"]     
  return uniqueCategoryText;
};
/**
 * adds menu items to the ul menu items container.
 * @param {[]} arrayItem
 */
const displayMenuItems = (arrayItem) => {
  const fragment = new DocumentFragment();
  //loop through array and add li items to the fragment
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
  //append fragment to the ul
  foodItemsContainer.appendChild(fragment);
};
/**
 * When user clicks on the button they can filter through the menu items by their categories.
 * @param {String} type
 * @returns {Array}
 */
const filterMeals = (target) => {
  let filterResults = menu.filter((item) => {
    return item.category === target.dataset.category;
  });
  if (target.dataset.category === "All") {
    filterResults = menu;
  }
  //clear out the ul
  clearOutUl();
  displayMenuItems(filterResults);
  return filterResults;
};
/**
 * Display filter buttons and add click event listener
 */
const addFilterbuttons = () => {
  const fragment = new DocumentFragment();
  const categories = getCategories();
  categories.forEach((filterWord) => {
    const filterLi = document.createElement("li");
    filterLi.dataset.category = filterWord;
    filterLi.textContent = filterWord;
    filterLi.classList.add("filterButton");
    filterLi.addEventListener("click", (e) => {
      filterMeals(e.target);
    });
    fragment.appendChild(filterLi);
  });
  filtersList.appendChild(fragment);
};
// When page loads:
window.addEventListener("DOMContentLoaded", addFilterbuttons);
window.addEventListener("DOMContentLoaded", () => {
  return displayMenuItems(menu);
});
