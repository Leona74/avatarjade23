const config = require("../../config.json");
const Logger = require("../modules/Logger");

function checkValid() {
	const v = parseFloat(process.versions.node);

	if (v < 14) {
		throw Error("[Client] Error: Upgrade to nodejs v14.");
	}

	if (!config.owners[0]) {
		Logger.warn("Client", "ownerId is required for ownerOnly commands.");
	}

	if (!config.openWeatherMapKey || config.openWeatherMapKey === "") {
		Logger.warn(
			"Client",
			"openWeatherMapKey is required for the weather command."
		);
	}
}

module.exports = checkValid;
