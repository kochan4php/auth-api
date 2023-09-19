import mongoose from 'mongoose';

export default async function database() {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`MongoDB Connected on ${con.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
