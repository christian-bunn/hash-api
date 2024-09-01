Assignment 1 - Web Server - Response to Criteria
================================================

Overview
------------------------------------------------

- **Name:** Christian Bunn
- **Student number:** n11092505
- **Application name:** File Encryption Service
- **Two line description:** The app creates a encrypted version of a file that users upload. The user can then download the file when it is ready.


Core criteria
------------------------------------------------

### Docker image

- **ECR Repository name:** TODO
- **Video timestamp:** TODO
- **Relevant files:** TODO
    - 

### Docker image running on EC2

- **EC2 instance ID:** TODO
- **Video timestamp:** TODO

### User login functionality

- **One line description:** User name and password required for the user to login. They will have to create an account then login.
- **Video timestamp:** TODO
- **Relevant files:** 
    - /auth/authController.js
    - /auth/routes.js

### User dependent functionality

- **One line description:** Only a registered and logged in user can upload a file for encryption.
- **Video timestamp:** TODO
- **Relevant files:**
    - /middleware/authMiddleware.js

### Web client

- **One line description:** html pages, login, register, file_upload. Feels like 1 webpage. script.js is how the front end communicated to the backend.
- **Video timestamp:** TODO
- **Relevant files:**
    - /frontend/http/css/style.css
    - /frontend/http/js/script.js
    - /frontend/http/file_upload.html
    - /frontend/http/login.html
    - /frontend/http/register.html

### REST API

- **One line description:** REST API with endpoints and HTTP methods. With the needed response code and a catch is anything unexpected occurs. 
- **Video timestamp:** TODO
- **Relevant files:**
    - /backend/auth/authController.js
    - /backend/auth/routes.js
    - /backend/files/fileController.js
    - /backend/files/routes.js
    - /backend/middleware/authMiddleware.js
    - /backend/users/user.js
    - /backend/users/routes.js
    - /backend/users/userController.js

### Two kinds of data

#### First kind

- **One line description:** Uploaded Files, Encrypted Files.
- **Type:** Unstructured
- **Rationale:** TODO
- **Video timestamp:** TODO
- **Relevant files:**
    - /backend/files/fileController.js

#### Second kind

- **One line description:** Cookies
- **Type:** Structured
- **Rationale:** TODO
- **Video timestamp:** TODO
- **Relevant files:**
  - /backend/auth/authController.js
  - /backend/middleware/authMiddleware.js

### CPU intensive task

- **One line description:** Encrypting files that are uploaded by the user. (Peaks the cpu temporarily).
- **Video timestamp:** TODO
- **Relevant files:**
    - /backend/files/fileController.js

### CPU load testing method

- **One line description:** curl request for large file request withs repeated encryption.
- **Video timestamp:** TODO
- **Relevant files:**
    - 

Additional criteria
------------------------------------------------

### Extensive REST API features

- **One line description:** Using middleware for headers including JWT tokens for secure authentication.
- **Video timestamp:** TODO
- **Relevant files:**
    - /backend/auth/authController.js
    - /backend/auth/routes.js
    - /backend/files/fileController.js
    - /backend/files/routes.js
    - /backend/middleware/authMiddleware.js
    - /backend/users/user.js
    - /backend/users/routes.js
    - /backend/users/userController.js


### Use of external API(s)

- **One line description:** Not attempted
- **Video timestamp:**
- **Relevant files:**
    - 


### Extensive web client features

- **One line description:** Not attempted
- **Video timestamp:**
- **Relevant files:**
    - 


### Sophisticated data visualisations

- **One line description:** Not attempted
- **Video timestamp:**
- **Relevant files:**
    - 


### Additional kinds of data

- **One line description:** Not attempted
- **Video timestamp:**
- **Relevant files:**
    - 


### Significant custom processing

- **One line description:** Not attempted
- **Video timestamp:**
- **Relevant files:**
    - 


### Live progress indication

- **One line description:** Not attempted
- **Video timestamp:** 
- **Relevant files:**
    - 


### Infrastructure as code

- **One line description:** Using Docker compose.
- **Video timestamp:** TODO
- **Relevant files:**
    - /main/docker-compose.yml


### Other

- **One line description:** Not attempted
- **Video timestamp:**
- **Relevant files:**
    - 
