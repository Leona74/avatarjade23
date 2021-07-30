/**
 * NOTES:
 * Catalin "skillzl" Ta, Ianis "genius" Tonu and Marius "mqr" Raileanu IRL photos.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");
const { stripIndents } = require("common-tags");

module.exports = {
	name: "inflatii",
	description: "Shows up the trashgang members real pfp's.",
	category: "trashgang",
	aliases: ["idinah"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		if (message.guild.id !== "546405460811448320")
			return message.channel.send(lang.TRASHGANG.NOT_ALLOWED);

		const embed = BaseEmbed(message)
			.setImage("https://i.imgur.com/gPnKZnA.png")
			.setDescription(
				stripIndents`\u3000 foarte atent când treci pe lângă ei\nsabacika ii ră, omoară omu' mort mai pi scurt`
			);

		await message.channel.send(embed);
	},
};
