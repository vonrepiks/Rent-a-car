const mongoose = require('mongoose');
let types = mongoose.Schema.Types;

const carSchema = new mongoose.Schema({
    mark: {type: types.String, required: true},
    model: {type: types.String, required: true},
    image: {type: types.String, required: true},
    pricePerDay: {type: types.String},
    productionYear: {type: types.String},
    rented: {type: types.Boolean, default: false}
});

let Car = mongoose.model('Car', carSchema);

module.exports = Car;