/**
 * NOTES:
 * Marius "chill" Pisica IRL photos.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");
const { stripIndents } = require("common-tags");

module.exports = {
	name: "sexbomba",
	description: "Sex bomba showcase.",
	category: "trashgang",
	aliases: ["saxbomba", "sexbomb"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		if (message.guild.id !== "546405460811448320")
			return message.channel.send(lang.TRASHGANG.NOT_ALLOWED);

		const embed = BaseEmbed(message)
			.setImage("https://i.imgur.com/Q5P3tJs.jpg")
			.setDescription(stripIndents`\u3000sex bandit`);

		await message.channel.send(embed);
	},
};
