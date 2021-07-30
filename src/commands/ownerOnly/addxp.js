/**
 * Create to add or remove custom values in database.
 *
 * @format
 */

const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
	name: "addxp",
	description: "Add xp values to database.",
	usage: "addxp <User:user_mention> <Number:amount>",
	category: "ownerOnly",
	ownerOnly: true,
	async execute(bot, message, args) {
		const member = bot.findMember(message, args);
		const lang = await bot.getGuildLang(message.guild.id);
		const amount = args[1];

		if (!member) {
			return message.channel.send(lang.MODERATOR.BAN_USAGE);
		}

		if (member.user.bot) {
			return message.channel.send(lang.GENERAL.NO_DATA);
		}

		if (!amount) {
			return message.channel.send(lang.GENERAL.PROVIDE_A_AMOUNT);
		}

		const { user } = await getUserById(member.user.id);
		await updateUserById(member.user.id, {
			userXp: user.userXp + Number(amount),
		});

		return message.channel.send(
			lang.GENERAL.SUCCES_XP_ADDED.replace(
				"{amount}",
				amount.toLocaleString()
			).replace("{user}", member.user.tag)
		);
	},
};
