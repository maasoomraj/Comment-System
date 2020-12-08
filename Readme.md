# Comment System

**Comment System** is a portal where you can add threads, reply to threads and search for any keyword.

# Work Flow

## Backend
- Node.JS has been used to serve backend which will run on  `http://localhost:3001/`
- API for viewing all threads and comments, add new comment, search for any keyword
- `MongoDB` has been used as database to store the details of comments
- **MongoDB URI has been exposed for the smooth working, and security purpose has been kept in mind**

## Frontend
- React.JS has been used to serve the frontend for the portal which runs on  `http://localhost:3000/`
- `create-react-app` has been used for initialising the react app
- `axios` is used to send requests to backend over proxy server

### Installing
Clone the repository
```
git clone https://github.com/maasoomraj/Comment-System.git Comment
```
Change directory to /VoteChain
```
cd Comment
```
Install dependencies for backend and frontend
```
npm run build
```
Start the server and client simultaneously
```
npm run start
```
Or you can start the server and client separately
```
npm run start-server
npm run start-client
```

## Authors
- **Masoom Raj**

## Motivation
This project has been done during two days internship at Diverta Inc.
