/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const { updateGuildById, getGuildById } = require("../../utils/functions");

module.exports = {
	name: "ignoredchannels",
	description: "Add or remove a channel from ignoredChannels status.",
	category: "admin",
	usage: "ignoredchannels <Option:option> <Channel:channel_mention>",
	options: ["add", "remove"],
	memberPermissions: ["ADMINISTRATOR"],
	aliases: ["igch", "ic", "ignore"],
	async execute(bot, message, args) {
		const guildId = message.guild.id;
		const option = args[0];
		const item = message.mentions.channels.first() || message.channel;
		const lang = await bot.getGuildLang(message.guild.id);
		const guild = await getGuildById(guildId);
		const ignoredChannels = guild?.ignoredChannels;

		if (!option) {
			return message.channel.send(lang.ADMIN.PROVIDE_VALID_OPTION);
		}

		if (!item) {
			return message.channel.send(lang.ADMIN.PROVIDE_CHANNEL);
		}

		switch (option.toLowerCase()) {
			case "add":
				if (ignoredChannels.includes(item.id)) {
					return message.channel.send(lang.ADMIN.CHANNEL_ALREADY_IGNORED);
				}

				await updateGuildById(guildId, {
					ignoredChannels: [...ignoredChannels, item.id],
				});

				message.channel.send(lang.ADMIN.SUCCES_IGNORED.replace("{item}", item));
				break;
			case "remove":
				if (!ignoredChannels.includes(item.id)) {
					return message.channel.send(lang.ADMIN.CHANNEL_NOT_IGNORED);
				}

				await updateGuildById(guildId, {
					ignoredChannels: ignoredChannels.filter((ci) => ci !== item.id),
				});

				return message.channel.send(
					lang.ADMIN.SUCCES_REMOVED_IGNORED.replace("{item}", item)
				);
			default:
				return message.channel.send(
					lang.ADMIN.NOT_A_OPTION.replace("{option}", option)
				);
		}
	},
};
