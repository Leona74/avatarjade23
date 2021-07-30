/**
 * NOTES:
 * New update for a RPG is incomming.
 *
 * @format
 */

const { getUserById } = require("../../utils/functions");

module.exports = {
	name: "balance",
	description: "Check the balance for economy system.",
	category: "economy",
	usage: "balance <User:user_mention>",
	aliases: ["bal", "coins"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const member = bot.findMember(message, args, true);

		if (member.user.bot) {
			return message.channel.send(lang.GENERAL.NO_DATA);
		}

		const { user } = await getUserById(member.id);

		let total_amount = user.userBank + user.userCoins;

		message.channel.send(
			lang.ECONOMY.BALANCE_STATUS.replace("{user}", member.user.tag)
				.replace("{coins}", user.userCoins.toLocaleString())
				.replace("{bank}", user.userBank.toLocaleString())
				.replace("{total}", total_amount.toLocaleString())
		);
	},
};
