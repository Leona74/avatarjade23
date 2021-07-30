/**
 * NOTES:
 * Command may be renamed in future.
 *
 * @format
 */

const { updateUserById } = require("../../utils/functions");

module.exports = {
	name: "setbio",
	description: "Set your own bio for your personal profile.",
	usage: "bio <Str:text>",
	category: "social",
	aliases: ["bio"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		if (!args[0]) return message.channel.send(lang.ECONOMY.SETBIO);
		if (message.content.includes("discord.gg/" || "discordapp.com/invite/"))
			return message.channel.send(lang.ECONOMY.BIO_NO_LINKS);

		if (args[0]) {
			updateUserById(message.author.id, {
				userBio: args.join(" "),
			});

			await message.channel.send(lang.ECONOMY.SUCCES_BIO);
		}
	},
};
