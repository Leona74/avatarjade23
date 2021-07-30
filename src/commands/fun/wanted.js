/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const Canvas = require("canvas");
const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");

module.exports = {
	name: "wanted",
	description: "Create a wanted meme image.",
	usage: "wanted <User:user_mention>",
	category: "fun",
	async execute(bot, message, args) {
		const canvas = Canvas.createCanvas(630, 680);
		const ctx = canvas.getContext("2d");


		const backgroundWanted = fs.readFileSync(
			path.join(__dirname, "..", "..", "assets", "wanted.png")
		);

		const bg = await Canvas.loadImage(backgroundWanted);
		ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

		const member = bot.findMember(message, args, true);

		const avatar = await Canvas.loadImage(
			member.user.displayAvatarURL({ format: "png" })
		);
		ctx.drawImage(avatar, 199, 210, 231, 227);

		const attachment = new Discord.MessageAttachment(
			canvas.toBuffer(),
			"wanted.png"
		);

		return message.channel.send(attachment);
	},
};
