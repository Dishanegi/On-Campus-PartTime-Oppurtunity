// function to segregate the appllied, rejected jobs with the non enrolled jobs
const constructStudentReponse = (status,items) => {
    const jobIdsFromJobTable = items[0].map(jobs => jobs.jobId);
    const jobIdsFromApplicationTable = items[1].map(jobs => jobs.jobId);
    if(status) {
        const statusArray = status.split(',');
        const jobApplicationStatus = items[1].filter(job => statusArray.includes(job.applicationStatus));
        const jobIdsAndStatus = jobApplicationStatus.map(job => { return { jobId : job.jobId, applicationId : job.applicationId, applicationStatus : job.applicationStatus}});
        console.log(jobIdsAndStatus)
        const mergedJobs = jobIdsAndStatus.map(application => {
            // Find the job from the jobs array that matches the application's jobId
            const job = items[0].find(job => job.jobId === application.jobId);

            // Merge the application status into the job object and return it
            return { ...job, applicationStatus: application.applicationStatus , applicationId : application.applicationId };
        });
        return mergedJobs;
        
    } else {
        // Find unique job IDs in the job table that are not in the application table
        const uniqueInJobIds = jobIdsFromJobTable.filter(jobId => !jobIdsFromApplicationTable.includes(jobId));
        // Filter out jobs in the first array that have unique IDs
        const notEnrolledJobs = items[0].filter(job => uniqueInJobIds.includes(job.jobId));

        const response = notEnrolledJobs;
        return response;
    }


};

module.exports = { constructStudentReponse };
