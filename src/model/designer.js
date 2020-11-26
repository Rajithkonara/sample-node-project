const { v4: uuidv4 } = require('uuid');
const sql = require('../db/mysql')

const id_prefix = 'did-';

class Designer {

  constructor(designer) {
    this.id = id_prefix + uuidv4();
    this.user_id = designer.user_id;
    this.deal_id = designer.deal_id;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  create(designer, result) {
    sql.query("INSERT INTO designer_assignment SET ?", designer, (err, res) => {
      if (err) {
        console.log("Error occured while assigning designer : ", err);
        result(err, null);
        return;
      }
      console.log("Assigned designer: ", { id: res.insertId, ...designer });
      result(null, { id: res.insertId, ...designer });
    });
  }
}

module.exports = Designer;
