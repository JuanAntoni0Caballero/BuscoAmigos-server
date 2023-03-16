# Plan routes
## Base URL /plan
| HHTPP Method | URLpath                                | Description               |
|--------------|----------------------------------------|---------------------------|
| GET          | /getAllPlans                           | Plan list                 |
| GET          | /getMyPlans                            | List of user plans        |
| GET          | /getRandomPlans                        | Random plan list          |
| GET          | /getOriginPlan                         | Filter by Origin          |
| GET          | /getDestinationPlan                    | Filter by Destination     |
| GET          | /getTypePlan                           | Filter by Type            |
| GET          | /getOnePlan/:id                        | Matching ID plan details  |
| POST         | /createPlan                            | Create a new Plan         |
| PUT          | /edit/:id                              | Matching ID plan edition  |
| Delete       | /delete/:id                            | Matching ID plan deletion |


# Conversation routes
## Base URL /conversation
| HHTPP Method | URLpath                                | Description               |
|--------------|----------------------------------------|---------------------------|
| GET          | /getConversation/:id                   | Conversation              |
| GET          | /getAllConversations                   | All conversations         |
| POST         | /createConversation/plan_id            | Create a new Plan         |
| Delete       | /conversationMessage/:conversation_id  | Matching ID plan deletion |


# Messages rout
## Base URL /messages
| HHTPP Method | URLpath                                | Description               |
|--------------|----------------------------------------|---------------------------|
| GET          | /getMessages                           | Get messages              |
| POST         | /createMessage/:conversation_id        | Edit user                 |
| Delete       | /deleteMessage/:message_id             | Matching ID plan deletion |


# User rout
## Base URL /user
| HHTPP Method | URLpath                                | Description               |
|--------------|----------------------------------------|---------------------------|
| GET          | /getUsers                              | Matching ID user details  |
| GET          | /getOneUses/:id                        | Find User                 |
| GET          | /profile                               | User details              |
| PUT          | /editUser                              | Edit user                 |
| Delete       | /deleteUser                            | Matching ID plan deletion |


# Auth rout
## Base URL /auth
| HHTPP Method | URLpath                                | Description               |
|--------------|----------------------------------------|---------------------------|
| GET          | /verify                                | Verify auth token         |
| POST         | /signup                                | Signup user               |
| POST         | /login                                 | Loging user               |


# Client routes
| URL              | Description                        | Protected                 |
|------------------|------------------------------------|---------------------------|
| /                | Home page                          |                           |
| /planDetails/:id | Plan detail page                   |                           |
| /planEdit/:id    | Plan edit page                     | X                         |
| /editUser        | Edit User page                     | X                         |
| /inbox           | Inbox page  	                    | X                         |
| /contact         | Contact page                       |                           |
| /gift	           | Gift page 	                        | X                         |
| *                | 404 page                           |                           |