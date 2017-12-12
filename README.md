# Bookkeeping Service REST API

This repository contains REST API for bookkeeping service, which allows to track incomes and expenses.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

Download this repository and install packages:

```
git clone https://github.com/YanaLapitskaya/bookkeeping-nodejs-app.git
cd bookkeeping-nodejs-app
npm install
```

Change .env.example file to send mails:
```
MAIL_SERVICE=gmail
MAIL_USER=user
MAIL_PASSWORD=password
```

And run local server:
```
npm start
```

API Docs: http://localhost:8080/api-docs/
