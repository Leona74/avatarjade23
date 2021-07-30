/**
 * NOTES:
 * Marius "chill" Pisica IRL photos.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");
const { stripIndents } = require("common-tags");

module.exports = {
	name: "monster",
	description: "Shows up the trashgang members real pfp's.",
	category: "trashgang",
	aliases: [
		"nebunu",
		"micu",
		"mujiku",
		"mujicu",
		"inflatu",
		"marele",
		"gagicaru",
		"pidaras",
		"pidarasu",
		"tank",
		"tanku",
		"monstru",
	],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		if (message.guild.id !== "546405460811448320")
			return message.channel.send(lang.TRASHGANG.NOT_ALLOWED);

		const embed = BaseEmbed(message).setImage(
			"https://cdn.discordapp.com/emojis/791606561012842536.png?v=1"
		).setDescription(stripIndents`\u3000 **chill** lui Marius Micu îi se spune

    \u3000 băiat slabuț, 1.30 înalțime, puternic de tot
    \u3000 îl caută fetele și în stânga și în dreapta
    \u3000 agață fetele ca în cârlig, nebun de tot băiatu, 
    \u3000 vedeti câte 5 metri in fata lui daca nu se enerveaza și vă sibești
    \u3000 agresiv luați sama`);

		await message.channel.send(embed);
	},
};
