const admin = require('firebase-admin')
const logger = require('../config/winston')

const auth = async (req, res, next) => {

    try {
        const authHeader = req.header('Authorization').replace('Bearer ', '');

        logger.info('executing middleware ------_>')

        if (!authHeader) {
            console.log('errorr');
            throw new Error()
        }

        // admin.auth()
        //     .verifyIdToken(authHeader)
        //     .then((decodedToken) => {
        //         req.email = decodedToken.email;
        //         console.log('userid -----> ', decodedToken.email);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         res.status(401).send(error)
        //         throw new Error(error)
        //     });

        //

        try {
            const decodedToken = await admin.auth()
                .verifyIdToken(authHeader)
            req.email = decodedToken.email;
            console.log('userid -----> ', decodedToken.email);
        } catch (error) {
            console.log(error);
            res.status(401).send({"error": "invalid token"})
            throw new Error(error)
        }




        console.log('test ');

        next()

    } catch (error) {
        res.status(401).send({ "error": "Unauthorized", "message": error })
    }

}

module.exports = auth;