export default class Folder {
  constructor(username, name, parentFolder) {
    // this.id = id;
    this.createdBy = username;
    this.name = name;
    this.parent = parentFolder;
    this.folders = [];
    this.photos = [];
  }
}
