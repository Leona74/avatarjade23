/**
 * NOTES:
 * Command may no be Discord ToS available.
 *
 * @format
 */

module.exports = {
	name: "unlockchannel",
	description: "Unlock a locked channel.",
	category: "moderator",
	usage: "unlockchannel <Channel:channel_mention> or <Str:channel_name>",
	aliases: ["unlock"],
	botPermissions: ["MANAGE_CHANNELS"],
	memberPermissions: ["MANAGE_CHANNELS"],
	async execute(bot, message) {
		const channel = message.mentions.channels.first() || message.channel;
		const lang = await bot.getGuildLang(message.guild.id);

		if (
			channel.permissionsFor(message.guild.id).has("SEND_MESSAGES") === true
		) {
			return message.channel.send(lang.MODERATOR.CHANNEL_NOT_LOCKED);
		}

		channel.updateOverwrite(message.guild.id, {
			SEND_MESSAGES: true,
		});

		message.channel.send(
			lang.MODERATOR.SUCCES_UNLOCK_CHANNEL.replace("{channel}", channel)
		);
	},
};
