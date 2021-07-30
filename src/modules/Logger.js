const moment = require("moment");
const chalk = require("chalk");
const date = new Date();

class Logger {
	get now() {
		return moment().format("DD-MM-YYYY, HH:mm:ss a");
	}

	error(type, error) {
		return console.error(
			`[${(date.getMonth() + 1)
				.toString()
				.padStart(2, "0")}/${date
				.getDate()
				.toString()
				.padStart(2, "0")}/${date
				.getFullYear()
				.toString()
				.padStart(4, "0")} ${date
				.getHours()
				.toString()
				.padStart(2, "0")}:${date
				.getMinutes()
				.toString()
				.padStart(2, "0")}:${date
				.getSeconds()
				.toString()
				.padStart(2, "0")}] ${chalk.red("Error:")} ${error}`
		);
	}

	warn(type, warning) {
		return console.warn(
			`[${(date.getMonth() + 1)
				.toString()
				.padStart(2, "0")}/${date
				.getDate()
				.toString()
				.padStart(2, "0")}/${date
				.getFullYear()
				.toString()
				.padStart(4, "0")} ${date
				.getHours()
				.toString()
				.padStart(2, "0")}:${date
				.getMinutes()
				.toString()
				.padStart(2, "0")}:${date
				.getSeconds()
				.toString()
				.padStart(2, "0")}] ${chalk.yellow("Warn:")} ${warning}`
		);
	}

	log(type, message) {
		return console.log(
			`[${(date.getMonth() + 1)
				.toString()
				.padStart(2, "0")}/${date
				.getDate()
				.toString()
				.padStart(2, "0")}/${date
				.getFullYear()
				.toString()
				.padStart(4, "0")} ${date
				.getHours()
				.toString()
				.padStart(2, "0")}:${date
				.getMinutes()
				.toString()
				.padStart(2, "0")}:${date
				.getSeconds()
				.toString()
				.padStart(2, "0")}] ${chalk.blueBright("Info:")} ${message}`
		);
	}
}

module.exports = new Logger();
