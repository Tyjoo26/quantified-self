class Food {
  constructor(id, name, calories) {
    this.id = id
    this.name = name
    this.calories = calories
  }
  appendFood() {
    $('.foods-table').append(this.foodRow())
  }
  prependFood() {
    $('.foods-table tr:first').before(this.foodRow())
  }
  foodRow() {
    return `<tr class='food' id=${this.id}>
              <td contentEditable>${this.name}</td>
              <td contentEditable>${this.calories}</td>
              <td id="delete">delete</td>
            </tr>`
  }
}

module.exports = Food
