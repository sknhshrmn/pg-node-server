import app from "./app.js";
import "dotenv/config";

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server run on port 8080");
});
