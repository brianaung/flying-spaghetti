export default class User {
  constructor(firstName, lastName, role, capacity, date) {
    // this.username = username;
    // this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role; // admin, user, banned
    this.capacity = capacity;
    this.date = date;
    this.folders = [];
    this.images = [];
    this.liked = [];
  }
}
