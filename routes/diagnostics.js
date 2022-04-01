const diagnostics = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");
const diagDb = require("../db/diagnostics.json");

// GET Route for retrieving diagnostic information
diagnostics.get("/", (req, res) => {
	// TODO: Logic for sending all the content of db/diagnostics.json
	res.json(diagDb);
});

// POST Route for a error logging
diagnostics.post("/", (req, res) => {
	// TODO: Logic for appending data to the db/diagnostics.json file
	const { time, errors } = req.body;

	if (time && errors) {
		const diagPush = {
			time,
			errors,
			error_id: uuidv4(),
		};

		readAndAppend(diagPush, "./db/diagnostics.json");

		const response = {
			status: "success",
			body: diagPush,
		};

		res.json(response);
	} else {
		res.json("Error in posting feedback");
	}
});

module.exports = diagnostics;
