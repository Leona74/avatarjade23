const {
	getGuildById,
	getUserById,
	updateUserById,
	errorEmbed,
	calculateUserXp,
	sendErrorLog,
} = require("../../utils/functions");
const { owners } = require("../../../config.json");
const BaseEmbed = require("../../modules/BaseEmbed");
const Blacklist = require("../../models/Blacklisted.model");
const UserModel = require("../../models/User.model");

module.exports = {
	name: "message",
	async execute(bot, message) {
		if (message.channel.type === "dm") return;
		if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES"))
			return;
		if (!message.guild.available) return;

		const guildId = message.guild.id;
		const userId = message.author.id;
		const cooldowns = bot.cooldowns;
		const guild = await getGuildById(guildId);
		const lang = await bot.getGuildLang(guildId);
		const blacklistedUsers = await Blacklist.find();
		const mentions = message.mentions.members;
		const disabledCommands = guild?.disabledCommands;
		const disabledCategories = guild?.disabledCategories;
		const { stripIndents } = require("common-tags");

		const ignoredChannels = guild?.ignoredChannels;
		if (ignoredChannels.includes(message.channel.id)) return;

		const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const serverPrefix = guild.prefix;
		const prefix = new RegExp(
			`^(<@!?${bot.user.id}>|${escapeRegex(serverPrefix)})\\s*`
		);

		if (!message.author.bot) {
			const { user } = await getUserById(userId);
			const xp = Math.ceil(Math.random() * (5 * 10));
			const level = calculateUserXp(user.userXp);
			const newLevel = calculateUserXp(user.userXp + xp);

			if (newLevel > level) {
				if (guild.level_up_messages === true) {
					const msg = await message.channel.send(
						lang.GENERAL.LEVEL_UP_MESSAGE.replace(
							"{user}",
							message.author.username
						).replace("{newLevel}", newLevel)
					);
					const MSG_TIMEOUT_10_SECS = 10000;

					setTimeout(() => {
						msg?.delete();
					}, MSG_TIMEOUT_10_SECS);
				}
			}

			await updateUserById(userId, { userXp: user.userXp + xp });
		}

		if (guild.antiLinksModule === true) {
			function is_url(str) {
				let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
				if (regexp.test(str)) {
					return true;
				} else {
					return false;
				}
			}

			if (is_url(message.content) === true) {
				if (message.member.hasPermission("MANAGE_MESSAGES")) return;
				message.delete();

				return message.channel
					.send(
						lang.MODERATOR.ANTILINKS.replace("{author}", message.author.tag)
					)
					.then((msg) => {
						setTimeout(() => {
							msg.delete();
						}, 2000);
					});
			}
		}

		if (mentions && !prefix.test(message.content)) {
			mentions.forEach(async (member) => {
				const { user } = await getUserById(member.user.id);

				if (user.afkState.is_afk === true) {
					message.channel.send(
						lang.AFK.USER_IS_AFK.replace("{member}", member.user.tag).replace(
							"{reason}",
							user.afkState.reason
						)
					);
				}
			});
		}

		const user = await UserModel.findOne({
			userId: userId,
		});
		if (
			!message.author.bot &&
			user &&
			user?.afkState.is_afk === true &&
			!message.content.includes(`${guild.prefix}afk`)
		) {
			await updateUserById(userId, {
				afkState: {
					is_afk: false,
					reason: null,
				},
			});

			const msg = await message.channel.send(
				lang.AFK.USER_NOT_AFK_ANYMORE.replace("{member}", message.author.tag)
			);

			setTimeout(() => {
				msg.delete();
			}, 5000);
		}

		if (
			!prefix.test(message.content) ||
			message.author.bot ||
			userId === bot.user.id
		)
			return;

		const [, matchedPrefix] = message.content.match(prefix);
		const args = message.content
			.slice(matchedPrefix.length)
			.trim()
			.split(/ +/g);
		const command = args.shift().toLowerCase();
		const customCmds = guild?.customCommands;

		if (message.mentions.has(bot.user.id) && !command) {
			const embed = BaseEmbed(message)
				.setDescription(
					stripIndents`
	[GitHub](https://github.com/charliewave-me)
    [Public Website](https://charliewave.me)
    [Support](https://discord.gg/u4RRQxxhkM)
    [Invite Now!](https://discord.com/oauth2/authorize?client_id=772497789561208872&permissions=1916267615&scope=bot)
    `
				)
				.addField(`**${lang.GENERAL.PREFIXUSAGE}:**`, serverPrefix, true)
				.addField(
					`**${lang.GENERAL.INFOBOT_BOT_DEVS}:**`,
					`${bot.users.cache.get("565960314970177556").tag}`,
					true
				)
				.addField(
					"**TOP.GG**:",
					"[Click here!](https://top.gg/bot/772497789561208872)",
					true
				)
				.setThumbnail(
					bot.user.avatarURL({ dynamic: true, size: 2048, format: "png" })
				);

			message.channel.send(embed);
		}

		if (blacklistedUsers) {
			const isBlacklisted = blacklistedUsers.find(
				(u) => u.userId === message.author.id
			);

			if (isBlacklisted) {
				return message.channel.send(
					lang.GENERAL.YOU_ARE_BLACKLISTED.replace(
						"{author}",
						message.author.tag
					)
				);
			}
		}

		const customCmd = customCmds.find((x) => x.name === command);
		if (customCmd) message.channel.send(customCmd.response);

		try {
			const cmd =
				bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));

			if (bot.commands.has(cmd?.name)) {
				const now = Date.now();
				const timestamps = cooldowns.get(cmd.name);
				const cooldownAmount = cmd.cooldown * 1000;

				if (disabledCategories !== null && disabledCategories.length > 0) {
					if (disabledCategories?.includes(cmd.category)) {
						return message.channel.send(
							lang.GENERAL.COMMAND_DISABLE_BECAUSE_CATEGORY_IS_DISABLE.replace(
								"{category",
								cmd.category
							)
						);
					}
				}

				if (disabledCommands !== null && disabledCommands.length > 0) {
					if (disabledCommands?.includes(cmd.name)) {
						return message.channel.send(lang.GENERAL.COMMAND_DISABLED);
					}
				}

				if (cmd.ownerOnly && !owners.includes(message.author.id)) {
					return message.reply(lang.OWNER.COMMAND_ONLYOWNER);
				}

				if (cmd.botPermissions) {
					const neededPermissions = [];
					cmd.botPermissions.forEach((perm) => {
						if (!message.channel.permissionsFor(message.guild.me).has(perm)) {
							neededPermissions.push(perm);
						}
					});

					if (neededPermissions[0]) {
						return message.channel.send(errorEmbed(neededPermissions, message));
					}
				}

				if (cmd.memberPermissions) {
					const neededPermissions = [];
					cmd.memberPermissions.forEach((perm) => {
						if (!message.channel.permissionsFor(message.member).has(perm)) {
							neededPermissions.push(perm);
						}
					});

					if (neededPermissions.length > 0) {
						return message.channel.send(
							lang.GENERAL.PERMS_YOU_NEED.replace(
								"{map}",
								neededPermissions
									.map((p) => `\`${p.toUpperCase()}\``)
									.join(", ")
							)
						);
					}
				}

				if (cmd.nsfwOnly && cmd.nsfwOnly === true && !message.channel.nsfw) {
					return message.channel.send(lang.GENERAL.NOT_A_NSFW_CHANNEL);
				}

				if (timestamps.has(userId)) {
					const expTime = timestamps.get(userId) + cooldownAmount;

					if (now < expTime) {
						const timeleft = (expTime - now) / 1000;

						return message.reply(
							lang.GENERAL.TIMEOUT_COOLDOWN.replace(
								"{time}",
								timeleft.toFixed(1)
							).replace("{command}", cmd.name)
						);
					}
				}

				timestamps.set(userId, now);
				setTimeout(() => timestamps.delete(userId), cooldownAmount);

				cmd.execute(bot, message, args);
			} else {
				return;
			}
		} catch (e) {
			sendErrorLog(bot, e, "error", message.content);
			const embed = BaseEmbed(message)
				.setTitle("Something went wrong!")
				.setDescription(e);

			message.channel.send(embed);
		}
	},
};
