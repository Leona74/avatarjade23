/**
 * TODO:
 * Fix cache clean up bug.
 *
 * @format
 */

const { stripIndent } = require("common-tags");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
	name: "staff",
	description: "Displays the list of contributors and mental support.",
	aliases: ["management", "staffMembers"],
	category: "general",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		const embed = BaseEmbed(message)
			.setThumbnail(
				bot.user.avatarURL({ dynamic: true, size: 2048, format: "png" })
			)
			.setDescription(stripIndent`${lang.GENERAL.STAFFINFO}`)
			.addField(
				`**${lang.GENERAL.INFOBOT_BOT_DEVS}:**`,
				`${
					bot.users.cache.get("565960314970177556").tag
				} - code author, developer\n${
					bot.users.cache.get("715230184760147999").tag
				} - bot advertising manager`
			)
			.addField(
				`**${lang.GENERAL.INFOBOT_SPECIAL}:**`,
				`${bot.users.cache.get("760482642482429974").tag}`
			)
			.addField(
				`**${lang.GENERAL.INFOBOT_SUPPORT}:**`,
				`${bot.users.cache.get("462294547855048714").tag}\n${
					bot.users.cache.get("477520800073908232").tag
				}\n${bot.users.cache.get("295579432343568394").tag}\n${
					bot.users.cache.get("290400489701507073").tag
				}`
			);

		return message.channel.send(embed);
	},
};
