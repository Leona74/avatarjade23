/**
 * NOTES:
 * New update for a RPG is incomming.
 *
 * @format
 */

const { getUserById, updateUserById } = require("../../utils/functions");
const ms = require("ms");

module.exports = {
	name: "weekly",
	description: "Get your weekly reward.",
	usage: "weekly",
	category: "economy",
	async execute(bot, message) {
		const lang = await bot.getGuildLang(message.guild.id);
		const { user } = await getUserById(message.author.id);
		const timeout = 60 * 60 * 1000 * 24 * 7;
		const amount = Math.floor(Math.random() * 1500) + 1;
		const currentCoins = user.userCoins;
		const weekly = user.weeklyCooldown;

		if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
			let time = ms(timeout - (Date.now() - weekly), { long: true });

			message.channel.send(
				lang.ECONOMY.WEEKLY_ERROR.replace("{time}", `${time}`)
			);
		} else {
			await updateUserById(message.author.id, {
				userCoins: currentCoins + amount,
				weeklyCooldown: Date.now(),
			});

			message.channel.send(
				lang.ECONOMY.WEEKLY_SUCCESS.replace("{amount}", amount.toLocaleString())
			);
		}
	},
};
