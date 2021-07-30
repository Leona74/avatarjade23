/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");
const { stripIndents } = require("common-tags");

module.exports = {
	name: "serverinfo",
	description: "Fetches public guild informations and statistics.",
	category: "general",
	aliases: ["guild", "server", "si", "gi", "guildinfo"],
	async execute(bot, message) {
		const lang = await bot.getGuildLang(message.guild.id);
		const { guild } = message;

		function daysAgo(time) {
			var today = new Date();
			var createdOn = new Date(time);
			var msInDay = 24 * 60 * 60 * 1000;

			createdOn.setHours(0, 0, 0, 0);
			today.setHours(0, 0, 0, 0);

			var diff = (+today - +createdOn) / msInDay;

			return diff;
		}

		const _createdAt = new Date(message.guild.createdAt);
		const _createdAt_Y = new Intl.DateTimeFormat("en", {
			year: "numeric",
		}).format(_createdAt);
		const _createdAt_M = new Intl.DateTimeFormat("en", {
			month: "short",
		}).format(_createdAt);
		const _createdAt_D = new Intl.DateTimeFormat("en", {
			day: "2-digit",
		}).format(_createdAt);

		const GUILD_CREATED_AT = `${_createdAt_D} **${_createdAt_M.toUpperCase()}** ${_createdAt_Y}`;

		const GUILD_REGION = {
			"us-east": `East USA :flag_us:`,
			"us-west": `West USA :flag_us:`,
			"us-south": `South USA :flag_us:`,
			"us-central": `Central USA :flag_us:`,
			brazil: `Brazil :flag_br:`,
			japan: `Japan :flag_jp:`,
			russia: `Russia :flag_ru:`,
			singapore: `Singapore :flag_sg:`,
			southafrica: `South Africa :flag_za:`,
			hongkong: `Hong Kong :flag_hk:`,
			sydney: `Sydney :flag_au:`,
			europe: `Europe :flag_eu:`,
		};

		const guildEmojis = message.guild.emojis.cache.size
			? message.guild.emojis.cache
					.map(
						(emoji) =>
							`<${emoji.animated == true ? "a" : ""}:${emoji.name}:${emoji.id}>`
					)
					.join(" ")
					.substring(0, 1024)
					.replace(/\s\S+[^>]$/, "")
			: "N/A";

		const guildRoles = message.guild.roles.cache
			.map((role) => role.toString())
			.join(" ")
			.substring(0, 1024)
			.replace(/\s\S+[^>]$/, "");

		const members = {
			online: message.guild.members.cache.filter(
				(m) => m.presence.status === "online"
			).size,
			dnd: message.guild.members.cache.filter(
				(m) => m.presence.status === "dnd"
			).size,
			idle: message.guild.members.cache.filter(
				(m) => m.presence.status === "idle"
			).size,
			offline: message.guild.members.cache.filter(
				(m) => m.presence.status === "offline"
			).size,
			bots: message.guild.members.cache.filter((m) => m.user.bot).size,
		};

		const channels = {
			text: message.guild.channels.cache.filter(
				(channel) => channel.type === "text"
			).size,
			voice: message.guild.channels.cache.filter(
				(channel) => channel.type === "voice"
			).size,
		};

		const inviteBanner = guild.bannerURL({
			size: 2048,
			format: "png",
			dynamic: true,
		});

		const embed = BaseEmbed(message)
			.setTitle(`${message.guild.name}`)
			.setThumbnail(
				message.guild.iconURL({ dynamic: true, size: 2048, format: "png" })
			)
			.setDescription(
				`${
					message.guild.description != null
						? message.guild.description + "\n\n"
						: ""
				}ID: ${message.guild.id}`
			)
			.addField(
				`**${lang.GENERAL.GI_OWNERSHIP}:**`,
				`<:charliewave_ownership:771637500967124994> ${
					message.guild.owner.user.tag
				}\n ${message.guild.owner.user.toString()}`,
				true
			)
			.addField(
				`**${lang.GENERAL.GI_CHANNELS}:**`,
				stripIndents`\
              <:charliewave_text:771637634572222475> ${lang.GENERAL.GI_TEXT_CHANNELS}: ${channels.text}\n\
              <:charliewave_voice:771637698443214848> ${lang.GENERAL.GI_VOICE_CHANNELS}: ${channels.voice}`,
				true
			)
			.addField(
				`**${lang.GENERAL.GI_REGION}:**`,
				`${GUILD_REGION[message.guild.region]}`,
				true
			)
			.addField(
				`**${lang.GENERAL.GI_VERIFICATION_LEVEL}:**`,
				message.guild.verificationLevel.toString(),
				true
			)
			.addField(
				`**${lang.GENERAL.GI_BOOSTS}:**`,
				message.guild.premiumSubscriptionCount +
					` (${lang.GENERAL.GI_BOOST_LEVEL}: ${message.guild.premiumTier})` ||
					"N/A",
				true
			)
			.addField(
				`**${lang.GENERAL.GI_AFK_CHANNEL}:**`,
				message.guild.afkChannel
					? `<:charliewave_text:771637634572222475> ${message.guild.afkChannel.name}`
					: "N/A",
				true
			)
			.addField(
				`**${lang.GENERAL.GI_CREATED_ON}**:`,
				GUILD_CREATED_AT +
					`\n${daysAgo(message.guild.createdAt).toFixed(0)} ${
						lang.GENERAL.GI_DAYS_TIMESTAMPS
					}`
			)
			.addField(
				`**${lang.GENERAL.GI_MEMBERS} (${message.guild.memberCount}):**`,
				stripIndents`\
              <:charliewave_online:771635233384693791>${members.online} : \
              <:charliewave_dnd:771635335486111744>${members.dnd} : \
              <:charliewave_idle:771635289839501333>${members.idle} : \
              <:charliewave_offline:771635390871502858>${members.offline} : \
              <:charliewave_bot:771636943632859136> ${members.bots}`,
				true
			)
			.addField(
				`**${lang.GENERAL.GI_EMOJIS} (${message.guild.emojis.cache.size}):**`,
				guildEmojis
			)
			.addField(
				`**${lang.GENERAL.GI_ROLES} (${message.guild.roles.cache.size}):**`,
				guildRoles
			);

		message.channel.send(embed);
	},
};
