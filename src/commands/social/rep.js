/**
 * NOTES:
 * Command runs without issues.
 *
 * @format
 */

const { getUserById, updateUserById } = require("../../utils/functions");
const ms = require("ms");

module.exports = {
	name: "rep",
	description: "Give a reputation point to a mentioned user.",
	usage: "rep <User:user_mention>",
	category: "social",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const member = bot.findMember(message, args, true);
		const timeout = 86400000;
		const amount = 1;
		const { user } = await getUserById(message.author.id);
		const rep = user.repCooldown;

		const { user: receiver } = await getUserById(member.id);
		const { user: sender } = await getUserById(message.author.id);

		if (!member) {
			return message.channel.send(lang.ECONOMY.CANNOT_REP_SELF);
		}

		if (receiver.user_id === sender.user_id) {
			return message.channel.send(lang.ECONOMY.CANNOT_REP_SELF);
		}

		if (rep !== null && timeout - (Date.now() - rep) > 0) {
			let time = ms(timeout - (Date.now() - rep), { long: true });

			message.channel.send(
				lang.ECONOMY.RECENTLY_REP.replace("{time}", `${time}`)
			);
		} else {
			updateUserById(member.id, {
				userReps: receiver.userReps + amount,
			});

			updateUserById(message.author.id, {
				repCooldown: Date.now(),
			});

			message.channel.send(
				lang.ECONOMY.REP_MESSAGE.replace("{user}", member.user.tag)
			);
		}
	},
};
