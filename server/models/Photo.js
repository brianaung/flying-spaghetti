export default class Photo {
  constructor(username, name, caption, link, isPrivate, folder, date) {
    this.owner = username;
    this.name = name;
    this.caption = caption;
    this.link = link;
    this.isPrivate = isPrivate;
    this.folder = folder;
    this.date = date;
    this.comments = [];
    this.likes = 0;
  }
}
