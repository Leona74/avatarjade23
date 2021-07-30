/**
 * NOTES:
 * Command may no be Discord ToS available.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
	name: "lockchannel",
	description: "Lock a channel.",
	category: "moderator",
	usage: "lockchannel <Channel:channel_mention>",
	aliases: ["lock"],
	botPermissions: ["MANAGE_CHANNELS"],
	memberPermissions: ["MANAGE_CHANNELS"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		let lockReason = args.join(" ");
		let channel = message.mentions.channels.first();

		if (channel) {
			lockReason = args.join(" ").slice(22);
		} else {
			channel = message.channel;
		}

		if (
			channel.permissionsFor(message.guild.id).has("SEND_MESSAGES") === false
		) {
			return message.channel.send(lang.MODERATOR.CHANNEL_ALREADY_LOCKED);
		}

		if (!lockReason)
			return message.channel.send(lang.MODERATOR.REASON_LOCK_CHANNEL);

		channel.updateOverwrite(message.guild.id, {
			SEND_MESSAGES: false,
		});

		message.channel.send(
			lang.MODERATOR.SUCCES_LOCK_CHANNEL.replace("{channel}", channel).replace(
				"{reason}",
				lockReason
			)
		);
	},
};
