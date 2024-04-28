const { applyJobFunction } = require("./dynamoDB.js");
const { sendMessageToSQS } = require("./sqs.js");

exports.handler = async (event) => {

    console.log("Incoming Event:", event);
    try {
        // Parse the JSON string in the body property
        const parsedBody = JSON.parse(event.body);
        const response = await applyJobFunction(parsedBody);
        const { finalResponse, data } = response;

        if (finalResponse.statusCode === 200) {
            await sendMessageToSQS(data);
        }

        return {
            statusCode: finalResponse.statusCode,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ statusCode: finalResponse.statusCode, message: finalResponse.body }),
            isBase64Encoded: false
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: "Internal server error" }),
            isBase64Encoded: false
        };
    }
};
