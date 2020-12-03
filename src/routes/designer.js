const express = require('express');
const router = express.Router();
const Designer = require('../model/designer');

router.post('/assign', function (req, res) {

     console.log('Assign designer request body ', req.body);

     if (!req.body.user_id || !req.body.deal_id) {
          return res.status(400).send({
               status: "ERROR",
               message: "Required fields are missing",
               data: null,
               errorCode: 4000,
               displayMessage: "Required fields are missing"
          });
     }

     const { user_id, deal_id } = req.body;

     const designer = new Designer({ user_id, deal_id });

     designer.create(designer, (err, data) => {
          if (err) {
               console.error('Error occured while assigning designer', err.message);
               res.status(500).send({ message: err.message || 'error occured while assigning designer' });
          } else {
               res.send({
                    status: "SUCCESS",
                    message: "Designer assigned successfully",
                    data: data,
                    displayMessage: "Designer assigned successfully"
               })
          }
     })
});

module.exports = router;
