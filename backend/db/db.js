import mongoose from "mongoose";

const connectWithDB = () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then((res) =>
            console.log(
                `Connected to MongoDB on port ${process.env.PORT} to ${res.Connection.name}`
            )
        )
        .catch((err) => {
            console.log("Failed to  connect with DB", err);
            process.exit(1);
        });
};

export { connectWithDB };
