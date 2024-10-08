# TEST TASK FOR CODEFINITY

# Clone the Repository

To clone the repository, open your terminal and run the following command:

```bash
git clone git@github.com:lilzem/codefinity-test.git
cd codefinity-test
```

# Setup

You have to set environment variables

## Backend

```
PORT=5000 (for example)
JWT_SECRET=generate your secret
DOMAIN=http://localhost:5000
```

## Frontend

```
VITE_BACKEND_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

Also check .env.example if needed

# Run

To install dependencies run following command in your root:

```bash
npm run init
```

To run your application by one command run following command in your root:

```bash
npm run start
```
