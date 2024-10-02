# Docs

> **Note**: This solution has been tested on expo web.

## Goal

The goal was to make this solution review-ready, not production-ready.

## Quick start

### Running the app

**Before you attempt to run anything make sure you have those things installed on your machine**:

```sh
# Developed and tested on Ubuntu (couldn't use Mac for it) with
node v >= 20.9.0
```

To run the backend (no need to worry about `.env`s -- not a good practice, but convenient):

```sh
$ npm i
$ npm start
# server will run on http://localhost:3000
```

To run tests:

```sh
$ npm test
```

## Implementation

### Ideas

- use my existing "framework" for simple expressjs projects: https://github.com/skrybeme/skrybe-esl-service;
- since the data source is a large file, to optimize it we could fetch it once and store it in local db\*;
  - I wasn't sure if I'll have enough time so I needed to go with interface-based data source injection;
- the API does not have to offer more than it's specifically needed by the client app;
- use zod to validate external data structure (as we don't actually know it in the runtime);

### Trade-offs

- \*wasn't able to finish the pre-fetch data to local db approach, although the code is prepared for such a change;
  - the idea was to run the app with `DATA_BYPASS_LOCAL_DB=0` env variable value;
- no unit tests, only integration tests;
  - tested "money paths" mostly, wasn't able to focus more on error paths;
- I didn't pay much attention to request data validation;
- no sorting;
