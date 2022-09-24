// Within photos
export default class Comment {
  constructor(username, text, date) {
    this.owner = username;
    this.text = text;
    this.date = date;
  }
}
