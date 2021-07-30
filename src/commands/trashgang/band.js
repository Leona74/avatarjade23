/** @format */

const BaseEmbed = require("../../modules/BaseEmbed");
const DiscordPages = require("discord-pages");
const { stripIndents } = require("common-tags");

module.exports = {
	name: "band",
	description: "trashgang 歲",
	category: "trashgang",
	aliases: ["irl", "gang", "trupa", "debilii"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		const skillzl = new BaseEmbed(message)
			.setImage(
				"https://cdn.discordapp.com/attachments/789862793846325248/870616426535329832/skillzl.png"
			)
			.setDescription(
				`**pulimiotCatalincik** (${
					bot.users.cache.get("565960314970177556").tag
				})`
			);

		const mqr = new BaseEmbed(message)
			.setImage(
				"https://cdn.discordapp.com/attachments/789862793846325248/870616590356471808/mqr.png"
			)
			.setDescription(
				`**mkiurius** (${bot.users.cache.get("477520800073908232").tag})`
			);

		const genius = new BaseEmbed(message)
			.setImage(
				"https://cdn.discordapp.com/attachments/789862793846325248/870616822322450442/genius.png"
			)
			.setDescription(
				`**iancik** (${bot.users.cache.get("295579432343568394").tag})`
			);

		const chill = new BaseEmbed(message)
			.setImage(
				"https://cdn.discordapp.com/attachments/789862793846325248/870617650026381333/chill.png"
			)
			.setDescription(
				`**marius micu** (${bot.users.cache.get("462294547855048714").tag})`
			);

		const brockencat = new BaseEmbed(message)
			.setImage(
				"https://cdn.discordapp.com/attachments/789862793846325248/870617326767206400/brockencat.png"
			)
			.setDescription(
				`**dani** (${bot.users.cache.get("360017810925027329").tag})`
			);

		const igor = new BaseEmbed(message)
			.setImage(
				"https://cdn.discordapp.com/attachments/789862793846325248/870617919900516382/igor.png"
			)
			.setDescription(
				`**igorash** (${bot.users.cache.get("567798000408199169").tag})`
			);

		const marshel = new BaseEmbed(message)
			.setImage(
				"https://cdn.discordapp.com/attachments/789862793846325248/870618359593574430/marshel.png"
			)
			.setDescription(
				`**danu** (${bot.users.cache.get("339859096238817281").tag})`
			);

		const grisha = new BaseEmbed(message)
			.setImage(
				"https://cdn.discordapp.com/attachments/789862793846325248/870618198859452416/grisha.png"
			)
			.setDescription(
				`**grishanea** (${bot.users.cache.get("853674297007276072").tag})`
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
		];

		if (message.guild.id !== "546405460811448320")
			return message.channel.send(lang.TRASHGANG.NOT_ALLOWED);

		const embedPages = new DiscordPages({
			pages: pages,
			channel: message.channel,
		});
		embedPages.createPages();
	},
};
