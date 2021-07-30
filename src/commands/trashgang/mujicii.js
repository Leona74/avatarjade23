/**
 * NOTES:
 * Catalin "skillzl" & Ianis "genius" IRL Photos.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");
const { stripIndents } = require("common-tags");

module.exports = {
	name: "mujicii",
	description: "Shows up the trashgang members real pfp's.",
	category: "trashgang",
	aliases: ["laobetie"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		if (message.guild.id !== "546405460811448320")
			return message.channel.send(lang.TRASHGANG.NOT_ALLOWED);

		const embed = BaseEmbed(message).setImage(
			"https://cdn.discordapp.com/attachments/679443339485118465/838050796431474718/unknown.png"
		).setDescription(stripIndents`\u3000 la o betie cu baietii`);

		await message.channel.send(embed);
	},
};
