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
	name: "rip",
	description: "Create a rip meme image.",
	usage: "rip <User:user_mention>",
	category: "fun",
	async execute(bot, message, args) {
		const canvas = Canvas.createCanvas(630, 680);
		const ctx = canvas.getContext("2d");

		const backgroundRip = fs.readFileSync(
			path.join(__dirname, "..", "..", "assets", "rip.png")
		);

		const bg = await Canvas.loadImage(backgroundRip);
		ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

		const member = bot.findMember(message, args, true);

		const name = member.user.username;

		ctx.font = `bold 60px sans-serif`;
		ctx.fillStyle = `#546880`;
		ctx.fillText(`${name}`, 232, 234, 234);

		const avatar = await Canvas.loadImage(
			member.user.displayAvatarURL({ format: "png" })
		);
		ctx.drawImage(avatar, 210, 256, 231, 227);

		const attachment = new Discord.MessageAttachment(
			canvas.toBuffer(),
			"rip.png"
		);

		return message.channel.send(attachment);
	},
};
