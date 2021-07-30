/**
 * NOTES:
 * Funny game named "cilen-o-metter" to make fun on discord channel.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
	name: "cilen",
	description: "Cilen-o-metter experiment.",
	category: "trashgang",
	aliases: ["pula", "diku", "ionel", "ilie"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		let member = message.mentions.users.first() || message.author;
		let rate = Math.round(Math.random() * 36);

		 if (message.guild.id !== "546405460811448320")
				return message.channel.send(lang.TRASHGANG.NOT_ALLOWED);

		await message.channel
			.send(
				`Noroc pațanu, **${member.tag}**\nauzi mujiku fără supărări da cilen-o-metteru' azi spune că ai cilenu de \`${rate}\` **cm2**\n\n**Reminder:** vezi ouăle curate, spălate frumos și cât mai des, ponel?`
			)
			.then(function (message) {
				message.react("👍");
			})
			.catch(function () {
				message.channel.send("maladeț pațanu, așa te vreau");
			});
	},
};
