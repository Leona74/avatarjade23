/**
 * NOTES:
 * New command's dialog available now.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
	name: "reload",
	description: "Reloads a bot command, or all pieces of store.",
	category: "ownerOnly",
	usage: "reload <Str:command> or <Everything:Str'{all}'>",
	ownerOnly: true,
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		if (!args[0]) {
			return message.channel.send(lang.OWNER.PROVIDE_A_COMMAND);
		}

		const cmd = args[0].toLowerCase();

		if (cmd === "all") {
			bot.commands.forEach((c) => {
				if (c.category === "exempt") return;
				delete require.cache[require.resolve(`../${c.category}/${c.name}.js`)];

				setCmd(bot, c);
			});

			return message.channel.send(lang.OWNER.RELOADED_ALL_COMMANDS);
		}

		const command =
			bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));

		if (!command) {
			return message.channel.send(lang.OWNER.COMMAND_NOT_FOUND);
		}

		try {
			delete require.cache[
				require.resolve(`../${command.category}/${command.name}.js`)
			];
			setCmd(bot, command);

			message.channel.send(
				lang.OWNER.SUCCESSFULLY_RELOAD_COMMAND.replace(
					"{commandName}",
					command.name
				)
			);
		} catch (e) {
			bot.logger.error("reload_commands", e?.stack || e);
			const embedError = BaseEmbed(message)
				.setDescription("An error occurred.")
				.setColor("#f73e3e");

			return message.channel.send(embedError);
		}
	},
};

function setCmd(bot, cmd) {
	const command = require(`../${cmd.category}/${cmd.name}.js`);
	bot.commands.set(command.name, command);
	if (cmd.aliases) {
		for (const alias of cmd.aliases) {
			bot.aliases.set(alias, cmd.name);
		}
	}
}
