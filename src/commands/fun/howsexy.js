/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

module.exports = {
	name: "howsexy",
	description: "Tell's you how sexy are you.",
	usage: "howsexy <User:user_mention>",
	aliases: ["sexy"],
	category: "fun",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		const member = bot.findMember(message, args, true);

		let sexyrate = Math.round(Math.random() * 100);

		return message.channel.send(
			lang.FUN.HOW_SEXY.replace("{author}", member.user.tag).replace(
				"{sexyrate}",
				sexyrate
			)
		);
	},
};
