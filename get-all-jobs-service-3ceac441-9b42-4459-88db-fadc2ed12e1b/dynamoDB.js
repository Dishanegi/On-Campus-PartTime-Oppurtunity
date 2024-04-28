const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

const getJobsFunction = async (queryStringParameters) => {
    const params =  constructParams(queryStringParameters);
    console.log(params);
    if (!params.length) {
        return { statusCode: 400, body: JSON.stringify({ error: "No valid parameters provided for query." }) };
    }
    try {
        const results = await Promise.all(params.map(param => documentClient.scan(param).promise()));
        const items = results.map(result => result.Items);
        console.log(items);
        return { statusCode: 200, items };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, items: [] };
    }
};

const constructParams =  (queryStringParameters) => {
    let queries = [];
    const todayIso = new Date().toISOString().split('T')[0]; // Common date string used in all queries
    if (queryStringParameters.employeeId) {
        queries.push({
            TableName: 'Jobs',
            FilterExpression: 'jobDeadline > :today AND jobPostedByEmployeeId = :jobPostedByEmployeeId',
            ExpressionAttributeValues: {
                ':today': todayIso,
                ':jobPostedByEmployeeId': parseInt(queryStringParameters.employeeId, 10)
            }
        });
    } else if (queryStringParameters.studentId) {
        // all jobs from the jobs table irrespective of the posting
        queries.push({
            TableName: 'Jobs',
            FilterExpression: 'jobDeadline > :today',
            ExpressionAttributeValues: {
                ':today': todayIso
            }
        }); 
        // all jobs present in application table
        queries.push({
            TableName: 'StudentsApplicationStatus',
            FilterExpression: 'studentId = :studentId',
            ExpressionAttributeValues: {
                ':studentId': parseInt(queryStringParameters.studentId, 10)
        }
    });
    }
    return queries.length > 0 ? queries : []; 

};

module.exports = { getJobsFunction };
