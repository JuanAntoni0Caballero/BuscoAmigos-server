# Plan routes
## Base URL /plan
| HHTPP Method | URLpath       | Description                   |
|--------------|---------------|-------------------------------|
| GET          | /getPlan      | Plan list                     |
| POST         | /savePlan     | Create a new Plan             |
| GET          | /plan/:id     | Matching ID plan     details  |
| PUT          | /plan/:id/edi | Matching ID plan     edition  |
| Delete       | /:id/delete   | Matching ID plan     deletion |


# User rout
## Base URL /user
| GET          | /:id          | Matching ID user     details  |
| PUT          | /:id/edit     | Matching ID user     edition  |
| Delete       | /:id/delete   | Matching ID plan     deletion |


# Auth rout
## Base URL /auth
| HHTPP Method | URLpath | Description       |
|--------------|---------|-------------------|
| POST         | /signup | Signup user       |
| POST         | /login  | Loging user       |
| GET          | /verify | Verify auth token |


# Client routes
| URL              | Description            | Protected |
|------------------|------------------------|-----------|
| /                | Home page              |           |
| /plan            | Plan page              |           |
| /details/:id     | Plan detail page       |           |
| /login           | Login page             |           |
| /register        | Register page          |           |
| /create-plan     | New plan form page     | X         |
| /profile         | User profile page      | X         |
| /inbox           | Inbox page  	        | X         |
| /contact         | Contact page           |           |
| /gift	           | Gift page 	            | X         |
| *                | 404 page               |           |