/**
 * NOTES:
 * In a future update, we may should add more informations related to xp levels system.
 *
 * @format
 */

const { getUserById } = require("../../utils/functions");

module.exports = {
	name: "xp",
	description: "Xp status for user's profile.",
	category: "levels",
	usage: "xp <User:user_mention>",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const member = await bot.findMember(message, args, true);

		if (member.user.bot) {
			return message.channel.send(lang.GENERAL.NO_DATA);
		}

		const { user } = await getUserById(member.id);

		message.channel.send(
			lang.GENERAL.LEVEL_USER.replace("{user}", member.user.tag).replace(
				"{xp}",
				user.userXp.toLocaleString()
			)
		);
	},
};
