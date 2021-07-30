/**
 * NOTES:
 * New update for a RPG is incomming.
 *
 * @format
 */

const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
	name: "withdraw",
	description: "Withdraw coins from your bank.",
	category: "economy",
	usage: "withdraw <all | amount>",
	aliases: ["with"],
	requiredArgs: ["amount"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const member = message.author;
		const { user } = await getUserById(member.id);
		const bank = user.userBank;
		let amount = args[0];

		if (!amount) {
			return message.channel.send(lang.ECONOMY.DEPOSIT_USAGE);
		}

		if (amount === "all") {
			updateUserById(member.id, {
				coins: user.userCoins + bank,
				bank: user.userBank - bank,
			});
			return message.channel.send(lang.ECONOMY.WITHDRAW_ALL);
		}

		amount = Number(args[0]);

		if (typeof amount !== "number" || isNaN(amount)) {
			return message.channel.send(lang.ECONOMY.INVALID_AMOUNT);
		}

		if (amount < 0) {
			return message.channel.send(lang.ECONOMY.INVALID_AMOUN);
		}

		if (bank < amount) {
			return message.channel.send(lang.ECONOMY.NOT_ENOUGH_COINS);
		}

		await updateUserById(member.id, {
			userCoins: user.userCoins + Number(amount),
			userBank: user.userBank - amount,
		});

		message.channel.send(
			lang.ECONOMY.WITHDRAW_AMOUNT.replace("{amount}", amount)
		);
	},
};
