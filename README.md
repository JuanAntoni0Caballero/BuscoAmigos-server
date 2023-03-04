# Planning routes
## Base URL /planning

| HHTPP Method | URLpath       | Description                   |
|--------------|---------------|-------------------------------|
| GET          | /getPlanning  | Planning list                 |
| POST         | /savePlanning | Create a new Planning         |
| GET          | /:id          | Matching ID planning details  |
| PUT          | /:id/edit     | Matching ID planning edition  |
| Delete       | /:id/delete   | Matching ID planning deletion |


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
| /planning        | Planning page          |           |
| /details/:id     | Planning detail page   |           |
| /start-sesion    | Login page             |           |
| /register        | Register page          |           |
| /create-planning | New planning form page | X         |
| /profile         | User profile page      | X         |
| *                | 404 page               |           |