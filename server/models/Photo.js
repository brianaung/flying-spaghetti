export default class Photo {
  constructor(username, caption, path, isPrivate, folder) {
    // this.id = id;
    this.postedBy = username;
    this.caption = caption;
    this.storagePath = path;
    this.isPrivate = isPrivate;
    this.folder = folder;
    this.comments = [];
    this.likes = [];
  }
}
