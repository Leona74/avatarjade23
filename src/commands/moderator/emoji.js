/**
 * NOTES:
 * Emoji parser is a bit old and not compatible with new features.
 *
 * @format
 */

const Discord = require("discord.js");
const { parse } = require("twemoji-parser");

module.exports = {
	name: "emoji",
	category: "moderator",
	usage: "emoji <Parse:emoji> <Str:emoji_name>",
	description: "Create an emoji from a different server.",
	botPermissions: ["MANAGE_EMOJIS"],
	memberPermissions: ["MANAGE_EMOJIS"],
	async execute(bot, message, args) {
		const emoji = args[0];
		const lang = await bot.getGuildLang(message.guild.id);

		if (!emoji) return message.channel.send(lang.MODERATOR.PROVIDE_EMOJI);

		let customemoji = Discord.Util.parseEmoji(emoji);

		if (customemoji.id) {
			const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
				customemoji.animated ? "gif" : "png"
			}`;

			const name = args.slice(1).join(" ");

			message.guild.emojis.create(
				`${Link}`,
				`${name || `${customemoji.name}`}`
			);

			return message.channel.send(lang.MODERATOR.SUCCES_EMOJI);
		} else {
			let CheckEmoji = parse(emoji, { assetType: "png" });
			if (!CheckEmoji[0])
				return message.channel.send(lang.MODERATOR.INVALID_EMOJI);
			message.channel.send(lang.MODERATOR.EMOJI_SIMPLE);
		}
	},
};
