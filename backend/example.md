Assignment 1 - Web Server - Response to Criteria
================================================

Instructions:

- Don't use this file.  Use the clean template from Canvas
- This file is a sample showing the kinds and amount of detail that we
    would like to see
- Video timestamp refers to the time in your video where the functionality 
    is demonstrated.  Note that the user login and user dependent functionality
    will likely contribute to demonstrating the web client.
- Relevant files are filename and line number(s) where the functionality is implemented.
    You can also refer to an entire directory or leave off the line number if 
    the whole directory/file is relevant.

Overview
------------------------------------------------

- **Name:** John Doe
- **Student number:** n1234567
- **Application name:** My Video Stabiliser
- **Two line description:** This app runs a stabilisation algorithm on videos that users have uploaded.  
Users can then view or download their original videos and the stabilised videos.

Core criteria
------------------------------------------------

### Docker image

- **ECR Repository name**: n1234567-my-video-stabiliser
- **Video timestamp:** 0:15
- **Relevant files:**
    - /Dockerfile

### Docker image running on EC2

- **EC2 instance ID**: i-033d1ecd128950210
- **Video timestamp:** 0:30

### User login functionality

- **One line description:** Hard-coded username/password list.  Using JWTs for sessions.
- **Video timestamp:** 0:45
- **Relevant files:**
    - /routes/login.js

### User dependent functionality

- **One line description:** Files are owned by a user.  Users can only list, view and download their own files.
- **Video timestamp:** 1:00
- **Relevant files:**
    - /routes/videos.js 33
    - /routes/uploadVideo.js: 50, 66

### Web client

- **One line description:** Single page application using React
- **Video timestamp:** 0:45
- **Relevant files:**
    - /routes/webClient.js
    - /routes/webClient/
    - /public/

### REST API

- **One line description:** REST API with endpoints (as nouns) and HTTP methods (GET, POST, PUT, DELETE), and appropriate status codes
- **Video timestamp:** 00:30
- **Relevant files:**
    - /api/routes/router.js
    - /api/controllers/userController.js
    - /api/controllers/videoController.js

### Two kinds of data

#### First kind

- **One line description:** Video files
- **Type:** Unstructured
- **Rationale:** Videos are too large for database.  No need for additional functionality.
- **Video timestamp:** 1:30
- **Relevant files:**
    - /routes/uploadvideo.js 50
    - /routes/stabilisevideo.js 55
    - /routes/videos.js 25
    - /videos/

#### Second kind

- **One line description:** File metadata, user ownership of videos
- **Type:** Structured, no ACID requirements
- **Rationale:** Need to be able to query for user and video data.  Low chance of multiple writes to single file or user data.
- **Video timestamp:** 1:45
- **Relevant files:**
    - /routes/videos.js 33
    - /routes/stabiliseVideo.js 45
    - /routes/uploadvideo.js 30, 77

### CPU intensive task

- **One line description**: Uses ffmpeg to stabilise shaky video files.
- **Video timestamp:** 2:00
- **Relevant files:**
    - /routes/stabiliseVideo.js

### CPU load testing method

- **One line description**: Node script to generate requests to stabilise endpoint
- **Video timestamp:** 2:30
- **Relevant files:**
    - /loadTest.js

Additional criteria
------------------------------------------------

### Extensive REST API features

- **One line description**: Use of middleware for advanced HTTP headers, and features pagination, sorting, filter
- **Video timestamp:** 01:00
- **Relevant files:**
    - /api/middleware/pagination.js
    - /api/routes/router.js
    - /api/controllers/userController.js
    - /api/controllers/videoController.js


### Use of external API(s)

- **One line description**: Recommendations for related YouTube videos: titles and thumbnails
- **Video timestamp:** 1:00
- **Relevant files:**
    - /routes/recommendVideos.js


### Extensive web client features

- **One line description**: Single page application, video player, video recommendations, auto-play next video.
- **Video timestamp:** 1:30
- **Relevant files:**
    - /public


### Sophisticated data visualisations

- **One line description**: Not attempted
- **Video timestamp:** mm:ss
- **Relevant files:**
    - filename:linenumber


### Additional kinds of data

- **One line description**: Not attempted
- **Video timestamp:** mm:ss
- **Relevant files:**
    - filename:linenumber


### Significant custom processing

- **One line description**: Not attempted
- **Video timestamp:** mm:ss
- **Relevant files:**
    - filename:linenumber


### Live progress indication

- **One line description**: Web client polls /progress for progress info, periodically updated from the ffmpeg command.
- **Video timestamp:** 3:00
- **Relevant files:**
    - /routes/progress.js
    - /public/


### Infrastructure as code

- **One line description**: Using Docker compose for application and Mongo containers.
- **Video timestamp:** 0:25
- **Relevant files:**
    - /compose.yaml


### Other

- **One line description**:  Not attempted
- **Video timestamp:** mm:ss
- **Relevant files:**
    - filename:linenumber
