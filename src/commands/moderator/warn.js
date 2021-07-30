/**
 * NOTES:
 * In future verions, the warnings system may contain module such as (3/3 warns for ban).
 *
 * @format
 */

const { getUserById, addWarning } = require("../../utils/functions");

module.exports = {
	name: "warn",
	description: "Give a warn point to a server user.",
	category: "moderator",
	usage: "warn <User:user_mention> <Str:reason>",
	memberPermissions: ["MANAGE_GUILD"],
	botPermissions: ["MANAGE_GUILD"],
	async execute(bot, message, args) {
		let reason = args.join(" ").slice(23);
		const lang = await bot.getGuildLang(message.guild.id);
		const member = bot.findMember(message, args);

		if (!member) {
			return message.channel.send(lang.MODERATOR.BAN_USAGE);
		}

		if (!reason) reason = "N/A";

		if (member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send(lang.MODERATOR.WARN_NOT_ALLOWED);
		}

		await addWarning(member.user.id, message.guild.id, reason);

		const { warnings } = await getUserById(member.user.id, message.guild.id);

		message.channel.send(
			lang.MODERATOR.WARN_USER_SUCCES.replace("{user}", member.user.tag)
				.replace("{reason}", reason)
				.replace("{warns}", warnings ? warnings.length : "0")
		);
	},
};
