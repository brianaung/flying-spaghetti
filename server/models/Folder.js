export default class Folder {
  constructor(username, name, parentFolder, date) {
    this.name = name;
    this.owner = username;
    this.date = date;
    this.photos = [];
  }
}
