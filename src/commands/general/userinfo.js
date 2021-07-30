/**
 * TODO:
 * Fix the elapsed time bug.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
	name: "userinfo",
	description:
		"Fetches a user's information. If no user is given, your own information will be displayed.",
	usage: "userinfo <User:user_metion>",
	category: "general",
	aliases: ["whois", "user", "ui"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const member = bot.findMember(message, args, true);

		if (!member) {
			return message.channel.send(lang.GENERAL.WHOIS_NOT_USER_FOUND);
		}

		function getTargetEmojiByStatus(status, mobile) {
			switch (status) {
				case "dnd":
					return "<:charliewave_dnd:771635335486111744>";
				case "idle":
					return "<:charliewave_idle:771635289839501333>";
				case "offline":
					return "<:charliewave_offline:771635390871502858>";
				case "online":
					return mobile === "online"
						? "<:charliewave_mobile:771635443698499584>"
						: "<:charliewave_online:771635233384693791>";
			}
		}

		function formatDate(timestamp) {
			let startTime = timestamp;
			let endTime = Date.now();
			let totalSeconds = (endTime - startTime) / 1000;

			let hours = Math.floor(totalSeconds / 3600);
			let minutes = Math.floor((totalSeconds % 3600) / 60);
			let seconds = Math.floor((totalSeconds % 3600) % 60);

			return `${hours >= 1 ? ("0" + hours).slice(-2) + ":" : ""}${(
				"0" + minutes
			).slice(-2)}:${("0" + seconds).slice(-2)}`;
		}

		function daysAgo(time) {
			var today = new Date();
			var createdOn = new Date(time);
			var msInDay = 24 * 60 * 60 * 1000;

			createdOn.setHours(0, 0, 0, 0);
			today.setHours(0, 0, 0, 0);

			var diff = (+today - +createdOn) / msInDay;

			return diff;
		}

		const _createdAt = new Date(member.user.createdAt);
		const _createdAt_Y = new Intl.DateTimeFormat("en", {
			year: "numeric",
		}).format(_createdAt);
		const _createdAt_M = new Intl.DateTimeFormat("en", {
			month: "short",
		}).format(_createdAt);
		const _createdAt_D = new Intl.DateTimeFormat("en", {
			day: "2-digit",
		}).format(_createdAt);

		const TARGET_CREATED_AT = `${_createdAt_D} **${_createdAt_M.toUpperCase()}** ${_createdAt_Y}`;

		const _joinedAt = new Date(member.joinedAt);
		const _joinedAt_Y = new Intl.DateTimeFormat("en", {
			year: "numeric",
		}).format(_joinedAt);
		const _joinedAt_M = new Intl.DateTimeFormat("en", {
			month: "short",
		}).format(_joinedAt);
		const _joinedAt_D = new Intl.DateTimeFormat("en", {
			day: "2-digit",
		}).format(_joinedAt);

		const TARGET_JOINED_AT = `${_joinedAt_D} **${_joinedAt_M.toUpperCase()}** ${_joinedAt_Y}`;

		const DISCORD_BADGES = {
			DISCORD_EMPLOYEE: "<:charliewave_discordemployee:771642683558461460>",
			DISCORD_PARTNER: "<:charliewave_partner:771642505393471529>",
			BUGHUNTER_LEVEL_1: "<:charliewave_bughunter:771642200890671104>",
			BUGHUNTER_LEVEL_2: "<:charliewave_bughunterleveltwo:771642367253544980>",
			HYPESQUAD_EVENTS: "<:charliewave_hypesquad:771642074507902996>",
			HOUSE_BRAVERY: "<:charliewave_bravery:771641939417497610>",
			HOUSE_BRILLIANCE: "<:charliewave_briliance:771641837986643977>",
			HOUSE_BALANCE: "<:charliewave_balance:771641691496251422>",
			EARLY_SUPPORTER: "<:charliewave_supporter:771641583963340821>",
			VERIFIED_BOT: "<:charliewave_verifiedbot:771641428580368434>",
			VERIFIED_DEVELOPER: "<:charliewave_developer:771638295829544960>",
			DISCORD_CERTIFIED_MODERATOR:
				"<:charliewave_advanced_moderator:857930973715103775>",
		};

		const TARGET_BADGES = [];

		for (const flags of member.user.flags.toArray()) {
			TARGET_BADGES.push(DISCORD_BADGES[flags]);
		}

		let joinposition;
		let arr = message.guild.members.cache.array();
		arr.sort((a, b) => a.joinedAt - b.joinedAt);

		for (let i = 0; i < arr.length; i++) {
			if (arr[i].id == member.user.id) joinposition = i;
		}

		const embed = BaseEmbed(message)
			.setTitle(
				`${member.user.tag} ${getTargetEmojiByStatus(
					member.user.presence.status,
					member.user.presence.clientStatus != undefined &&
						member.user.presence.clientStatus.mobile
				)}`
			)
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
			.setDescription(`UID: ${member.user.id}`)
			.addField(
				`**${lang.GENERAL.WHOIS_TAG}:**`,
				"#" + member.user.discriminator,
				true
			)
			.addField(
				`**${lang.GENERAL.WHOIS_USERNAME}:**`,
				member.user.nickname ? member.user.nickname : "N/A",
				true
			)
			.addField(
				`**${lang.GENERAL.WHOIS_JOIN_POSITION}:**`,
				`#${joinposition + 1}`,
				true
			)
			.addField(
				`**${lang.GENERAL.WHOIS_HIGHEST_ROLE}:**`,
				member.roles.highest.toString(),
				true
			)
			.addField(
				`**${lang.GENERAL.WHOIS_BADGES}:**`,
				TARGET_BADGES.length > 0 ? TARGET_BADGES.join(" ") : "N/A",
				true
			)
			.addField(
				`**${lang.GENERAL.WHOIS_TYPE}:**`,
				member.user.bot
					? lang.GENERAL.WHOIS_TYPE_BOT
					: lang.GENERAL.WHOIS_TYPE_HUMAN,
				true
			);

		const TARGET_PRESENCE_LAST =
			member.user.presence.activities.length > 1 ? "\n――――――――" : "";

		if (
			member.user.presence != undefined &&
			member.user.presence.activities.length > 0
		) {
			embed.addField(
				`**${lang.GENERAL.WHOIS_PRESENCE}:**`,
				member.user.presence.activities.map((activity) => {
					return (
						(
							(activity.emoji != undefined && activity.emoji !== "null"
								? activity.emoji.id != undefined
									? `<${activity.emoji.animated === true ? "a" : ""}:${
											activity.emoji.name
									  }:${activity.emoji.id}>`
									: `${activity.emoji.name}`
								: "") +
							(activity.type != undefined && activity.type !== "null"
								? activity.type === "CUSTOM_STATUS"
									? ""
									: activity.type.toString()
								: "") +
							(activity.name != undefined && activity.name !== "null"
								? activity.name === "Custom Status"
									? activity.state != undefined && activity.state !== "null"
										? " **" + activity.state + "**"
										: ""
									: " **" + activity.name + "**"
								: "") +
							"\n" +
							(activity.details != undefined && activity.details !== "null"
								? activity.details
								: "") +
							"\n" +
							(activity.details != undefined && activity.details !== "null"
								? activity.state != undefined && activity.state !== "null"
									? activity.state
									: ""
								: "") +
							"\n" +
							(activity.timestamps != undefined &&
							activity.timestamps !== "null"
								? formatDate(new Date(activity.timestamps.start).getTime()) +
								  ` ${lang.GENERAL.WHOIS_ELAPSED_TIMESTAMPS}`
								: "") +
							"\n"
						).replace(/(^n\s+|\s+$)/g, "") +
						(member.user.presence.activities[
							member.user.presence.activities.length - 1
						] == activity
							? ""
							: TARGET_PRESENCE_LAST)
					);
				})
			);
		}

		embed.addField(
			`**${lang.GENERAL.WHOIS_CREATED_ON}:**`,
			TARGET_CREATED_AT +
				`\n${daysAgo(member.user.createdAt).toFixed(0)} ${
					lang.GENERAL.WHOIS_TIMESTAMP_DAYS
				}`,
			true
		);
		embed.addField(
			`**${lang.GENERAL.WHOIS_JOINED_AT}:**`,
			TARGET_JOINED_AT +
				`\n${daysAgo(member.joinedAt).toFixed(0)} ${
					lang.GENERAL.WHOIS_TIMESTAMP_DAYS
				}`,
			true
		);

		message.channel.send(embed);
	},
};
