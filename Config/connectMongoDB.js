const mongoose = require('mongoose');

const connectMongoDB = async (mongoUrl) => {

    try {
        
        const dbConnection = await mongoose.connect( mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`App connected to MongoDB: ${dbConnection.connection.host}`);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectMongoDB;