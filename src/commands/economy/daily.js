/**
 * NOTES:
 * New update for a RPG is incomming.
 *
 * @format
 */

const { getUserById, updateUserById } = require("../../utils/functions");
const ms = require("ms");

module.exports = {
	name: "daily",
	description: "Get your daily reward.",
	usage: "daily",
	category: "economy",
	async execute(bot, message) {
		const lang = await bot.getGuildLang(message.guild.id);
		const { user } = await getUserById(message.author.id);
		const timeout = 86400000;
		const amount = Math.floor(Math.random() * 500) + 1;
		const daily = user.dailyCooldown;

		if (daily !== null && timeout - (Date.now() - daily) > 0) {
			let time = ms(timeout - (Date.now() - daily), { long: true });

			message.channel.send(
				lang.ECONOMY.DAILY_ERROR.replace("{time}", `${time}`)
			);
		} else {
			updateUserById(message.author.id, {
				dailyCooldown: Date.now(),
				userCoins: user.userCoins + amount,
			});

			message.channel.send(
				lang.ECONOMY.DAILY_SUCCESS.replace("{amount}", amount.toLocaleString())
			);
		}
	},
};
