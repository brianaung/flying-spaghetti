class User {
    constructor(username, firstName, lastName, role, dob, capacity) {
        this.username = username;
        // this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;       // admin, user, banned
        this.dob = dob;
        this.capacity = capacity;
        // this.folders = [];
        this.images = [];
        this.liked = [];
    }
}

class Photo {
    constructor(username, caption, path, isPrivate, folder) {
        // this.id = id;
        this.postedBy = username;
        this.caption = caption;
        this.storagePath = path;
        this.isPrivate = isPrivate;
        this.folder = folder;
        this.comments = [];
    }
}

class Folder {
    constructor(username, name, parentFolder) {
        // this.id = id;
        this.createdBy = username;
        this.name = name;
        this.parent = parentFolder;
        this.folders = [];
        this.photos = [];
    }
}

// Within photos
class Comment {
    constructor(username, text) {
        // this.id = id;
        this.createdBy = username;
        this.text = text;
    }
}

// Add this to all classes
// this.dateCreated = firebase.firestore.Timestamp.fromDate(new Date());