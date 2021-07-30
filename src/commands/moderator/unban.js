/** @format */

const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
	name: "unban",
	description: "Unban a user by their id from the current server.",
	category: "moderator",
	usage: "unban <Number:user_id>",
	botPermissions: ["BAN_MEMBERS"],
	memberPermissions: ["BAN_MEMBERS"],
	async execute(bot, message, args) {
		const userId = args[0];
		const lang = await bot.getGuildLang(message.guild.id);

		if (!userId) {
			return message.channel.send(lang.MODERATOR.PROVIDE_BY_ID);
		}

		const bannedUser = await message.guild.members.unban(userId);

		message.channel.send(
			lang.MODERATOR.UNBAN_USER_SUCCES.replace("{member}", bannedUser.username)
		);
	},
};
