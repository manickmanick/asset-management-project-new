const { Sequelize, DataTypes } = require('sequelize');
const db = require("../../database/database")

const employee = db.define("employee",{

   name:{
        type:DataTypes.STRING
   },
   active:{
    type:DataTypes.BOOLEAN
   }
},{
    tableName : "employee"
})

module.exports = employee;