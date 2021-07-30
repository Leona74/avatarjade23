/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const { updateGuildById, getGuildById } = require("../../utils/functions");
const categories = require("../../data/categories.json");

module.exports = {
	name: "enable",
	description: "Enable a command or category.",
	category: "exempt",
	usage: "enable <Str:command_name> or <Str:category_name>",
	memberPermissions: ["ADMINISTRATOR"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const option = args[0];
		const guild = await getGuildById(message.guild.id);

		if (!option) {
			return message.channel.send(lang.ADMIN.PROVIDE_COMMAND_OR_CATEGORY_NAME);
		}

		const command =
			bot.commands.get(option.toLowerCase()) ||
			bot.commands.get(bot.aliases.get(option));

		if (!command) {
			const category = option.toLowerCase();
			if (!categories.includes(category)) {
				return message.channel.send(lang.ADMIN.COMMAND_OR_CATEGORY_NOT_FOUND);
			}

			if (!guild.disabledCategories.includes(category)) {
				return message.channel.send(lang.ADMIN.CATEGORY_NOT_DISABLED);
			}

			await updateGuildById(message.guild.id, {
				disabledCategories: guild.disabledCategories.filter(
					(c) => c !== category
				),
			});

			return message.channel.send(
				lang.ADMIN.CATEGORY_ENABLED.replace("{category", category)
			);
		} else {
			if (!command?.name) {
				return message.channel.send(lang.ADMIN.COMMAND_NOT_FOUND);
			}

			if (!guild.disabledCommands.includes(command.name)) {
				return message.channel.send(lang.ADMIN.COMMAND_NOT_DISABLED);
			}

			await updateGuildById(message.guild.id, {
				disabledCommands: guild.disabledCommands.filter(
					(c) => c !== command.name
				),
			});

			return message.channel.send(
				lang.ADMIN.COMMAND_ENABLED.replace("{commandName}", command.name)
			);
		}
	},
};
