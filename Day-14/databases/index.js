const {Sequelize} = require("sequelize");
const sequelize = new Sequelize ( "postgres" , "postgres" , "123456" , { host : "localhost", dialect:"postgres"})
const { sequelize_database,
    sequelize_username,
    sequelize_password,
    sequelize_host,
    sequelize_dialect } = require("../config");

    const sequelize = new Sequelize (
        sequelize_database,
    sequelize_username,
    sequelize_password,
    {
        host: sequelize_host,
        dialect: sequelize_dialect
    }
    );
sequelize.sync();

(async () => {
    try {await sequelize.authenticate();
    console.log("Connection established with DB");}
    catch (err) {
       console.log("unable to connect"); 
    }

})();
module.exports = sequelize 