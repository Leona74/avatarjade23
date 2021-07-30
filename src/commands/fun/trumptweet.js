/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const Discord = require("discord.js");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
	name: "trumptweet",
	description:
		"Display's a custom tweet from Donald Trump with the message provided.",
	usage: "trumptweet <Str:arguments>",
	aliases: ["trumpt", "tweet"],
	category: "fun",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		if (!args[0]) return message.channel.send(lang.FUN.PROVIDE_ARGS);

		let tweet = message.content.slice(
			message.content.indexOf(args[0]),
			message.content.length
		);
		if (tweet.length > 68) tweet = tweet.slice(0, 65) + "...";

		try {
			const res = await fetch(
				"https://nekobot.xyz/api/imagegen?type=trumptweet&text=" + tweet
			);
			const img = (await res.json()).message;

			let attachment = new Discord.MessageAttachment(img, "trumptweet.png");

			message.channel.send(attachment);
		} catch (err) {
			message.client.logger.error(err.stack);
			message.channel.send(err.message);
		}
	},
};
