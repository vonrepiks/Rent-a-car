const mongoose = require('mongoose');
let types = mongoose.Schema.Types;

const rentInfoSchema = new mongoose.Schema({
    user: {type: types.ObjectId, ref: 'User', required: true},
    car: {type: types.ObjectId, ref: 'Car', required: true},
    dateOfRent: {type: types.String, required: true},
    days: {type: types.String, required: true},
});

let RentInfo = mongoose.model('RentInfo', rentInfoSchema);

module.exports = RentInfo;