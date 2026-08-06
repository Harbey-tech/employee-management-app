require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
========================================
 Employee Management API
========================================
 Server running on port ${PORT}
 Environment: ${process.env.NODE_ENV || "development"}
========================================
`);
});
