/** @format */

const BaseEmbed = require("../../modules/BaseEmbed");
const DiscordPages = require("discord-pages");
const { stripIndents } = require("common-tags");

module.exports = {
	name: "lapliaj",
	description: "trashgang 歲",
	category: "trashgang",
	aliases: ["lapliaja", "beach", "pliaj"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		const skillzl = new BaseEmbed(message).setImage(
			"https://cdn.discordapp.com/attachments/789862793846325248/870624669034754078/WhatsApp_Image_2021-07-16_at_09.27.47.jpeg"
		);

		const mqr = new BaseEmbed(message).setImage(
			"https://cdn.discordapp.com/attachments/789862793846325248/870624723413893159/WhatsApp_Image_2021-07-16_at_09.28.19.jpeg"
		);

		const genius = new BaseEmbed(message).setImage(
			"https://cdn.discordapp.com/attachments/789862793846325248/870624762320285716/WhatsApp_Image_2021-07-16_at_09.28.23.jpeg"
		);
		const chill = new BaseEmbed(message).setImage(
			"https://cdn.discordapp.com/attachments/789862793846325248/870624837079535627/WhatsApp_Image_2021-07-16_at_09.28.35.jpeg"
		);

		const brockencat = new BaseEmbed(message).setImage(
			"https://cdn.discordapp.com/attachments/789862793846325248/870624891446100028/WhatsApp_Image_2021-07-16_at_09.28.34.jpeg"
		);

		const igor = new BaseEmbed(message).setImage(
			"https://cdn.discordapp.com/attachments/789862793846325248/870624943233175562/WhatsApp_Image_2021-07-16_at_09.28.24.jpeg"
		);

		const marshel = new BaseEmbed(message).setImage(
			"https://cdn.discordapp.com/attachments/789862793846325248/870625216529858580/WhatsApp_Image_2021-07-16_at_09.28.22.jpeg"
		);

		const grisha = new BaseEmbed(message).setImage(
			"https://cdn.discordapp.com/attachments/789862793846325248/870625316199092244/WhatsApp_Image_2021-07-16_at_09.28.29.jpeg"
		);

		const grishabalon = new BaseEmbed(message).setImage(
			"https://cdn.discordapp.com/attachments/789862793846325248/870625439230611466/WhatsApp_Image_2021-07-16_at_09.28.33.jpeg"
		);

		const danneb = new BaseEmbed(message).setImage(
			"https://cdn.discordapp.com/attachments/789862793846325248/870625610807013396/WhatsApp_Image_2021-07-16_at_09.27.45.jpeg"
		);

		const pages = [
			skillzl,
			mqr,
			genius,
			chill,
			brockencat,
			igor,
			marshel,
			grisha,
			grishabalon,
			danneb,
		];

		// if (message.guild.id !== "546405460811448320")
		// return message.channel.send(lang.TRASHGANG.NOT_ALLOWED);

		const embedPages = new DiscordPages({
			pages: pages,
			channel: message.channel,
		});
		embedPages.createPages();
	},
};
