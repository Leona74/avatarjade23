/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
	name: "servericon",
	description: "Provide the server icon image.",
	usage: "servericon",
	aliases: ["svicon", "svi"],
	category: "general",
	async execute(bot, message) {
		const lang = await bot.getGuildLang(message.guild.id);
		const icon = message.guild.iconURL({ dynamic: true, size: 2048 });

		if (icon === null) {
			message.channel.send(lang.GENERAL.GUILD_NO_ICON);
		} else {
			const embed = BaseEmbed(message)
				.setTitle(
					`${message.guild.name} <:charliewave_onlineglobe:779089847729389578>`
				)
				.setImage(icon)
				.setDescription(`[.webp](${icon})`);

			message.channel.send(embed);
		}
	},
};
