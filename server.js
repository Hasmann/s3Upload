const app = require("./app");

const PORT = process.env.PORT || 3455;

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}.....`);
});
