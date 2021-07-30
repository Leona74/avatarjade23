/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const DIG = require("discord-image-generation");
const Discord = require("discord.js");

module.exports = {
	name: "jail",
	description: "Create a jail image.",
	usage: "jail <User:user_mention>",
	category: "fun",
	async execute(bot, message, args) {
		const member = bot.findMember(message, args, true);

		let avatar = member.user.displayAvatarURL({
			dynamic: false,
			format: "png",
		});

		let img = await new DIG.Jail().getImage(avatar);

		let attachment = new Discord.MessageAttachment(img, "jail.png");

		message.channel.send(attachment);
	},
};
