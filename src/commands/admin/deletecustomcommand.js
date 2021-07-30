/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const { getGuildById, updateGuildById } = require("../../utils/functions");

module.exports = {
	name: "deletecustomcommand",
	usage: "deletecustomcommand <Str:command_name>",
	description: "Delete an active custom command for this guild.",
	category: "admin",
	aliases: ["delcmd"],
	memberPermissions: ["ADMINISTRATOR"],
	async execute(bot, message, args) {
		const cmdName = args[0];
		const guild = await getGuildById(message.guild.id);
		const lang = await bot.getGuildLang(message.guild.id);
		const commands = guild?.customCommands;

		if (!cmdName) {
			return message.channel.send(
				lang.ADMIN.DELCMDUSAGE.replace("{prefix}", guild.prefix)
			);
		}

		if (commands) {
			const data = commands.find((cmd) => cmd.name === cmdName.toLowerCase());

			if (!data) {
				return message.channel.send(lang.ADMIN.NOT_FOUND_CUSTOM_COMMAND);
			}

			const filtered = commands.filter(
				(cmd) => cmd.name !== cmdName.toLowerCase()
			);

			await updateGuildById(message.guild.id, {
				customCommands: filtered,
			});

			return message.channel.send(
				lang.ADMIN.SUCCES_CUSTOM_COMMAND_DELETE.replace("{command}", cmdName)
			);
		} else {
			return message.channel.send(lang.ADMIN.GUILD_NO_CUSTOM_COMMANDS);
		}
	},
};
