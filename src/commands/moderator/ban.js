/**
 * TODO:
 * In a future release, we should add a way to change the days for the ban.
 *
 * @format
 */

module.exports = {
	name: "ban",
	description: "Ban a user from the current guild for 7 days.",
	usage: "ban <User:user_mention> <Str:reason>",
	category: "moderator",
	botPermissions: ["BAN_MEMBERS"],
	memberPermissions: ["BAN_MEMBERS"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const banUser = bot.findMember(message, args);
		let banReason = args.join(" ").slice(23);

		if (!banUser) {
			return message.channel.send(lang.MODERATOR.BAN_USAGE);
		}
		if (!banReason) banReason = "N/A";

		if (!banUser.bannable || banUser.hasPermission("BAN_MEMBERS")) {
			return message.channel.send(lang.MODERATOR.BAN_NOT_ALLOWED);
		}

		if (
			message.guild.me.roles.highest.comparePositionTo(banUser.roles.highest) <
			0
		) {
			return message.channel.send(
				lang.MODERATOR.HIGHRANK_BAN.replace("{member}", banUser.tag)
			);
		}

		banUser.ban({ days: 7, reason: banReason });

		message.channel.send(
			lang.MODERATOR.BAN_USER_SUCCES.replace(
				"{member}",
				banUser.user.username
			).replace("{ban_reason}", banReason)
		);
	},
};
