/* eslint-disable global-require */
const {
    db: { sequelize },
  } = require("../configs");
  
  module.exports = {
    ContactGroup: require("./Contact")(sequelize),
    
  };

 
  