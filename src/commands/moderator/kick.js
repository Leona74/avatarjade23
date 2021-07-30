/**
 * NOTES:
 * Command runs without issues.
 *
 * @format
 */

module.exports = {
	name: "kick",
	description: "Kick a user from the current guild.",
	usage: "kick <User:user_mention> <Str:reason>",
	category: "moderator",
	botPermissions: ["KICK_MEMBERS"],
	memberPermissions: ["KICK_MEMBERS"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const kickUser = bot.findMember(message, args);

		let kickReason = args.join(" ").slice(23);

		if (!kickUser) {
			return message.channel.send(lang.MODERATOR.BAN_USAGE);
		}

		if (!kickReason) kickReason = "N/A";

		if (!kickUser.kickable || kickUser.hasPermission("KICK_MEMBERS")) {
			return message.channel.send(lang.MODERATOR.KICK_NOT_ALLOWED);
		}

		if (
			message.guild.me.roles.highest.comparePositionTo(kickUser.roles.highest) <
			0
		) {
			return message.channel.send(
				lang.MODERATOR.HIGHRANK_BAN.replace("{member}", kickUser.tag)
			);
		}

		kickUser.kick(kickReason);

		message.channel.send(
			lang.MODERATOR.KICK_USER_SUCCES.replace(
				"{user}",
				kickUser.user.username
			).replace("{kick_reason}", kickReason)
		);
	},
};
