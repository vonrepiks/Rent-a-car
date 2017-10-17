const flashMessage = require('../utility/flash_messages');
const Car = require('../models/Car');
const RentInfo = require('../models/RentInfo');

module.exports = {
    registerCarGet: (req, res) => {
        res.render('cars/addCar');
    },
    registerCarPost: async (req, res) => {
        let reqCar = req.body;

        let carForAdd = {
            mark: reqCar.mark,
            model: reqCar.model,
            image: reqCar.image,
            pricePerDay: reqCar.pricePerDay,
            productionYear: reqCar.productionYear
        };

        try {
            await Car.create(carForAdd);
            flashMessage(req, 'success', 'Successfully register new car in system.');
            res.redirect('/');
        } catch (err) {
            flashMessage(req, 'error', 'Error with adding car in system!');
            console.log(err);
            res.redirect(req.originalUrl);
        }
    },
    viewAllCars: async (req, res) => {
        try {
            let page = Number(req.query.page);
            if (page < 0) {
                page = 0;
            }

            let take = 2;

            let query = Car.find({'rented': false});

            query.count(function (err, count) {
                query.skip(page * take).limit(take).exec('find', function (err, cars) {
                    if (err) {
                        console.log(err);
                        flashMessage(req, 'error', 'This page is temporary not accessible, please try again later.');
                        res.redirect('/');
                    } else {

                        let prevPage;
                        let nextPage;
                        let hasPrevPage = true;
                        let hasNextPage = true;

                        if (page === 0) {
                            prevPage = page;
                            hasPrevPage = false;
                        } else {
                            prevPage = page - 1;
                        }

                        if (count - (page * take) <= take) {
                            nextPage = page;
                            hasNextPage = false;
                        } else {
                            nextPage = page + 1;
                        }

                        res.render('cars/viewAll', {
                            cars,
                            page,
                            prevPage,
                            nextPage,
                            hasPrevPage,
                            hasNextPage
                        });
                    }
                });
            });
        } catch (err) {
            console.log(err);
            flashMessage(req, 'error', 'This page is temporary not accessible, please try again later.');
            res.redirect('/');
        }
    },
    editCarGet: async (req, res) => {
        let carId = req.params.id;

        try {
            let car = await Car.findById(carId);
            if (!car) {
                flashMessage(req, 'error', 'No such car');
                res.redirect('/');
            } else {
                res.render('cars/editCar', {car});
            }
        } catch (err) {
            flashMessage(req, 'error', 'Wrong car id!');
            res.redirect('/');
        }
    },
    editCarPost: async (req, res) => {
        let carId = req.params.id;
        let reqCar = req.body;

        try {
            let car = await Car.findById(carId);

            car.mark = reqCar.mark;
            car.model = reqCar.model;
            car.image = reqCar.image;
            car.pricePerDay = reqCar.pricePerDay;
            car.productionYear = reqCar.productionYear;

            car.save();

            flashMessage(req, 'success', 'Successfully edited car.');
            res.redirect('/');
        } catch (err) {
            console.log(err);
            flashMessage(req, 'error', 'Editing error');
            res.redirect(req.originalUrl);
        }
    },
    rentCarGet: async (req, res) => {
        let carId = req.params.id;

        try {
            let car = await Car.findById(carId);
            if (!car) {
                flashMessage(req, 'error', 'No such car');
                res.redirect('/cars/viewAll');
            } else {
                res.render('cars/rentCar', {car});
            }
        } catch (err) {
            flashMessage(req, 'error', 'Wrong car id!');
            res.redirect('/cars/viewAll');
        }
    },
    rentCarPost: async (req, res) => {
        let carId = req.params.id;
        let userId = req.user.id;

        try {
            let reqBody = req.body;
            let rentInfoObj = {};

            rentInfoObj.user = userId;
            rentInfoObj.car = carId;
            rentInfoObj.dateOfRent = reqBody.dateOfRent;
            rentInfoObj.days = reqBody.days;

            await RentInfo.create(rentInfoObj);

            let car = await Car.findById(carId);
            car.rented = true;
            car.save().then(() => {
            });

            flashMessage(req, 'success', 'Successfully rent car.');
            res.redirect('/');
        } catch (err) {
            console.log(err);
            flashMessage(req, 'error', 'Editing error');
            res.redirect(req.originalUrl);
        }
    }
}
;