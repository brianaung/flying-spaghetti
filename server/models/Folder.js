export default class Folder {
  constructor(uid, name, date) {
    this.name = name;
    this.owner = uid;
    this.date = date;
    this.photos = [];
  }
}
