const { connect, connection } = require("mongoose");
const Logger = require("../modules/Logger");

(async function database() {
	const uri = process.env["MONGO_DB_URI"];

	try {
		await connect(uri, {
			useCreateIndex: true,
			useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		Logger.log("Database", "Client is connecting to Mongoose.");
	} catch (e) {
		Logger.error("Database", e?.stack || e);
	}

	connection.on("disconnected", () => {
		Logger.log("Database", "Client is disconnected from Mongoose.");
	});
})();
