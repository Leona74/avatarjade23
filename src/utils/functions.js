const User = require("../models/User.model");
const Guild = require("../models/Guild.model");
const Warning = require("../models/Warning.model");
const BaseEmbed = require("../modules/BaseEmbed");
const Logger = require("../modules/Logger");
const { WebhookClient } = require("discord.js");
const fs = require("fs");

const denied_emoji = ["<:denied:797837142805184532>"];
const approved_emoji = ["<:approved:797837174858317834>"];

const yes = [
	"yes",
	"y",
	"ye",
	"yeah",
	"yup",
	"yea",
	"ya",
	"hai",
	"da",
	"dai",
	"si",
	"sí",
	"oui",
	"はい",
	"correct",
	"davai",
];
const no = [
	"no",
	"n",
	"nah",
	"nope",
	"nu",
	"nop",
	"iie",
	"いいえ",
	"non",
	"fuck off",
	"ne",
];

async function getUserById(userId) {
	try {
		let user = await User.findOne({ userId: userId });
		const warnings = await Warning.find({ userId: userId });

		if (!user) {
			user = await addUser(userId);
		}

		return {
			user,
			warnings: warnings,
		};
	} catch (e) {
		Logger.error("Functions", e.stack || e);
	}
}

async function addUser(userId) {
	try {
		const user = new User({ userId: userId });

		await user.save();

		return user;
	} catch (e) {
		Logger.error("Functions", e.stack || e);
	}
}

async function updateUserById(userId, data) {
	try {
		if (typeof data !== "object") {
			throw Error("'data' must be an object");
		}

		const user = await getUserById(userId);

		if (!user) {
			await addUser(userId);
		}

		await User.findOneAndUpdate({ userId: userId }, data);
	} catch (e) {
		Logger.error("Functions", e.stack || e);
	}
}

async function removeUser(userId) {
	try {
		await User.findOneAndDelete({ userId: userId });
	} catch (e) {
		Logger.error("Functions", e.stack || e);
	}
}

async function getGuildById(guildId) {
	try {
		let guild = await Guild.findOne({ guildId: guildId });

		if (!guild) {
			guild = await addGuild(guildId);
		}

		return guild;
	} catch (e) {
		Logger.error("GET_GUILD_BY_ID", e.stack || e);
	}
}

async function updateGuildById(guildId, settings) {
	try {
		if (typeof settings !== "object") {
			throw Error("'settings' must be an object");
		}

		const guild = await getGuildById(guildId);

		if (!guild) {
			await addGuild(guildId);
		}

		await Guild.findOneAndUpdate({ guildId: guildId }, settings);
	} catch (e) {
		Logger.error("Functions", e.stack || e);
	}
}

async function addGuild(guildId) {
	try {
		const guild = new Guild({ guildId: guildId });

		await guild.save();

		return guild;
	} catch (e) {
		Logger.error("Functions", e.stack || e);
	}
}

async function removeGuild(guildId) {
	try {
		await Guild.findOneAndDelete({ guildId: guildId });
	} catch (e) {
		Logger.error("Functions", e.stack || e);
	}
}

async function addWarning(userId, guildId, reason) {
	try {
		const warning = new Warning({
			guildId: guildId,
			userId: userId,
			reason,
		});

		await warning.save();
	} catch (e) {
		Logger.error("Functions", e.stack || e);
	}
}

async function removeUserWarnings(userId, guildId) {
	try {
		await Warning.deleteMany({ userId: userId, guildId: guildId });
	} catch (e) {
		Logger.error("Functions", e.stack || e);
	}
}

const errorEmbed = (permissions, message) => {
	return message.channel.send(
		`${denied_emoji} Required permission: ${permissions
			.map((p) => `\`${p}\``)
			.join(", ")}.`
	);
};

function findMember(message, args, allowAuthor) {
	return message.guild.member(
		message.mentions.users.first() ||
			message.guild.members.cache.get(args[0]) ||
			message.guild.members.cache.find((m) => m.user.id === args[0]) ||
			message.guild.members.cache.find((m) => m.user.tag === args[0]) ||
			message.guild.members.cache.find(
				(m) =>
					m.displayName.toLowerCase().includes(args[0]) ||
					m.user.tag.toLowerCase().includes(args[0])
			) ||
			(allowAuthor === true ? message.member : null)
	);
}

async function getGuildLang(guildId) {
	try {
		const guild = await getGuildById(guildId);

		return require(`../locales/${guild?.locale || "english"}`);
	} catch (e) {
		Logger.error("Functions", e.stack || e);
	}
}

function sendErrorLog(bot, error, type) {
	const webhookIntegration = new WebhookClient(
		"795321440735461396",
		"CS9iXmXJTx-zLGiGONJaoUh-S8pfHsrHi24ERQQUZSD63ODXhpScCENIhbngE2Bdz1Ws"
	);
	if (!webhookIntegration) {
		return Logger.error("UNHANDLED ERROR", error);
	}

	const message = {
		author: bot.user,
	};

	const name = error.name || "unnamed";
	const httpStatus = error.httpStatus || "unavailable";
	const stack = error.stack || error;

	const embed = BaseEmbed(message)
		.setTitle("An error occurred")
		.addField("**ERROR NAME:**", name, true)
		.addField("**HTTPSTATUS:**", httpStatus, true)
		.addField("**TIMESTAMP:**", Logger.now, true)
		.setDescription(`\`\`\`js\n${stack}\`\`\` `)
		.setColor(type === "error" ? "#f58989" : "#f5cf89");

	webhookIntegration.send({
		username: "chàrlie",
		avatarURL:
			"https://cdn.discordapp.com/avatars/772497789561208872/fbdd13287474020008179c89886add56.png?size=1024",
		embeds: [embed],
	});
}

const toCapitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const calculateUserXp = (xp) => Math.floor(0.1 * Math.sqrt(xp));

function getLanguages() {
	return fs
		.readdirSync("./src/locales/")
		.filter((f) => f.endsWith(".js"))
		.map((la) => la.slice(0, -3));
}

function formatNumber(n) {
	return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function greyScale(ctx, x, y, width, height) {
	const data = ctx.getImageData(x, y, width, height);
	for (let i = 0; i < data.data.length; i += 4) {
		const brightness =
			0.34 * data.data[i] + 0.5 * data.data[i + 1] + 0.16 * data.data[i + 2];
		data.data[i] = brightness;
		data.data[i + 1] = brightness;
		data.data[i + 2] = brightness;
	}
	ctx.putImageData(data, x, y);
	return ctx;
}

function motionBlur(ctx, image, x, y, width, height) {
	ctx.drawImage(image, x, y, width, height);
	ctx.globalAlpha = 0.2;
	for (let i = 0; i < 10; i += 2) ctx.drawImage(image, x + i, y, width, height);
	ctx.globalAlpha = 1;
	return ctx;
}

function list(arr, conj = "and") {
	const len = arr.length;
	if (len === 0) return "";
	if (len === 1) return arr[0];
	return `${arr.slice(0, -1).join(", ")}${
		len > 1 ? `${len > 2 ? "," : ""} ${conj} ` : ""
	}${arr.slice(-1)}`;
}

function randomRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function verify(
	channel,
	user,
	{ time = 30000, extraYes = [], extraNo = [] } = {}
) {
	const filter = (res) => {
		const value = res.content.toLowerCase();
		return (
			(user ? res.author.id === user.id : true) &&
			(yes.includes(value) ||
				no.includes(value) ||
				extraYes.includes(value) ||
				extraNo.includes(value))
		);
	};

	const verify = await channel.awaitMessages(filter, {
		max: 1,
		time,
	});

	if (!verify.size) return 0;

	const choice = verify.first().content.toLowerCase();

	if (yes.includes(choice) || extraYes.includes(choice)) return true;
	if (no.includes(choice) || extraNo.includes(choice)) return false;

	return false;
}

module.exports = {
	errorEmbed,
	sendErrorLog,
	toCapitalize,
	calculateUserXp,
	getUserById,
	addGuild,
	addUser,
	removeUser,
	updateUserById,
	getGuildById,
	updateGuildById,
	removeGuild,
	addWarning,
	removeUserWarnings,
	findMember,
	getGuildLang,
	getLanguages,
	greyScale,
	list,
	motionBlur,
	randomRange,
	verify,
	formatNumber,
};
