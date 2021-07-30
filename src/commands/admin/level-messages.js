/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const { updateGuildById } = require("../../utils/functions");

module.exports = {
	name: "level-messages",
	description: "Enable or disable the level up message.",
	usage: "level-messages",
	aliases: ["lvlmsg"],
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
				updateItem("levelUpModule", true, guildId);
				message.channel.send(lang.ADMIN.SUCCES_ENABLE_MSGS);
				break;

			case "disable":
				updateItem("levelUpModule", false, guildId);
				message.channel.send(lang.ADMIN.SUCCES_DISABLE_MSGS);
		}
	},
};

async function updateItem(type, item, guildId) {
	await updateGuildById(guildId, {
		[type]: item,
	});
}
