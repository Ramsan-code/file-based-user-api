import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi Express");
});

app.use("/api/users", userRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
