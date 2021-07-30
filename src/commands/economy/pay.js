/**
 * NOTES:
 * New update for a RPG is incomming.
 *
 * @format
 */

const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
	name: "pay",
	description: "Transfer coins to another user.",
	usage: "",
	category: "economy",
	aliases: ["transfer"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const member = bot.findMember(message, args);
		const amount = Number(args[1]);

		if (!member) {
			return message.channel.send(lang.MODERATOR.BAN_USAGE);
		}

		if (member.user.bot) {
			return message.channel.send(lang.GENERAL.NO_DATA);
		}

		if (!amount || isNaN(amount)) {
			return message.channel.send(lang.ECONOMY.DEPOSIT_USAGE);
		}

		const fee = Math.round(args[1] - args[1] * 0.729);
		const { user: receiver } = await getUserById(member.id);
		const { user: sender } = await getUserById(message.author.id);

		const coinsGiven = amount - fee;

		if (amount < 0) {
			return message.channel.send(lang.ECONOMY.INVALID_AMOUNT);
		}

		if (amount > sender.userCoins) {
			return message.channel.send(lang.ECONOMY.NOT_ENOUGH_COINS);
		}

		if (message.content.includes("-")) {
			return message.channel.send(lang.ECONOMY.INVALID_AMOUNT);
		}

		if (receiver.userId === sender.userId) {
			return message.channel.send(lang.ECONOMY.CANNOT_PAY_SELF);
		}

		await updateUserById(member.id, {
			userCoins: receiver.userCoins + coinsGiven,
		});
		await updateUserById(message.author.id, {
			userCoins: sender.userCoins - amount,
		});

		return message.channel.send(
			lang.ECONOMY.PAY_SUCCESS.replace("{author}", message.author.tag)
				.replace("{amount}", amount.toLocaleString())
				.replace("{fee}", fee)
				.replace("{receiver}", member.user.tag)
				.replace("{to100}", Math.round((1 - 0.729) * 100))
		);
	},
};
