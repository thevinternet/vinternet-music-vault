const ErrorHandling = {}

//===============================================================================================================//
// Error Handling For Errors Not Already Processed By The Controller Or Model
//===============================================================================================================//

// Handle errors where request originated from a client HTTP Request (Respond back to client)

ErrorHandling.clientErrorHandler = (err, req, res, next) => {
	if (req.xhr) {
		res.json({
			error: {
				status: "Request Failed",
				response: err.status,
				errors: [
					{
						msg: err.message
					}
				]
			}
		});
	} else {
		next(err)
	}
}

// Handle any other errors that fall through the net (render HTML page via Express)

ErrorHandling.catchAllHandler = (err, req, res, next) => {
	res.json({
		error: {
			status: "Request Failed",
			response: "HTTP Status Code 500 (Internal Server Error)",
			errors: [
				{
					msg: err.message,
					error: err.status
				}
			]
	}
	});
}

//===============================================================================================================//

module.exports = ErrorHandling;
