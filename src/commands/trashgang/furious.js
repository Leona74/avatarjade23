/**
 * NOTES:
 * Marius "chill" Pisica IRL photos.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");
const { stripIndents } = require("common-tags");

module.exports = {
	name: "furious",
	description: "Furious showcase.",
	category: "trashgang",
	aliases: [],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		if (message.guild.id !== "546405460811448320")
			return message.channel.send(lang.TRASHGANG.NOT_ALLOWED);

		const embed = BaseEmbed(message)
			.setImage("https://i.imgur.com/tp6Hoxd.png")
			.setDescription(
				stripIndents`\u3000budeti ostorojnoe мальчики и девочки on furious mujik`
			);

		await message.channel.send(embed);
	},
};
