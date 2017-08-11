const router = require('express').Router()
const db = require('../db')
const Sequelize = require('sequelize');
module.exports = router

/** assuming req.body:
 * {tablename : nameoftable, field1:{name:, attribute:{type:, default:...}}, field2:{}, field3:{}}
 *  **/

function createTable(req){
  let tableName = req.body.tableName
  let fieldNames = Object.keys(req.body).filter(key => key !== 'tableName');
  let fields = {}
  fieldNames.forEach(name => {
    let edited = Object.assign({}, req.body[name], {type: Sequelize.STRING, allowNull: true})
    fields[name] = edited
  })
  return {fields, tableName}
}

let x = {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  }
};

router.post('/', (req, res, next) => {
  let result = createTable(req)
  console.log('result from createTable: ', result.fields);
  // let testing = Object.assign({}, result.fields, {type: Sequelize.STRING, allowNull: true});
  // console.log('testing: ', testing);
  console.log('tablename: ', result.tableName, typeof result.tableName);
  const CreatedTable = db.define(result.tableName, result.fields)
  db.sync();
  res.sendStatus(200)
})