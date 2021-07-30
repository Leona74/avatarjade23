/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");
const { WebhookClient } = require("discord.js");

module.exports = {
	name: "bugreport",
	description: "Report a bug to staffMembers.",
	usage: "bugreport <Str:text>",
	category: "general",
	cooldown: 250,
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const bug = args.join(" ");

		if (!bug) {
			return message.channel.send(lang.GENERAL.BUG_REPORT_USAGE);
		}

		const webhookIntegration = new WebhookClient(
			"797955510342909972",
			"Ljveo4l8Iv0JKeaEdxwtO8ZrqVXgxz7enntfsiM18mMvQ0gLrEqLWec5d5S6FFEOwqtC"
		);

		const embed = BaseEmbed(message)
			.addField(`Author:`, message.author.tag)
			.addField(`Bug Description:`, bug)
			.setThumbnail("https://www.charliewave.me/favicon.ico")
			.setColor("#36393e");

		webhookIntegration.send({
			username: "chàrlie",
			avatarURL: "https://www.charliewave.me/favicon.ico",
			embeds: [embed],
		});
		return message.channel.send(lang.GENERAL.BUG_REPORTED);
	},
};
