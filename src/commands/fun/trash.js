/** @format */

const DIG = require("discord-image-generation");
const Discord = require("discord.js");

module.exports = {
	name: "trash",
	description: "Create a trash image.",
	usage: "trash <User:user_mention>",
	category: "fun",
	async execute(bot, message, args) {
		const member = bot.findMember(message, args, true);

		let avatar = member.user.displayAvatarURL({
			dynamic: false,
			format: "png",
		});

		let img = await new DIG.Trash().getImage(avatar);

		let attachment = new Discord.MessageAttachment(img, "trash.png");

		message.channel.send(attachment);
	},
};
