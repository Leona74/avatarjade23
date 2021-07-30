/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const { getGuildById, updateGuildById } = require("../../utils/functions");

module.exports = {
	name: "addcustomcommand",
	usage: "addcustomcommand <Str:command_name> <Str:command_response>",
	description: "Create a new custom command for this guild.",
	aliases: ["addcmd"],
	category: "admin",
	memberPermissions: ["ADMINISTRATOR"],
	async execute(bot, message, args) {
		const cmdName = args[0];
		const cmdResponse = args.slice(1).join(" ");
		const guild = await getGuildById(message.guild.id);
		const prefix = guild.prefix;
		const lang = await bot.getGuildLang(message.guild.id);

		if (!cmdName) {
			return message.channel.send(
				lang.ADMIN.ADD_COMMAND_USAGE.replace("{prefix}", prefix)
			);
		}

		if (!cmdResponse) {
			return message.channel.send(
				lang.ADMIN.ADD_COMMAND_USAGE.replace("{prefix}", prefix)
			);
		}

		const commands = guild?.customCommands;

		if (commands && commands.find((x) => x.name === cmdName.toLowerCase())) {
			return message.channel.send(lang.ADMIN.CUSTOM_COMMAND_ALREADY_EXISTS);
		}

		if (bot.commands.has(cmdName)) {
			return message.channel.send(lang.ADMIN.COMMAND_CHARLIEWAVE);
		}

		const data = {
			name: cmdName.toLowerCase(),
			response: cmdResponse,
		};

		if (!commands) {
			await updateGuildById(message.guild.id, { customCommands: [data] });
		} else {
			await updateGuildById(message.guild.id, {
				customCommands: [...commands, data],
			});
		}

		return message.channel.send(
			lang.ADMIN.SUCCES_CUSTOM_COMMAND.replace(
				"{command}",
				cmdName.toLowerCase()
			)
		);
	},
};
