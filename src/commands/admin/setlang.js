/**
 * NOTES:
 * Setlang command contains new future updates.
 *
 * @format
 */

const { updateGuildById } = require("../../utils/functions");

module.exports = {
	name: "setlang",
	description: "Set another available language for the system.",
	category: "admin",
	usage: "setlang <Str:language>",
	memberPermissions: ["ADMINISTRATOR"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const languages = bot.getLanguages();
		const guildId = message.guild.id;
		const language = args[0];

		if (!language) {
			return message.channel.send(
				lang.ADMIN.PROVIDE_A_LANGUAGE.replace(
					"{languages}",
					languages.map((l) => `\`${l}\``).join(", ")
				)
			);
		}
		if (!languages.includes(language)) {
			return message.channel.send(
				lang.ADMIN.INVALID_LANGUAGE.replace(
					"{languages}",
					languages.map((l) => `\`${l}\``).join(", ")
				)
			);
		}

		updateItem("locale", language, guildId);
		message.channel.send(
			lang.ADMIN.SUCCES_LANGUAGE_EDIT.replace("{language}", language)
		);

		async function updateItem(type, item, guildId) {
			await updateGuildById(guildId, {
				[type]: item,
			});
		}
	},
};
