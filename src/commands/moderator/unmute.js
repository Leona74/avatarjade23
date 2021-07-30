/**
 * TODO:
 * New mute/unmute system connected to database.
 *
 * @format
 */

module.exports = {
	name: "unmute",
	description: "Unmute a muted guild user.",
	category: "moderator",
	usage: "unmute <User:User_mention>",
	botPermissions: ["MANAGE_ROLES"],
	memberPermissions: ["MANAGE_ROLES"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const mutedUser = bot.findMember(message, args);

		if (!mutedUser) return message.channel.send(lang.MODERATOR.BAN_USAGE);

		const mutedRole = message.guild.roles.cache.find((r) => r.name === "muted");

		if (!mutedUser.roles.cache.some((r) => r.name === "muted"))
			return message.channel.send(lang.MODERATOR.USER_NOT_MUTED);

		mutedUser.roles.remove(mutedRole);

		message.channel.send(
			lang.MODERATOR.UNMUTE_USER_SUCCES.replace("{member}", mutedUser)
		);
	},
};
