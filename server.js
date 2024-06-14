import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.js";

const app = express();
const PORT = process.env.PORT || 8000;
const DB_URL =
  "mongodb+srv://anbumani15012002:5S4IhCSCoPpJx8ii@cluster0.6fbj4ti.mongodb.net/react-project?retryWrites=true&w=majority&appName=Cluster0";

app.use(bodyParser.json());

// Routes
app.use("/api", userRoutes);

// MongoDB connection
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
