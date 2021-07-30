/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const { updateGuildById, getGuildById } = require("../../utils/functions");
const categories = require("../../data/categories.json");

module.exports = {
	name: "disable",
	description: "Disable a command or category.",
	category: "exempt",
	usage: "disable <Str:command_name> or <Str:category_name>",
	memberPermissions: ["ADMINISTRATOR"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const option = args[0];

		const saveCommands = ["help", "enable", "disable", "setprefix"];
		const saveCategories = ["ownerOnly", "exempt", "disabled", "custom"];
		const guild = await getGuildById(message.guild.id);

		if (!option) {
			return message.channel.send(lang.ADMIN.PROVIDE_COMMAND_OR_CATEGORY_NAME);
		}

		if (
			guild.customCommands.find(
				({ name }) => name.toLowerCase() === option.toLowerCase()
			)
		) {
			return message.channel.send(lang.ADMIN.COMMAND_CANNOT_DISABLED);
		}

		const command =
			bot.commands.get(option.toLowerCase()) ||
			bot.commands.get(bot.aliases.get(option));

		if (!command) {
			const category = option.toLowerCase();
			if (!categories.includes(category)) {
				return message.channel.send(lang.ADMIN.COMMAND_OR_CATEGORY_NOT_FOUND);
			}

			if (saveCategories.includes(category)) {
				return message.channel.send(lang.ADMIN.CATEGORY_CANNOT_DISABLED);
			}

			if (guild.disabledCategories.includes(category)) {
				return message.channel.send(lang.ADMIN.CATEGORY_ALREADY_DISABLED);
			}

			await updateGuildById(message.guild.id, {
				disabledCategories: [...guild.disabledCategories, category],
			});

			return message.channel.send(
				lang.ADMIN.CATEGORY_DISABLED.replace("{category", category)
			);
		} else {
			if (saveCommands.includes(command.name)) {
				return message.channel.send(lang.ADMIN.COMMAND_CANNOT_DISABLED);
			}

			if (guild.disabledCommands.includes(command.name)) {
				return message.channel.send(lang.ADMIN.COMMAND_ALREADY_DISABLED);
			}

			await updateGuildById(message.guild.id, {
				disabledCommands: [...guild.disabledCommands, command.name],
			});

			return message.channel.send(
				lang.ADMIN.COMMAND_DISABLED.replace("{commandName}", command.name)
			);
		}
	},
};
