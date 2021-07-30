/**
 * NOTES:
 * New update for a RPG is incomming.
 *
 * @format
 */

const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
	name: "deposit",
	description: "Deposit coins to bank.",
	category: "economy",
	usage: "deposit <Str:all> or <Number:amount>",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const member = message.author;
		const { user } = await getUserById(member.id);
		const coins = user.userCoins;
		let amount = args[0];

		if (!amount) {
			return message.channel.send(lang.ECONOMY.DEPOSIT_USAGE);
		}

		if (amount === "all") {
			await updateUserById(member.id, {
				userBank: user.userBank + coins,
				userCoins: user.userCoins - coins,
			});

			return message.channel.send(lang.ECONOMY.DEPOSITED_ALL);
		}

		amount = Number(args[0]);

		if (typeof amount !== "number" || isNaN(amount)) {
			return message.reply(lang.ECONOMY.INVALID_AMOUNT);
		}

		if (message.content.includes("-")) {
			return message.channel.send(lang.ECONOMY.INVALID_AMOUNT);
		}

		if (amount < 0) {
			return message.channel.send(lang.ECONOMY.INVALID_AMOUNT);
		}

		if (coins < amount) {
			return message.channel.send(lang.ECONOMY.NOT_ENOUGH_COINS);
		}

		await updateUserById(member.id, {
			userBank: user.userBank + Number(amount),
			userCoins: user.userCoins - amount,
		});

		message.channel.send(
			lang.ECONOMY.DEPOSITED_AMOUNT.replace("{amount}", amount.toLocaleString())
		);
	},
};
