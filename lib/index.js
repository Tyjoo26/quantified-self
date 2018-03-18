// const Food = require("./foods").Food
const FoodService = require("./food-service")

const foodService = new FoodService

foodService.getFoods()

$(".food-form").on('submit', (e) => {
  e.preventDefault();
  foodService.validateFood()
})

$(".foods-table").on('click', (e) => {
  e.preventDefault();
  if (e.target.id === "delete") {
    foodService.destroyFood(e)
  }
})

$(".foods-table").on("focusout", (e) => {
  foodService.validateFoodPatch(e);
})

$('input[name="filter"]').on('keyup', () => {
  foodService.filterFoods()
})
