/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	// const Food = require("./foods").Food
	var FoodService = __webpack_require__(1);
	var MealService = __webpack_require__(4);

	var foodService = new FoodService();
	var mealService = new MealService();

	foodService.getFoods();
	mealService.getMealFoods();

	$('#meal-type').on('click', function (e) {
	  e.preventDefault();
	  var mealId = e.target.dataset.id;
	  var mealName = e.target.value.toLowerCase();
	  mealService.postFoodsToMeal(mealId, mealName);
	});

	$('.meal-container').on('click', function (e) {
	  if (e.target.className.includes("delete")) {
	    e.preventDefault();
	    mealService.deleteFoodFromMeal(e);
	  }
	});

	$(".food-form").on('submit', function (e) {
	  e.preventDefault();
	  foodService.validateFood();
	});

	$(".foods-table").on('click', function (e) {
	  if (e.target.className.includes("delete")) {
	    e.preventDefault();
	    foodService.destroyFood(e);
	  } else if (e.target.innerHTML === "Calories") {
	    e.preventDefault();
	    foodService.sortCalories();
	  }
	});

	$(".foods-table").on("focusout", function (e) {
	  if (!e.target.className.includes("delete")) {
	    foodService.validateFoodPatch(e);
	  }
	});

	$('input[name="filter"]').on('input', function () {
	  foodService.filterFoods();
	});

	$('.title').on('click', function (e) {
	  $(e.target).siblings('.hidden').first().slideToggle();
	});

	$('.title').on('keydown', function (e) {
	  if (e.keyCode === 13) {
	    $(e.target).siblings('.hidden').first().slideToggle();
	  }
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Food = __webpack_require__(2);

	var _require = __webpack_require__(3),
	    _require2 = _slicedToArray(_require, 2),
	    handleResponse = _require2[0],
	    errorLog = _require2[1];

	var FoodService = function () {
	  function FoodService() {
	    _classCallCheck(this, FoodService);

	    this.baseUrl = "https://qs-1710-js.herokuapp.com/api/v1/foods", this.counter = 0, this.foods = [];
	  }

	  _createClass(FoodService, [{
	    key: "storeFoods",
	    value: function storeFoods(foods) {
	      this.foods = [].concat(_toConsumableArray(foods));
	      return this.foods;
	    }
	  }, {
	    key: "getFoods",
	    value: function getFoods() {
	      var _this = this;

	      $('.foods-table').html('<th>Name</th><th>Calories</th>');
	      $('.add-foods-table').html('<th></th><th>Name</th><th>Calories</th>');
	      fetch(this.baseUrl).then(handleResponse).then(function (foods) {
	        return _this.sortFoods(foods, "id");
	      }).then(function (foods) {
	        return _this.storeFoods(foods);
	      }).then(function (foods) {
	        return _this.appendFoods(foods);
	      }).catch(errorLog);
	    }
	  }, {
	    key: "postFood",
	    value: function postFood(foodInfo) {
	      fetch(this.baseUrl, this.postConfig(foodInfo)).then(handleResponse).then(this.newFoodObject).then(function (food) {
	        return food.prependFood($('.foods-table'), 'edit');
	      }).then(this.clearFields).catch(errorLog);
	    }
	  }, {
	    key: "newFoodObject",
	    value: function newFoodObject(newFood) {
	      return new Food(newFood.id, newFood.name, newFood.calories);
	    }
	  }, {
	    key: "clearFields",
	    value: function clearFields() {
	      var $foodForm = $('.food-form');
	      $foodForm.find('input[name="name"]').val("");
	      $foodForm.find('input[name="calories"]').val("");
	      $foodForm.find('.error').remove();
	    }
	  }, {
	    key: "postConfig",
	    value: function postConfig(foodInfo) {
	      return {
	        method: 'POST',
	        headers: { 'Content-Type': "application/json" },
	        body: JSON.stringify(foodInfo)
	      };
	    }
	  }, {
	    key: "sortFoods",
	    value: function sortFoods(foods, attribute) {
	      var _this2 = this;

	      return foods.sort(function (food1, food2) {
	        if (_this2.sortMethod(food1, food2, attribute)) {
	          return 1;
	        } else {
	          return -1;
	        }
	      });
	    }
	  }, {
	    key: "sortMethod",
	    value: function sortMethod(food1, food2, attribute) {
	      if (attribute === "id") {
	        return food1.id < food2.id;
	      } else if (attribute === "calAsc") {
	        return food1.calories < food2.calories;
	      } else if (attribute === "calDesc") {
	        return food1.calories > food2.calories;
	      }
	    }
	  }, {
	    key: "appendFoods",
	    value: function appendFoods(foods) {
	      return foods.forEach(function (newFood) {
	        var food = new Food(newFood.id, newFood.name, newFood.calories);
	        food.appendFood($('.add-foods-table'), 'checkbox');
	        food.appendFood($('.foods-table'), 'edit');
	      });
	    }
	  }, {
	    key: "validateFood",
	    value: function validateFood() {
	      var $foodForm = $('.food-form');
	      var foodNameField = $foodForm.find('input[name="name"]');
	      var foodCalorieField = $foodForm.find('input[name="calories"]');
	      if (foodNameField.val() === "") {
	        $('.error:first').remove();
	        foodNameField.after('<span class="error">Please enter a food name</span>');
	      } else if (foodCalorieField.val() === "") {
	        $('.error:first').remove();
	        foodCalorieField.after('<span class="error">Please enter a calorie amount</span>');
	      } else {
	        var foodInfo = {
	          food: {
	            name: foodNameField.val(),
	            calories: foodCalorieField.val()
	          }
	        };
	        this.postFood(foodInfo);
	      }
	    }
	  }, {
	    key: "validateFoodPatch",
	    value: function validateFoodPatch(e) {
	      var rowId = e.target.parentNode.dataset.id;
	      var $foodsRow = $("tr[data-id=" + rowId + "]");
	      var editFoodNameField = $foodsRow.find('td:nth-child(1)');
	      var editFoodCalorieField = $foodsRow.find('td:nth-child(2)');
	      if (editFoodNameField.html() === "") {
	        $('.error:first').remove();
	        editFoodNameField.after('<span class="error"><br>Please enter a food name</span>');
	      } else if (editFoodCalorieField.html() === "") {
	        $('.error:first').remove();
	        editFoodCalorieField.after('<span class="error"><br>Please enter a calorie amount</span>');
	      } else {
	        var foodInfo = {
	          food: {
	            name: editFoodNameField.html(),
	            calories: editFoodCalorieField.html()
	          }
	        };
	        this.patchFood(foodInfo, rowId);
	      }
	    }
	  }, {
	    key: "patchFood",
	    value: function patchFood(foodInfo, rowId) {
	      fetch(this.baseUrl + "/" + rowId, this.patchConfig(foodInfo)).then(handleResponse).catch(errorLog);
	    }
	  }, {
	    key: "patchConfig",
	    value: function patchConfig(foodInfo, e) {
	      return {
	        method: "PATCH",
	        headers: { 'Content-Type': "application/json" },
	        body: JSON.stringify(foodInfo)
	      };
	    }
	  }, {
	    key: "destroyFood",
	    value: function destroyFood(e) {
	      var _this3 = this;

	      fetch(this.baseUrl + "/" + e.target.parentNode.parentNode.dataset.id, { method: "DELETE" }).then(function (response) {
	        return _this3.removeFoodFromDom(response, e);
	      }).catch(errorLog);
	    }
	  }, {
	    key: "removeFoodFromDom",
	    value: function removeFoodFromDom(response, e) {
	      if (response.ok) {
	        e.target.closest('tr').remove();
	      } else {
	        alert("Item can't be deleted due to meal association!");
	      }
	    }
	  }, {
	    key: "filterFoods",
	    value: function filterFoods() {
	      var filter = $('input[name="filter"]').val().toLowerCase();
	      var foods = this.setFilterTable();
	      if (filter !== "") {
	        foods.hide();
	        $.each(foods, function (index, food) {
	          if ($(food).find('[data-id="name"]').html().toLowerCase().includes(filter)) {
	            $(food).show();
	          }
	        });
	      } else {
	        foods.show();
	      }
	    }
	  }, {
	    key: "setFilterTable",
	    value: function setFilterTable() {
	      var uri = window.location.pathname;
	      if (uri.includes('/foods.html')) {
	        return $('.foods-table').find('.food');
	      } else if (uri.includes("") || uri.includes("/") || uri.includes("/quantified-self") || uri.includes("/quantified-self-frontend")) {
	        return $('.add-foods-table').find('.food');
	      }
	    }
	  }, {
	    key: "sortCalories",
	    value: function sortCalories() {
	      var foods = this.foods;
	      if (this.counter === 0) {
	        foods = this.sortFoods(foods, "calAsc");
	        this.counter++;
	      } else if (this.counter === 1) {
	        foods = this.sortFoods(foods, "calDesc");
	        this.counter++;
	      } else if (this.counter === 2) {
	        foods = this.sortFoods(foods, "id");
	        this.counter = 0;
	      }
	      $(".foods-table").find("tr").remove();
	      this.appendFoods(foods);
	    }
	  }]);

	  return FoodService;
	}();

	module.exports = FoodService;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Food = function () {
	  function Food(id, name, calories) {
	    _classCallCheck(this, Food);

	    this.id = +id;
	    this.name = name;
	    this.calories = +calories;
	  }

	  _createClass(Food, [{
	    key: 'appendFood',
	    value: function appendFood(table, type) {
	      if (type === 'delete') {
	        table.append(this.foodRowDeletable());
	      } else if (type === 'checkbox') {
	        table.append(this.foodRowCheckable());
	      } else if (type === "edit") {
	        table.append(this.foodRowEditable());
	      }
	    }
	  }, {
	    key: 'prependFood',
	    value: function prependFood(table, type) {
	      if (type === 'delete') {
	        table.find('tr:first').before(this.foodRowDeletable());
	      } else if (type === 'checkbox') {
	        table.find('tr:first').before(this.foodRowCheckable());
	      } else if (type === "edit") {
	        table.find('tr:first').before(this.foodRowEditable());
	      }
	    }
	  }, {
	    key: 'foodRowEditable',
	    value: function foodRowEditable() {
	      return '<tr class=\'food\' data-id=' + this.id + '>\n              <td data-id="name" contentEditable>' + this.name + '</td>\n              <td data-id="calories" contentEditable>' + this.calories + '</td>\n              <td>\n                <img class="delete" data-id="delete" tabindex="0" src="./delete.png" alt="delete">\n              </td>\n            </tr>';
	    }
	  }, {
	    key: 'foodRowDeletable',
	    value: function foodRowDeletable() {
	      return '<tr class=\'food\' data-id=' + this.id + '>\n              <td data-id="name">' + this.name + '</td>\n              <td data-id="calories">' + this.calories + '</td>\n              <td>\n                <img class="delete" data-id="delete" tabindex="0" src="./delete.png" alt="delete">\n              </td>\n            </tr>';
	    }
	  }, {
	    key: 'foodRowCheckable',
	    value: function foodRowCheckable() {
	      return '<tr class=\'food\' data-id=\'' + this.id + '\'>\n              <td><input title="' + this.name + '" label="' + this.name + '" type="checkbox" data-id="' + this.id + '"> </td>\n              <td data-id="name">' + this.name + '</td>\n              <td data-id="calories">' + this.calories + '</td>\n            </tr>';
	    }
	  }]);

	  return Food;
	}();

	module.exports = Food;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	var handleResponse = function handleResponse(response) {
	  return response.json().then(function (json) {
	    if (!response.ok) {
	      var error = {
	        status: response.status,
	        statusText: response.statusText,
	        json: json
	      };
	      return Promise.reject(error);
	    }
	    return json;
	  });
	};

	var errorLog = function errorLog(error) {
	  console.error({ error: error });
	};

	module.exports = [handleResponse, errorLog];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Food = __webpack_require__(2);

	var _require = __webpack_require__(3),
	    _require2 = _slicedToArray(_require, 2),
	    handleResponse = _require2[0],
	    errorLog = _require2[1];

	var MealService = function () {
	  function MealService() {
	    _classCallCheck(this, MealService);

	    this.baseUrl = "https://qs-1710-js.herokuapp.com/api/v1/meals";
	    this.meals = {};
	    this.mealCalorieGoals = {
	      "breakfast": 400,
	      "lunch": 600,
	      "dinner": 800,
	      "snack": 200
	    };
	  }

	  _createClass(MealService, [{
	    key: 'getMealFoods',
	    value: function getMealFoods() {
	      var _this = this;

	      fetch(this.baseUrl).then(handleResponse).then(function (meals) {
	        return _this.addMeals(meals);
	      }).catch(errorLog);
	    }
	  }, {
	    key: 'addMeals',
	    value: function addMeals(meals) {
	      for (var i = 0; i < meals.length; i++) {
	        this.meals[meals[i].name.toLowerCase()] = meals[i].foods;
	        $('#' + meals[i].name.toLowerCase()).find('table').html('<th>Name</th><th>Calories</th>');
	        var foods = this.sortFoods(meals[i].foods);
	        this.appendFoods(foods, meals[i].name);
	        this.appendMealTotalCal(foods, meals[i].name);
	      }
	      this.appendTotalsTable();
	    }
	  }, {
	    key: 'postFoodsToMeal',
	    value: function postFoodsToMeal(mealId, mealName) {
	      var checkedFoods = $('.add-foods-table').find('input:checked');
	      for (var i = 0; i < checkedFoods.length; i++) {
	        var $food = $(checkedFoods[i]).parent().parent();
	        fetch(this.baseUrl + '/' + mealId + '/foods/' + $food.data('id'), this.postFoodToMealConfig()).then(handleResponse).then(this.appendFoodToMeal($food, mealName)).then(this.appendMealTotalCal(this.meals[mealName], mealName)).then($(checkedFoods[i]).prop('checked', false)).then(this.appendTotalsTable()).catch(errorLog);
	      }
	    }
	  }, {
	    key: 'deleteFoodFromMeal',
	    value: function deleteFoodFromMeal(e) {
	      var mealId = e.target.parentNode.parentNode.parentNode.id;
	      var mealName = e.target.parentNode.parentNode.parentNode.parentNode.id;
	      var foodId = e.target.parentNode.parentNode.dataset.id;
	      fetch(this.baseUrl + '/' + mealId + '/foods/' + foodId, { method: "DELETE" }).then(this.removeFoodRow(e)).then(this.deleteFoodFromMealObject(mealName, foodId)).then(this.updateMealCalAfterDelete(mealName)).then(this.appendTotalsTable()).catch(errorLog);
	    }
	  }, {
	    key: 'updateMealCalAfterDelete',
	    value: function updateMealCalAfterDelete(mealName) {
	      var foods = this.meals[mealName];
	      this.appendMealTotalCal(foods, mealName);
	    }
	  }, {
	    key: 'deleteFoodFromMealObject',
	    value: function deleteFoodFromMealObject(mealName, foodId) {
	      var food = this.meals[mealName].find(function (food) {
	        return food.id === foodId;
	      });
	      var index = this.meals[mealName].indexOf(food);
	      this.meals[mealName].splice(index, 1);
	    }
	  }, {
	    key: 'removeFoodRow',
	    value: function removeFoodRow(e) {
	      e.target.parentNode.parentNode.remove();
	    }
	  }, {
	    key: 'appendFoodToMeal',
	    value: function appendFoodToMeal($food, mealName) {
	      var foodId = $food.data('id');
	      var foodName = $food.find('[data-id=name]').html();
	      var foodCalories = $food.find('[data-id=calories]').html();
	      var food = new Food(foodId, foodName, foodCalories);
	      food.prependFood($('#' + mealName.toLowerCase()).find('table'), 'delete');
	      mealName = mealName.toLowerCase();
	      this.meals[mealName].push(food);
	    }
	  }, {
	    key: 'postFoodToMealConfig',
	    value: function postFoodToMealConfig() {
	      return {
	        method: 'POST',
	        headers: { 'Content-Type': "application/json" }
	      };
	    }
	  }, {
	    key: 'sortFoods',
	    value: function sortFoods(foods) {
	      return foods.sort(function (food1, food2) {
	        if (food1.id < food2.id) {
	          return 1;
	        } else {
	          return -1;
	        }
	      });
	    }
	  }, {
	    key: 'appendFoods',
	    value: function appendFoods(foods, mealName) {
	      return foods.forEach(function (newFood) {
	        var food = new Food(newFood.id, newFood.name, newFood.calories);
	        food.appendFood($('#' + mealName.toLowerCase()).find('table'), 'delete');
	      });
	    }
	  }, {
	    key: 'appendMealTotalCal',
	    value: function appendMealTotalCal(foods, meal) {
	      this.removeCalorieRows($('#' + meal.toLowerCase()).find('table'));
	      var total_cal = 0;
	      foods.forEach(function (food) {
	        total_cal += food.calories;
	      });
	      this.appendCalorieRows($('#' + meal.toLowerCase()).find('table'), total_cal, meal);
	    }
	  }, {
	    key: 'removeCalorieRows',
	    value: function removeCalorieRows(table) {
	      table.find("tr.meal_total").remove();
	      table.find("tr.remaining_cals").remove();
	    }
	  }, {
	    key: 'appendCalorieRows',
	    value: function appendCalorieRows(table, total_cal, meal) {
	      table.append(this.totalCalRow(total_cal));
	      table.append(this.remainingCaloriesRow(total_cal, meal.toLowerCase()));
	    }
	  }, {
	    key: 'totalCalRow',
	    value: function totalCalRow(total_cal) {
	      return '<tr class=meal_total>\n              <td class="total_cal_label">Total Calories:</td>\n              <td class="total_calories">' + total_cal + '</td>\n              <td></td>\n            </tr>';
	    }
	  }, {
	    key: 'remainingCaloriesRow',
	    value: function remainingCaloriesRow(total_cal, meal) {
	      if (this.mealCalorieGoals[meal] < total_cal) {
	        return '<tr class="remaining_cals">\n      <td>Calories Remaining:</td>\n      <td class="negative-cal">' + (this.mealCalorieGoals[meal] - total_cal) + '</td>\n      <td></td>\n      </tr>';
	      } else if (this.mealCalorieGoals[meal] > total_cal) {
	        return '<tr class="remaining_cals">\n      <td>Calories Remaining:</td>\n      <td class="positive-cal">' + (this.mealCalorieGoals[meal] - total_cal) + '</td>\n      <td></td>\n      </tr>';
	      }
	    }
	  }, {
	    key: 'appendTotalsTable',
	    value: function appendTotalsTable() {
	      var dailyCalories = this.calculateTotalCal();
	      $("#totals").find("tr").remove();
	      $("#totals").append(this.getTotalGoalCalRow()).append(this.getCalorieConsumedRow(dailyCalories)).append(this.getRemainingCaloriesRow(dailyCalories));
	    }
	  }, {
	    key: 'getTotalGoalCalRow',
	    value: function getTotalGoalCalRow() {
	      return '<tr>\n              <td>Goal Calories</td>\n              <td id="goal-caalories">2000</td>\n            </tr>';
	    }
	  }, {
	    key: 'getCalorieConsumedRow',
	    value: function getCalorieConsumedRow(dailyCalories) {
	      return '<tr>\n              <td>Calories Consumed</td>\n              <td id="calories-consumed">' + dailyCalories + '</td>\n            </tr>';
	    }
	  }, {
	    key: 'getRemainingCaloriesRow',
	    value: function getRemainingCaloriesRow(dailyCalories) {
	      if (2000 - dailyCalories > 0) {
	        return '<tr>\n      <td>Remaining Calories</td>\n      <td class="positive-cal">' + (2000 - dailyCalories) + '</td>\n      </tr>';
	      } else if (2000 - dailyCalories < 0) {
	        return '<tr>\n      <td>Remaining Calories</td>\n      <td class="negative-cal">' + (2000 - dailyCalories) + '</td>\n      </tr>';
	      }
	    }
	  }, {
	    key: 'calculateTotalCal',
	    value: function calculateTotalCal() {
	      var meals = this.meals;
	      var dailyTotal = 0;
	      for (var meal in meals) {
	        var mealTotal = 0;
	        meals[meal].forEach(function (food) {
	          mealTotal += food.calories;
	        });
	        dailyTotal += mealTotal;
	      }
	      return dailyTotal;
	    }
	  }]);

	  return MealService;
	}();

	module.exports = MealService;

/***/ })
/******/ ]);