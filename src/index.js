require("dotenv/config");
require("./utils/checkValid")();
require("./utils/database");
const { Collection, Client } = require("discord.js");
const {
	findMember,
	getGuildLang,
	sendErrorLog,
	getLanguages,
	getGuildById,
	updateUserById,
	getUserById,
	formatNumber,
} = require("./utils/functions");
const Logger = require("./modules/Logger");

const bot = new Client({
	disableMentions: "everyone",
	fetchAllMembers: true,
	partials: ["GUILD_MEMBER", "MESSAGE", "USER", "REACTION"],
	restRequestTimeout: 25000,
	messageCacheMaxSize: 100,
	messageCacheLifetime: 7300,
	messageSweepInterval: 600,
});

[
	findMember,
	getGuildLang,
	getLanguages,
	getGuildById,
	updateUserById,
	getUserById,
	formatNumber,
].forEach((func) => {
	bot[func.name] = func;
});

bot.logger = Logger;
bot.commands = new Collection();
bot.aliases = new Collection();
bot.cooldowns = new Collection();
bot.games = new Collection();
bot.afk = new Map();

global.Promise = require("bluebird");
Promise.config({
	longStackTraces: true,
});

require("moment-duration-format");
require("./modules/command")(bot);
require("./modules/events")(bot);

bot.login(process.env["BOT_TOKEN"]);

process.on("unhandledRejection", (error) => sendErrorLog(bot, error, "error"));

process.on("uncaughtExceptionMonitor", (error) =>
	sendErrorLog(bot, error, "error")
);

process.on("warning", (warning) => {
	if (warning.stack.startsWith("(node:13988) [DEP0148]")) return;

	sendErrorLog(bot, warning, "warning");
});
