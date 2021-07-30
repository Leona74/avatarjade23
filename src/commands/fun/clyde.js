/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
	name: "clyde",
	description: "Let clyde say something.",
	usage: "clyde <Str:arguments>",
	category: "fun",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const text = args.join(" ");

		if (!text) return message.channel.send(lang.FUN.PROVIDE_ARGS);

		const data = await fetch(
			`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`
		).then((res) => res.json());

		let attachment = new Discord.MessageAttachment(data.message, "clyde.png");

		message.channel.send(attachment);
	},
};
