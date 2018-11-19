function MenuItem(gluten, lactose, kCal, name, ) {
  this.gluten = gluten;
  this.name = name;
  this.lactose = lactose;
  this.kCal = kCal;
  this.calories = function () {
    return this.kCal + ' ' + this.name;
  }
}
