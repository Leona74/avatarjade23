/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

Fetch = require("node-fetch").default;
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
	name: "minecraft",
	description:
		"Fetches public informations about a third-party rminecraft server.",
	usage: "minecraft <Str:server_ip>",
	category: "general",
	aliases: ["mc"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		const Ip = args[0];
		if (!Ip) return message.channel.send(lang.GENERAL.PROVIDE_MC_ARGS);

		const response = await Fetch(`https://api.mcsrvstat.us/2/${Ip}`);
		const json = await response.json();

		if (!json.online) return message.channel.send(lang.GENERAL.MC_NOT_FOUND);

		const embed = BaseEmbed(message)
			.setTitle(`${json.hostname || Ip}`)
			.setThumbnail(`https://api.mcsrvstat.us/icon/${Ip}`)
			.addField(
				`**${lang.GENERAL.MC_STATUS}**`,
				json.online ? lang.GENERAL.MC_ONLINE : lang.GENERAL.MC_OFFLINE,
				true
			)
			.addField(
				`**${lang.GENERAL.MC_PLAYERS}**`,
				json.players ? json.players.online : "N/A",
				true
			)
			.addField(
				`**${lang.GENERAL.MC_MAX_PLAYERS}**`,
				json.players ? json.players.max : "N/A",
				true
			)
			.addField(`**${lang.GENERAL.MC_VERSION}**`, json.version || "N/A", true)
			.addField(`**${lang.GENERAL.MC_PORT}**`, json.port || "Default", true);

		if (json.motd && json.motd.clean && json.motd.clean.length > 1) {
			embed.addField(
				`**${lang.GENERAL.MC_DESCRIPTION}**`,
				json.motd.clean.length > 100
					? `${json.motd.clean.slice(0, 100)}...`
					: json.motd.clean
			);
		}
		message.channel.send(embed);
	},
};
