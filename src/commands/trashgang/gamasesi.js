/**
 * NOTES:
 * Marius "chill" Pisica IRL photos.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");
const { stripIndents } = require("common-tags");

module.exports = {
	name: "gamasesi",
	description: "Gamasec showcase.",
	category: "trashgang",
	aliases: ["gamasesii", "gamasek", "gamasec", "gamaseci"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		//if (message.guild.id !== "546405460811448320")
		//return message.channel.send(lang.TRASHGANG.NOT_ALLOWED);

		const embed = BaseEmbed(message)
			.setImage(
				"https://cdn.discordapp.com/attachments/789862793846325248/870625921713979462/WhatsApp_Image_2021-07-16_at_09.27.42.jpeg"
			)
			.setDescription(" <:Health_icon:852570156261834762> igor si dani");

		await message.channel.send(embed);
	},
};
