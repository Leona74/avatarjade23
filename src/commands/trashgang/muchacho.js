/**
 * NOTES:
 * Muchacho meme showcase.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
	name: "muchacho",
	description: "Shows up the muchacho message.",
	category: "trashgang",
	aliases: ["paslanahui", "muciacia"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		if (message.guild.id !== "546405460811448320")
			return message.channel.send(lang.TRASHGANG.NOT_ALLOWED);

		const embed = BaseEmbed(message).setImage(
			"https://i.imgur.com/lB5ikXl.jpg"
		);

		await message.channel.send(embed);
	},
};
