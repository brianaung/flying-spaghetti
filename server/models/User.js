export default class User {
  constructor(firstName, lastName, role, capacity) {
    // this.username = username;
    // this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role; // admin, user, banned
    // this.dob = dob;
    this.capacity = capacity;
    this.folders = [];
    this.images = [];
    this.liked = [];
  }
}
