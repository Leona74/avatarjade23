/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
	name: "randomcolor",
	description: "Raffle a rancom color.",
	category: "general",
	usage: "randomcolor",
	aliases: ["color"],
	execute(bot, message) {
		const color = Math.floor(Math.random() * 16777215).toString(16);
		const preview = `https://api.no-api-key.com/api/v2/color?hex=${color}`;

		const embed = BaseEmbed(message)
			.setThumbnail(preview)
			.setColor(`#${color}`);

		message.channel.send(`#${color}`, embed);
	},
};
