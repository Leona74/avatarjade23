/**
 * NOTES:
 * New update for a RPG is incomming.
 *
 * @format
 */

const ms = require("ms");
const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
	name: "rob",
	description: "Rob users and earn money.",
	usage: "rob <User:user_mention>",
	category: "economy",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const member = await bot.findMember(message, args);
		const amount = Math.floor(Math.random() * 300) + 1;
		const timeout = 1800000;

		const { user } = await getUserById(message.author.id);
		const robcooldown = user.robCooldown;

		if (robcooldown !== null && timeout - (Date.now() - robcooldown) > 0) {
			let time = ms(timeout - (Date.now() - robcooldown), { long: true });

			message.channel.send(
				lang.ECONOMY.RECENTLY_ROBBED.replace("{time}", `${time}`)
			);
		} else {
			if (!member) {
				return message.channel.send(lang.MODERATOR.BAN_USAGE);
			}

			if (member.user.bot) {
				return message.channel.send(lang.MODERATOR.BOT_DATA);
			}

			if (member.user.id === message.author.id) {
				return message.channel.send(lang.ECONOMY.CANNOT_ROB_SELF);
			}

			const userId = member.user.id;
			const { user } = await bot.getUserById(userId);
			const { user: robber } = await bot.getUserById(message.author.id);

			if (user.userCoins <= 0) {
				return message.channel.send(lang.ECONOMY.MEMBER_NO_MONEY);
			}

			await updateUserById(userId, {
				userCoins: user.userCoins - amount,
			});
			await updateUserById(message.author.id, {
				userCoins: robber.userCoins + Number(amount),
				robCooldown: Date.now(),
			});

			return message.channel.send(
				lang.ECONOMY.ROB_SUCCESS.replace("{amount}", amount).replace(
					"{member}",
					member.user.tag
				)
			);
		}
	},
};
