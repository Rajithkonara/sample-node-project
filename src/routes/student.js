const express = require('express');
const router = express.Router();
const firebaseAdmin = require('firebase-admin');
const Student = require('../model/student');
const { successResponse, errorResponse, internalServerError } = require('../util/response');
const logger = require('../config/winston');

const db = firebaseAdmin.firestore();

/**
 * Add a record
 */
router.post('/', (req, res) => {
    try {
        const data = req.body;
        const student = new Student(data);
        logger.debug('student request: ', data);
        db.collection('test').doc(student.id).set(Object.assign({}, student));
        res.status(200).send(successResponse('Successfully added a student', 'Successfully added a student', student));
    } catch (e) {
        logger.error(e.message);
        res.status(500).send(internalServerError);
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
            res.status(400).send(errorResponse('Invalid student Id', 'Invalid student Id', 4001));
        } else {
            logger.debug('Student retured ', data[0]);
            res.status(200).send(successResponse('Successfully returned student', 'Successfully  returned student', data[0]))
        }
    } catch (e) {
        logger.error(e.message);
        res.status(500).send(internalServerError)
    }
})


/**
 * Update a record
 */
router.put('/:id', async (req, res) => {
    try {
        const studentRef = db.collection('test');
        const querySnapshot = await studentRef
            .where('id', '==', req.params.id)
            .where("is_deleted", "==", false)
            .get();

        const data = querySnapshot.docs.map((st) => ({
            id: st.id,
            ...st.data(),
        }));

        if (data.length == 0) {
            res.status(400).send(errorResponse('Invalid student Id', 'Invalid student Id', 4001));
        } else {
            await studentRef.doc(data[0].id).update(req.body)
            res.status(200).send(successResponse('Successfully updated student', 'Successfully  updated student', null))
        }
    } catch (e) {
        logger.error(e.message);
        res.status(500).send(internalServerError)
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
        logger.error(e.message);
        res.status(500).send(internalServerError)
    }
})

module.exports = router;
