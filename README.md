# `server`


## APIs

### __List Tasks__

URL: `/api/taskss`

Method: GET

Description: Get all the tasks.

Request body: _None_

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body: An array of objects, each describing a task.
```
[{
    "id": 4,
    "description": "Watch the Express videolecture",
    "important": 1
    "private": 1
    "deadline": "2021-05-30 13:00"
    "completed": 0
    "user": 1
}, {
    "id": 5,
    "description": "Prepare thesis discussion",
    "important": 0
    "private": 0
    "deadline": "2021-05-30 21:00"
    "completed": 1
    "user": 1
},
...
]
```


Method: GET

Description: Get all the important tasks.

Request body: _None_

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body: An array of objects, each describing an important task.
```
[{
    "id": 4,
    "description": "Watch the Express videolecture",
    "important": 1
    "private": 1
    "deadline": "2021-05-30 13:00"
    "completed": 0
    "user": 1
}, {
    "id": 6,
    "description": "Organize a party",
    "important": 1
    "private": 0
    "deadline": "2021-06-04 12:00"
    "completed": 1
    "user": 1
},
...
]
```

Method: GET

Description: Get all the private tasks.

Request body: _None_

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body: An array of objects, each describing a private task.
```
[{
    "id": 4,
    "description": "Watch the Express videolecture",
    "important": 1
    "private": 1
    "deadline": "2021-05-30 13:00"
    "completed": 0
    "user": 1
}, {
    "id": 6,
    "description": "Organize a party",
    "important": 0
    "private": 1
    "deadline": "2021-06-04 12:00"
    "completed": 1
    "user": 1
},
...
]
```


Method: GET

Description: Get all the tasks with the deadline on the current day.

Request body: _None_

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body: An array of objects, each describing task with the deadline on the current day.
```
[{
    "id": 6,
    "description": "Organize a party",
    "important": 0
    "private": 1
    "deadline": "2021-06-04 12:00"
    "completed": 1
    "user": 1
}, {
    "id": 6,
    "description": "Organize a party",
    "important": 0
    "private": 1
    "deadline": "2021-06-04 12:00"
    "completed": 1
    "user": 1
},
...
]
```


Method: GET

Description: Get all the tasks with the deadline on the current day.

Request body: _None_

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body: An array of objects, each describing task with the deadline on the current day.
```
[{
    "id": 6,
    "description": "Organize a party",
    "important": 0
    "private": 1
    "deadline": "2021-06-04 12:00"
    "completed": 1
    "user": 1
}, {
    "id": 6,
    "description": "Organize a party",
    "important": 0
    "private": 1
    "deadline": "2021-06-04 12:00"
    "completed": 1
    "user": 1
},
...
]
```


Method: GET

Description: Get all the tasks with the deadline in the next 7 days.

Request body: _None_

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body: An array of objects, each describing task with the deadline in the next 7 days.
```
[{
    "id": 6,
    "description": "Organize a party",
    "important": 0
    "private": 1
    "deadline": "2021-06-08 12:00"
    "completed": 1
    "user": 1
}, {
    "id": 6,
    "description": "Organize a party",
    "important": 0
    "private": 1
    "deadline": "2021-06-10 12:00"
    "completed": 1
    "user": 1
},
...
]
```


### __Add a New Task__

URL: `/api/exams`

Method: POST

Description: Add a new (passed) exam to the list of the student's exams.

Request body: An object representing an exam (Content-Type: `application/json`).
```
{
    "description": "Study for the exam",
    "important": 0
    "private": 1
    "deadline": "2021-06-08 02:00"
}
```

Response: `201 Created` (success) or `503 Service Unavailable` (generic error, e.g., when trying to insert an already existent exam). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: _None_


### __Update a task__

URL: `/api/tasks/<id>`
```
Method: PUT

Description: Update entirely an existing task, identified by its id.

Request body: An object representing the entire exam (Content-Type: `application/json`).
```
{
    "description": "Prepare the slides for the exam",
    "important": 1
    "private": 0
    "deadline": "2021-06-20 14:00"
}
```
Response: `200 OK` (success) or `503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: _None_


### __Mark/unmark a Task__

Method: PUT

Description: mark/unmark an existing task, identified by its id.

Request body: An object representing the entire exam (Content-Type: `application/json`).
```
{
    "description": "Prepare the slides for the exam",
    "important": 1
    "private": 0
    "deadline": "2021-06-20 14:00"
}

Response: `200 OK` (success) or `503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: _None_
```


### __Delete a Task__

URL: `/api/tasks/<id>`

Method: DELETE

Description: Delete an existing task, identified by its id.

Request body: _None_

Response: `204 No Content` (success) or `503 Service Unavailable` (generic error).

Response body: _None_