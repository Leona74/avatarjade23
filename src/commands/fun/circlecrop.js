/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const DIG = require("discord-image-generation");
const Discord = require("discord.js");

module.exports = {
	name: "circlecrop",
	description: "Create an circle crop image.",
	usage: "circlecrop <User:user_mention>",
	category: "fun",
	async execute(bot, message, args) {
		const member = bot.findMember(message, args, true);

		let avatar = member.user.displayAvatarURL({
			dynamic: false,
			format: "png",
		});

		let img = await new DIG.Circle().getImage(avatar);

		let attachment = new Discord.MessageAttachment(img, "circlecrop.png");

		message.channel.send(attachment);
	},
};
