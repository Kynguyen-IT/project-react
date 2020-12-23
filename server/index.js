require("dotenv").config();

const mongoose = require("mongoose");
const { success, error } = require("consola");

mongoose.Promise = global.Promise;


const app = require("./src/app");
app.disable('etag');

const port = process.env.PORT;

mongoose.connect(process.env.DB_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
console.clear();
success({
  message: `Successfully connected to ${process.env.DB_DEV}`,
  badge: true,
});

app.listen(port, () =>
  success({
    message: `Server running on port ${port}`,
    badge: true,
  })
);



