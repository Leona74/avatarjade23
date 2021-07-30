/**
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
	name: "status",
	description: "Fetches Charliewaves's statistics.",
	category: "general",
	aliases: ["stats", "runprocess"],
	usage: "status",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		function uptime() {
			var msec = process.uptime().toFixed(0) * 1000;

			var days = Math.floor(msec / 1000 / 60 / 60 / 24);
			msec -= days * 1000 * 60 * 60 * 24;

			var hours = Math.floor(msec / 1000 / 60 / 60);
			msec -= hours * 1000 * 60 * 60;

			var mins = Math.floor(msec / 1000 / 60);
			msec -= mins * 1000 * 60;

			var secs = Math.floor(msec / 1000);
			var timestr = "";

			if (days > 0) {
				timestr += days + "d ";
			}

			if (hours > 0) {
				timestr += hours + "h ";
			}

			if (mins > 0) {
				timestr += mins + "m ";
			}

			if (secs > 0) {
				timestr += secs + "s";
			}
			return timestr;
		}

		const embed = BaseEmbed(message)
			.setThumbnail(
				bot.user.avatarURL({ dynamic: true, size: 2048, format: "png" })
			)
			.addField(lang.GENERAL.STATUS_CODER, [
				`${message.client.users.cache.get("565960314970177556").tag}`,
				"\u200b",
			])
			.addField(
				lang.GENERAL.STATUS_PROCESS,
				[
					`${lang.GENERAL.STATUS_UPTIME} *${uptime()}*`,
					`${
						lang.GENERAL.STATUS_COMMANDS
					} *${bot.commands.size.toLocaleString()}*`,
					`${lang.GENERAL.STATUS_VERSION} [\`github release\`](https://github.com/charliewave-me/client/commit/)`,
					`\u200b`,
				],
				true
			)
			.addField(
				lang.GENERAL.STATUS_INTERACT,
				[
					`${
						lang.GENERAL.GUILDSINFO
					} *${bot.guilds.cache.size.toLocaleString()}*`,
					`${
						lang.GENERAL.USERSINFO
					} *${bot.users.cache.size.toLocaleString()}*`,
					`${
						lang.GENERAL.CHANNELSINFO
					} *${bot.channels.cache.size.toLocaleString()}*`,
					`\u200b`,
				],
				true
			)
			.addField(lang.GENERAL.STATUS_MEMORY, [
				`\`\`\`yml\nrss: ${(process.memoryUsage().rss / 1024 / 1014).toFixed(
					2
				)}MB\nheapTotal: ${(
					process.memoryUsage().heapTotal /
					1024 /
					1024
				).toFixed(2)}MB\nheapUsed: ${(
					process.memoryUsage().heapUsed /
					1024 /
					1024
				).toFixed(2)}MB\nexternal: ${(
					process.memoryUsage().external /
					1024 /
					1024
				).toFixed(2)}MB\`\`\``,
			]);

		return message.channel.send(embed);
	},
};
