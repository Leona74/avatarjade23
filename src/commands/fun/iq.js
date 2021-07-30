/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

module.exports = {
	name: "iq",
	description: "Tell's what's your iq.",
	usage: "iq <User:user_mention>",
	aliases: ["mind", "mindlevel"],
	category: "fun",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		const member = bot.findMember(message, args, true);

		let mindlevel = Math.round(Math.random() * 250);

		return message.channel.send(
			lang.FUN.IQ.replace("{author}", member.user.tag).replace(
				"{iqrate}",
				mindlevel
			)
		);
	},
};
