/**
 * NOTES:
 * In future verions, the warnings system may contain module such as (3/3 warns for ban).
 *
 * @format
 */

const { getUserById } = require("../../utils/functions");

module.exports = {
	name: "warnings",
	description: "Fetch database and show available warns for a mentioned user.",
	usage: "warnings <User:user_mention>",
	category: "moderator",
	memberPermissions: ["MANAGE_GUILD"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const member = bot.findMember(message, args);

		if (!member) {
			return message.channel.send(lang.MODERATOR.BAN_USAGE);
		}
		const { warnings } = await getUserById(member.user.id, message.guild.id);

		message.channel.send(
			lang.MODERATOR.WARNS_ACHIEVED.replace(
				"{warns}",
				warnings ? warnings.length : "0"
			).replace("{member}", member.user.tag)
		);
	},
};
