/** @format */

const DIG = require("discord-image-generation");
const Discord = require("discord.js");

module.exports = {
	name: "triggered",
	description: "Create a triggered image.",
	usage: "triggered <User:user_mention>",
	category: "fun",
	async execute(bot, message, args) {
		const member = bot.findMember(message, args, true);

		let avatar = member.user.displayAvatarURL({
			dynamic: false,
			format: "png",
		});

		let img = await new DIG.Triggered().getImage(avatar);

		let attachment = new Discord.MessageAttachment(img, "triggered.gif");

		message.channel.send(attachment);
	},
};
