const router = require('express').Router()
const db = require('../db')
module.exports = router

/** assuming req.body:
 * {tablename : nameoftable, field1:{name:, attribute:{type:, default:...}}, field2:{}, field3:{}}
 *  **/

function createTable(req){
  let tableName = req.body.tableName
  let fieldNames = Object.keys(req.body).filter(key => key !== 'tableName');
  let fields = {}
  fieldNames.forEach(name => fields[name] = req.body[name])
  return {fields, tableName}
}

router.post('/', (req, res, next) => {
  let result = createTable(req)
  CreatedTable = db.define(result.tableName,
      result.fields)
  res.sendStatus(200)
})