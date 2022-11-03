export default class Photo {
  constructor(uid, name, caption, link, isPrivate, folder, date) {
    this.owner = uid;
    this.name = name;
    this.caption = caption;
    this.link = link;
    this.isPrivate = isPrivate;
    this.folder = folder;
    this.date = date;
    this.comments = [];
    this.likes = [];
  }
}
