/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

module.exports = {
	name: "howgay",
	description: "Tell's you how gay are you.",
	usage: "howgay <User:user_mention.>",
	aliases: ["gay"],
	category: "fun",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		const member = bot.findMember(message, args, true);

		let gayrate = Math.round(Math.random() * 100);

		return message.channel.send(
			lang.FUN.HOW_GAY.replace("{author}", member.user.tag).replace(
				"{gayrate}",
				gayrate
			)
		);
	},
};
