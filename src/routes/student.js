const express = require('express');
const router = express.Router();
const firebaseAdmin = require('firebase-admin');
const Student = require('../model/student');
const successResponse = require('../util/response');
const logger = require('../config/winston');

const db = firebaseAdmin.firestore();

router.post('/', (req, res) => {
    try {
        const data = req.body;
        const student = new Student(data);
        db.collection('test').doc(student.id).set(Object.assign({}, student));
        res.status(200).send(successResponse('Successfully added a student', 'Successfully added a student', student))
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})


// note : show aync await works 

/**
 * Get a record  
 */
router.get('/:uid', async (req, res) => {
    try {
        const querySnapshot = await db.collection("test")
            .where("id", "==", req.params.uid).where("is_deleted", "==", false)
            .get();

        const data = querySnapshot.docs.map((st) => ({
            id: st.id,
            ...st.data(),
        }));

        if (data.length == 0) {
            res.status(400).send({ message: "invalid id" });
        } else {
            console.log('Document data:', data[0]);
            res.status(200).send(successResponse('Successfully returned student', 'Successfully  returned student', data[0]))
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})


//  db.collection("test")
// .where("id", "==",  req.params.uid)
// .get()
// .then((querySnapshot) => {
//   const data = querySnapshot.docs.map((st) => ({
//     id: st.id,
//     ...st.data(),
//   }));
//   if(!data.exists) {
//     console.log("Users with > 1 book: ", data);
//   }
//   // Users with > 1 book:  [ { id: 'user-1', count: 1 } ]
// });



/**
 * Update a record
 */
router.put('/:id', async (req, res) => {

    try {
        const data = req.body;
        // const studentRef = db.collection('test').doc(req.params.id);
        // const doc = await studentRef.get();
        const studentRef = db.collection('test');
        const doc = await studentRef.where('id', '==', req.params.id).get();
        if (!doc.exists) {
            res.status(400).send({ message: "invalid id" });
        } else {
            await studentRef.update(data);
            res.status(200).send(successResponse('Successfully updated student', 'Successfully  updated student', null))
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})

/**
 * Delete a record
 */
router.delete('/:id', async (req, res) => {
    try {
        await db.collection('test').doc(req.params.id).delete();
        res.status(200).send(successResponse('Successfully deleted student', 'Successfully  deleted student', null))
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }

})





module.exports = router;
