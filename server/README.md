# How to setup environment variables

```
PORT=3000
MONGODB_CONNECTION_STRING=mongodb+srv://<user>:<password>@<database>
FIREBASE_BUCKETNAME=<storage folder path>
JWT_PRIVATE_KEY=5NiFNjccZ7FUqfQJhwaJ
```

_`.env ` file content_

---

- You'll need a database from [MongoDB](https://account.mongodb.com/account/login), and setup a connection (select "_Connect your application_" option). Copy and paste the value to the `MONGODB_CONNECTION_STRING` env variable.

- [Firebase](https://firebase.google.com/) is working as our media storage service, we'll need the storage folder path, you can get it over `Build > Storage` (copy and paste the value to the `FIREBASE_BUCKETNAME` env variable), and an Admin SDK account key. For the second one, you can get it from `Project settings > Service accounts > Generate new private key`. Save the JSON file, update the `uploadPhoto.js` file (`./server/middlewares/uploadPhoto.js#L4`) with the downloaded JSON file name.
