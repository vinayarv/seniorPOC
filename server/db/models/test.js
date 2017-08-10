const db = require('../db')
const Sequelize = require('sequelize');

let test = {body:
    {tableName: 'user1', 
    email:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }, password:{
        type: Sequelize.STRING
    }, salt:{
        type: Sequelize.STRING
    }}
};

function createTable(req){
  let tableName = req.body.tableName
  let fieldNames = Object.keys(req.body).filter(key => key !== 'tableName');
  let fields = {}
  fieldNames.forEach(name => fields[name] = req.body[name])
  return {fields, tableName}
}

let result = createTable(test)
let CreatedTable = db.define(result.tableName, result.fields)

module.exports = CreatedTable