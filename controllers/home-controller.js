/**
 * Created by Hristo Skipernov on 12/10/2017.
 */

const Car = require('../models/Car');

module.exports = {
    index: async (req, res) => {
        try {
            let cars = await Car.find({'rented': false}).limit(3);

            res.render('home/index', {cars});

        } catch (err) {
            console.log(err);
            res.redirect('/');
        }
    }
};