const express = require('express');
const router = express.Router();
const firebaseAdmin = require('firebase-admin')
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth')
const logger = require('../config/winston')

const db = firebaseAdmin.firestore();

router.post('/', function (req, res) {

    firebaseAdmin.auth().createUser({
        email: req.body.email,
        emailVerified: true,
        password: req.body.password,
        photoURL: req.body.imageUrl,
        disabled: false,
    })
        .then((user) => {
            console.log('user created -> ', user);
            return res.status(200).send(user);
        }).catch((error) => {
            console.log('Error creating new user:', error);
            return res.status(500).send('error');
        })
})


router.get('/:uid', auth, async (req, res) => {
    const _id = req.params.uid;

    logger.info('logiingg ----------------')

    firebaseAdmin
        .auth()
        .getUser(_id)
        .then((userRecord) => {
            console.log(`Successfully fetched user data: ${userRecord}`, userRecord);
            return res.status(200).send(userRecord);
        })
        .catch((error) => {
            console.log('Error fetching user data:', error);
            return res.status(500).send('error');
        });
})




router.post('/upload', async (req, res) => {

    var bucket = firebaseAdmin.storage().bucket();

    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;

            const metadata = {
                metadata: {
                    // This line is very important. It's to create a download token.
                    firebaseStorageDownloadTokens: uuidv4()
                },
                contentType: 'image/png',
                cacheControl: 'public, max-age=31536000',
            };

            // Uploads a local file to the bucket
            await bucket.upload(avatar.name, {
                // Support for HTTP requests made with `Accept-Encoding: gzip`
                gzip: true,
                metadata: metadata,
            });

        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }

})



router.post('/add', auth, async (req, res) => {
    const random = Math.floor(Math.random() * 100) + 1;
    console.log(random);
    try {
        const data = {
            name: "konarar",
            email: "email@gmail.com"
        }

        const doc = await db.collection('test').doc(uuidv4()).set(data);
        res.status(200).send({ doc })
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }

})


module.exports = router;