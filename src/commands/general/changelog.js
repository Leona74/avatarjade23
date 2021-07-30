/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");
const { stripIndents } = require("common-tags");

module.exports = {
	name: "changelog",
	description: "Returns the last commits on bot.",
	category: "general",
	aliases: ["updates", "update", "changes", "lastcommit"],
	async execute(bot, message, args) {
		const embed = BaseEmbed(message)
			.setAuthor(
				`skillzl <user@skillzl.me>`,
				"https://cdn.discordapp.com/avatars/565960314970177556/9d066aec04276ddab7d02df2c165959e.png?size=1024"
			)
			.setDescription(
				stripIndents`
			**[[client/main] 1 new commit](https://github.com/charliewave-me/client/commit/)**

			\`log:\` general commands improves, added discord-pages@1.0.2
			`
			)
			.setFooter(`commited: 30-07-2021, 11:28:40 am`);

		return message.channel.send(embed);
	},
};
