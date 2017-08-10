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
  fieldNames.forEach(name => fields[name] = req.body[name])
  console.log('fields ', fields);
  let field = Object.assign({}, fields, {type: Sequelize.STRING})
  return {field, tableName}
}

router.post('/', (req, res, next) => {
  let result = createTable(req)
  CreatedTable = db.define(result.tableName,
      result.field)
  res.sendStatus(200)
})