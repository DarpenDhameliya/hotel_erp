const mongoose = require('mongoose');

const mongourl = `mongodb+srv://darpensstpl:BnrKB3DBCeEiWC2x@cluster0.udjynea.mongodb.net/medical?retryWrites=true&w=majority`;

const mongoconnect = async () => {
    try {
        mongoose.connect(mongourl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((result) => {
            console.log('connect')
        })
    } catch (error) {
        console.log("mongoose error ===================>", error);
    }
};

module.exports = mongoconnect;
