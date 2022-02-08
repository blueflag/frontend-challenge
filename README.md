# Blue Flag Front End Coding Exercise

We would like you to design and build a mock user interface to display some hypothetical training data to a manager.

----

There are 3 types of data to read: users, learning resources, and learning records.

- *Users* are people in the system
- *Learning resources* are pieces of training that users can interact with.
- Users can interact with these learning resources, and each interaction is recorded as a *learning record*.

The manager wants to see how each of the *users* have interacted with each of the available *learning resources*. It is up to you to decide what you think is the most user friendly way to present this data to the manager.

Consider some of the questions that the manager may be thinking about when they use this user interface.

- Has user X attempted or completed learning resource Y?
- Who has completed a lot of the learning resources? Who hasn't?
- Which learning resources have been completed the most?
- Which learning resources have not been interacted with at all yet?
- Which job position does user X belong to?

These questions don't necessarily need specific features built for them. As long as the user interface lets the manager work out the answers to these questions then that is enough.

There are 3 mock JSON files containing the data to render, available at these URLs when developing the app locally:

- `http://localhost:3000/users.json`
- `http://localhost:3000/learning-resources.json`
- `http://localhost:3000/learning-records.json`

Please make your user interface request this data via XHR, collate it and render it how you think is appropriate. You can make whatever changes you like to any of the code, including add any new npm dependencies you find useful. Feel free to use colours, icons, tooltips or any user interface components you like to present the data in a user friendly way.

For reference, the full list of possible learning record verbs are `ATTEMPT`, `COMPLETE`, `FAIL`, `PASS`, `ENROL` and `ATTEND`.

## Developer setup

You will need Node.js v14 or higher on your local machine.

Please fork this repo, clone it to your machine and run `npm install` to get started. Once done you can run the app using `npm start`.

When you're done please make a pull request back into the `https://github.com/blueflag/front-end-coding-exercise` repo. We'll clone it and run it locally and see how it looks, works and feels.

Thank you, and good luck!