import { app } from './app.js';

const server = app.listen(process.env.PORT || 9000, () => {
  console.log('our app is listening on port %d', server.address().port);
});
