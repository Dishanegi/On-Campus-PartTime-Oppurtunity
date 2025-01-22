# Part-Time Opportunity Tracker Service

## Overview

The Part-Time Opportunity Tracker Service is a cloud-based platform designed to streamline the process of posting, notifying, and applying for part-time jobs on campus. This platform benefits both students and hiring managers by offering an efficient, user-friendly system to manage job opportunities, applications, and notifications.

## Features

- **For Students**:
  - View and apply for job postings.
  - Track application status in real-time.
  - Receive email notifications for new opportunities and updates.

- **For Employers**:
  - Post job opportunities with detailed descriptions.
  - Manage applications, review candidates, and update statuses.
  - Notify students about application outcomes (e.g., acceptance or rejection).

- **Automated Notifications**:
  - Email alerts for new jobs, application submissions, and updates using AWS SES and SQS.

## Architecture

The system leverages AWS services for a scalable, serverless architecture:

- **AWS Lambda**: Handles core functionalities like job posting, application processing, and notifications.
- **DynamoDB**: Manages data storage for students, employers, jobs, and application statuses.
- **API Gateway**: Acts as the interface for all HTTP(S) requests, connecting the front-end to Lambda functions.
- **SQS**: Ensures reliable asynchronous message processing.
- **SES**: Sends automated email notifications.

## AWS DynamoDB Table Structure

1. **Students Table**:
   - Stores student details like `studentId`, `name`, `email`, and `graduationDate`.

2. **Employers Table**:
   - Stores employer details like `employeeId`, `name`, `designation`, and `workSpace`.

3. **Jobs Table**:
   - Manages job postings, including attributes like `jobId`, `jobTitle`, `jobDescription`, `jobPayRate`, and `skillsRequired`.

4. **Application Status Table**:
   - Tracks student applications with attributes like `applicationId`, `applicationStatus`, and `jobId`.

## Key APIs

- **POST /authLogin**: Authenticate users (students and employers).
- **POST /job-post**: Create new job postings.
- **POST /apply-job**: Submit job applications.
- **PATCH /update-application-jobs**: Update application statuses.
- **GET /get-applications**: Fetch job applications for students or employers.
- **GET /get-jobs**: Retrieve available job postings.
- **DELETE /delete-service**: Delete job postings or withdraw applications.

## Challenges and Solutions

- **Lambda and API Gateway Integration**: Resolved configuration issues for smooth communication between APIs and Lambda.
- **CORS Issues**: Fixed browser restrictions by enabling appropriate headers in Lambda and API Gateway.
- **SES Setup**: Verified email addresses and optimized notification delivery.
- **DynamoDB GSIs**: Designed indexes to efficiently handle queries and optimize performance.

## Technologies Used

- **Front-End**: User-friendly web interface for students and employers.
- **Back-End**: AWS Lambda, API Gateway, SQS, SES, and DynamoDB for serverless processing.
- **Monitoring**: AWS CloudWatch for system performance and debugging.

## Screenshots

1. **Student Dashboard**: Job listings with options to apply and track applications.
2. **Employer Dashboard**: Tools for job posting and managing candidates.
3. **Notifications**: Email alerts for job updates and application statuses.

## How to Run

1. **Setup**:
   - Deploy the system on AWS with configured Lambda functions, DynamoDB tables, and SES.
   - Host the front-end on a web server.

2. **Usage**:
   - Students and employers log in through the web interface.
   - Students apply for jobs and track applications.
   - Employers manage postings and applications via their dashboard.

## Future Scope

- Implement AI-based job recommendations for students.
- Extend support for off-campus opportunities.
- Introduce analytics for employers to track hiring trends.
