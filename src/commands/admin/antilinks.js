/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const { updateGuildById } = require("../../utils/functions");

module.exports = {
	name: "antilinks",
	description: "Enable or disable the antiLinks feature.",
	usage: "antilinks <enable:disable>",
	aliases: ["anti-links", "antil", "antilinks"],
	category: "admin",
	memberPermissions: ["ADMINISTRATOR"],
	async execute(bot, message, args) {
		const option = args[0];
		const lang = await bot.getGuildLang(message.guild.id);
		const guildId = message.guild.id;

		if (!args[0])
			return message.channel.send(lang.ADMIN.PLEASE_DISABLE_OR_ENABLE);

		switch (option.toLowerCase()) {
			case "enable":
				updateItem("antiLinksModule", true, guildId);
				message.channel.send(lang.ADMIN.SUCCES_ENABLE_ANTILINKS);
				break;

			case "disable":
				updateItem("antiLinksModule", false, guildId);
				message.channel.send(lang.ADMIN.SUCCES_DISABLE_ANTILINKS);
		}
	},
};

async function updateItem(type, item, guildId) {
	await updateGuildById(guildId, {
		[type]: item,
	});
}
