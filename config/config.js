/**
 * Created by Hristo Skipernov on 12/10/2017.
 */

module.exports = {
    development: {
        connectionString: "mongodb://localhost:27017/rent-a-car-db",
        port: process.env.PORT || 3000
    },
    production: {

    }
};