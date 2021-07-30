/**
 * NOTES:
 * In a future update, we should add more methods for getting the data.
 *
 * @format
 */

const { getUserById, calculateUserXp } = require("../../utils/functions");
const Canvas = require("canvas");
const ssn = require("short-string-number");
const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");

module.exports = {
	name: "level",
	description: "Get your current level",
	usage: "level <User:user_mention>",
	category: "levels",
	cooldown: 5,
	aliases: ["lvl", "rank"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const member = bot.findMember(message, args, true);

		if (member.user.bot) {
			return message.channel.send(lang.GENERAL.NO_DATA);
		}

		const { user } = await getUserById(member.id);

		const level = calculateUserXp(user.userXp);

		var minxp = (level * level) / 0.01;
		var maxxp = ((level + 1) * (level + 1)) / 0.01;

		const canvas = Canvas.createCanvas(1026, 285);
		const ctx = canvas.getContext("2d");

		const backgroundLevel = fs.readFileSync(
			path.join(__dirname, "..", "..", "assets", "level.png")
		);

		const background = await Canvas.loadImage(backgroundLevel);

		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.strokeStyle = "#555555";
		ctx.globalAlpha = 1;
		ctx.fillStyle = "#555555";
		ctx.fillRect(0, 270, 1026, 20);
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.strokeReact = (0, 270, 1026, 20);
		ctx.stroke();

		ctx.fillStyle = "#fcbf60";
		ctx.globalAlpha = 1;
		ctx.fillRect(0, 270, ((user.userXp - minxp) / (maxxp - minxp)) * 1026, 20);
		ctx.fill();
		ctx.globalAlpha = 1;

		ctx.font = "25px Arial";
		ctx.textAlign = "center";
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText(`${ssn(user.userXp)}/${ssn(maxxp)}`, 780, 160);

		ctx.textAlign = "center";
		ctx.font = "bold 25px Arial";
		ctx.fillStyle = "#fcbf60";
		ctx.fillText(`XP`, 780, 140);

		ctx.textAlign = "center";
		ctx.font = "bold 25px Arial";
		ctx.fillStyle = "#fcbf60";
		ctx.fillText(`LEVEL`, 580, 140);

		ctx.font = "25px Arial";
		ctx.textAlign = "center";
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText(`${level}`, 580, 160);

		ctx.font = "bold 32px Arial";
		ctx.fillStyle = "#fcbf60";
		ctx.textAlign = "left";
		ctx.fillText(`${member.user.username}`, 380, 140);

		ctx.font = "24px Arial";
		ctx.fillStyle = "#FFFFFF";
		ctx.textAlign = "left";
		ctx.fillText(`#${member.user.discriminator}`, 380, 160);

		ctx.arc(170, 135, 125, 0, Math.PI * 2, true);
		ctx.lineWidth = 6;
		ctx.strokeStyle = "#fcbf60";
		ctx.stroke();
		ctx.closePath();
		ctx.clip();

		const avatar = await Canvas.loadImage(
			member.user.displayAvatarURL({ format: "png" })
		);
		ctx.drawImage(avatar, 45, 10, 250, 250);

		const attachment = new Discord.MessageAttachment(
			canvas.toBuffer(),
			"rankcard.png"
		);

		message.channel.send(attachment);
	},
};
