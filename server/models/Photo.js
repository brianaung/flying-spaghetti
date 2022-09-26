export default class Photo {
  constructor(username, caption, link, isPrivate, folder, date) {
    this.owner = username;
    this.caption = caption;
    this.link = link;
    this.isPrivate = isPrivate;
    this.folder = folder;
    this.date = date;
    this.comments = [];
    this.likes = [];
  }
}
