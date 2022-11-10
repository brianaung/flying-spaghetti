# Photo Share App
[Documentation](https://flying-spaghetti.atlassian.net/l/cp/joKJSSDX)

The app is available here at https://photoshare-client.herokuapp.com.

## Running Locally
*client at port 3000 and server at port 9000*

First clone the repository.

### Install dependencies:

```cd flying-spaghetti && npm install && cd client && npm install && cd ../server && npm install && cd ..```

### Run the app:
inside the project root folder run

```npm run dev```

## Features
*Admin*
- [x] approve/reject new user registrations
- [x] ban users
- [ ] set user storage capacity (need to update in database manually)

*All users*
- [x] upload public/private photos
- [x] delete photos
- [x] share photo links
- [x] photo organization in folders
- [x] like and comment
- [x] dark mode
- [x] view what other users have posted
- [x] search photos

## Note
New users need approval from the admin after the registration. During this time, your account will be pending and will not have access to the above features. Once approve, you will get notified via email.

### Demo Users 
*(important: do not ban user2 and user3 or delete existing photos)*

#### Admin Account:

> *email:* `admin@gmail.com` *password:* `password`

#### Normal Accounts:

*(user1 is currently banned)*
> *email:* `user1@gmail.com` *password:* `password`

> *email:* `user2@gmail.com` *password:* `password`

> *email:* `user3@gmail.com` *password:* `password`
