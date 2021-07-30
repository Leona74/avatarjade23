/**
 * NOTES:
 * New dialogs available now.
 *
 * @format
 */

module.exports = {
	name: "nickname",
	description: "Update the current nickname.",
	category: "ownerOnly",
	usage: "nickname <Nickname:str>",
	ownerOnly: true,
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const nickname = args.join(" ");

		message.guild.members.cache
			.get(bot.user.id)
			.setNickname(nickname, lang.OWNER.OWNER_ACTION);

		message.channel.send(
			lang.OWNER.UPDATED_NICKNAME.replace("{nickname}", nickname)
		);
	},
};
