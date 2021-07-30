/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
	name: "changemymind",
	description: "Change my mind meme.",
	usage: "changemymind <Str:arguments>",
	category: "fun",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const text = args.join(" ");

		if (!text) return message.channel.send(lang.FUN.PROVIDE_ARGS);

		const data = await fetch(
			`https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`
		).then((res) => res.json());

		let attachment = new Discord.MessageAttachment(
			data.message,
			"changemymind.png"
		);

		message.channel.send(attachment);
	},
};
