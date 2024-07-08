import envConfig from "@/configs/envConfig";
import mongoose from "mongoose";

const uri = envConfig.db_uri;

async function dbConnection() {
  try {
    if (uri) {
      await mongoose.connect(uri).then(() => {
        console.log("db connected");
      });
    } else {
      console.error("db uri is not defined");
    }
  } catch (err) {
    console.error(`Failed to connect database ${err}`);
  }
}

export default dbConnection;
