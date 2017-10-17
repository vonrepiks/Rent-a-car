/**
 * Created by Hristo Skipernov on 12/10/2017.
 */

const controllers = require('../controllers/blender-controller');
const requestedPages = require('../config/auth');

module.exports = (app) => {
    //Home page
    app.get('/', controllers.home.index);

    //User requests
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);
    app.post('/logout', controllers.user.logout);

    //Car requests
    app.get('/cars/add', requestedPages.isInRole('Admin'), controllers.car.registerCarGet);
    app.post('/cars/add', requestedPages.isInRole('Admin'), controllers.car.registerCarPost);

    app.get('/cars/edit/:id', requestedPages.isInRole('Admin'), controllers.car.editCarGet);
    app.post('/cars/edit/:id', requestedPages.isInRole('Admin'), controllers.car.editCarPost);

    app.get('/cars/rent/:id', requestedPages.isAuthenticated, controllers.car.rentCarGet);
    app.post('/cars/rent/:id', requestedPages.isAuthenticated, controllers.car.rentCarPost);

    app.get('/cars/viewAll', controllers.car.viewAllCars);

    //Global error page
    app.all('*', (req, res) => {
        res.render('error');
    });
};