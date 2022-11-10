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
- approve/reject new user registrations
- ban users
- set user storage capacity

*All users*
- upload public/private photos
- delete photos
- share photo links
- photo organization in folders
- like and comment
- dark mode
- view what other users have posted
- search photos

## Note
New users need approval from the admin after the registration. During this time, your account will be pending and will not have access to the above features. Once approve, you will get notified via email.

### Demo Users
***IMPORTANT: do not ban user2 and user3 or delete existing photos***

Admin

> - email: admin@gmail.com
> - password: password

Normal Users

*(user1 is currently banned)*
> - email: user1@gmail.com
> - password: password

> - email: user2@gmail.com
> - password: password

> - email: user3@gmail.com
> - password: password
