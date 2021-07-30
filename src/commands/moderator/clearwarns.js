/**
 * NOTES:
 * In future verions, the warnings system may contain module such as (3/3 warns for ban).
 *
 * @format
 */

const { getUserById, removeUserWarnings } = require("../../utils/functions");

module.exports = {
	name: "clearwarns",
	description: "Deletes all metioned user's warnings.",
	usage: "clearwarns <User:user_mention>",
	category: "moderator",
	memberPermissions: ["MANAGE_GUILD"],
	botPermissions: ["MANAGE_GUILD"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		const member = bot.findMember(message, args);
		const guildId = message.guild.id;

		if (!member) {
			return message.channel.send(lang.MODERATOR.BAN_USAGE);
		}

		if (member.user.bot) {
			return message.channel.send(lang.MODERATOR.BOT_DATA);
		}

		const { warnings } = await getUserById(member.user.id, message.guild.id);

		if (!warnings[0]) {
			return message.channel.send(lang.MODERATOR.NO_WARNS);
		}

		await removeUserWarnings(member.user.id, guildId);

		return message.channel.send(
			lang.MODERATOR.REMOVED_ALL_WARNINGS.replace("{user}", member.user.tag)
		);
	},
};
