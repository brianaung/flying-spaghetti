export default class User {
  constructor(firstName, lastName, role, currCapacity, maxCapacity, date, secretKey) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role; // admin, user, banned
    this.currCapacity = currCapacity;
    this.maxCapacity = maxCapacity;
    this.date = date;
    this.folders = [];
    this.images = [];
    this.liked = [];
    this.secretKey = secretKey;
    // this.bin = [];
  }
}
