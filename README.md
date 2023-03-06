# Plan routes
## Base URL /plan
| HHTPP Method | URLpath       | Description                   |
|--------------|---------------|-------------------------------|
| GET          | /getPlan      | Plan list                     |
| GET          | /details/:id  | Matching ID plan     details  |
| POST         | /savePlan     | Create a new Plan             |
| GET          | /plan/:id     | Matching ID plan     details  |
| PUT          | /plan/:id/edi | Matching ID plan     edition  |
| Delete       | /delete/:id   | Matching ID plan     deletion |


# User rout
## Base URL /user
| HHTPP Method | URLpath       | Description                   |
|--------------|---------------|-------------------------------|
| GET          | /:id          | Matching ID user     details  |
| PUT          | /edit/:id     | Matching ID user     edition  |
| Delete       | /delete/:id   | Matching ID plan     deletion |


# Auth rout
## Base URL /auth
| HHTPP Method | URLpath | Description       |
|--------------|---------|-------------------|
| GET          | /verify | Verify auth token |
| POST         | /signup | Signup user       |
| POST         | /login  | Loging user       |


# Client routes
| URL              | Description            | Protected |
|------------------|------------------------|-----------|
| /                | Home page              |           |
| /plan            | Plan page              |           |
| /details/:id     | Plan detail page       |           |
| /login           | Login page             |           |
| /signup          | Register page          |           |
| /create-plan     | New plan form page     | X         |
| /profile         | User profile page      | X         |
| /inbox           | Inbox page  	        | X         |
| /contact         | Contact page           |           |
| /gift	           | Gift page 	            | X         |
| *                | 404 page               |           |