const successResponse = (message, displayMessage, data) => {
    return {
        status: "SUCCESS",
        message: message,
        data: data,
        displayMessage: displayMessage
    }
}

module.exports = successResponse;