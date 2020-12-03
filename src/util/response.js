const successResponse = (message, displayMessage, data) => {
    return {
        status: "SUCCESS",
        message: message,
        data: data,
        displayMessage: displayMessage
    }
}

const errorResponse = (message, displayMessage, errorCode) => {
    return {
        status: "ERROR",
        message,
        displayMessage,
        errorCode
    }
}

const internalServerError = {
        status: "ERROR",
        message: "Internal server error",
        displayMessage: "Oops something went wrong",
        errorCode: 5000
}

module.exports = {
    successResponse, errorResponse, internalServerError
}