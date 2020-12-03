const admin = require('firebase-admin')
const logger = require('../config/winston')
const { errorResponse } = require('../util/response');

const auth = async (req, res, next) => {

    try {
        const authHeader = req.header('Authorization').replace('Bearer ', '');

        logger.info('executing auth middleware ------->')

        if (!authHeader) {
            throw new Error()
        }

        try {
            const decodedToken = await admin.auth().verifyIdToken(authHeader)
            req.email = decodedToken.email;
        } catch (error) {
            console.log(error);
            res.status(401).send(errorResponse('Unauthorized', 'Unauthorized', 4001));
            throw new Error(error)
        }

        next()

    } catch (error) {
        res.status(400).send(errorResponse('Unauthorized', 'Unauthorized', 4001));
    }
}

module.exports = auth;