/**
 * TODO:
 * New mute/unmute system connected to database.
 *
 * @format
 */

module.exports = {
	name: "mute",
	description: "Mute a guild user.",
	category: "moderator",
	usage: "mute <User:user_mention>",
	botPermissions: ["MANAGE_ROLES"],
	memberPermissions: ["MANAGE_ROLES"],
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const muteUser = bot.findMember(message, args);

		if (muteUser.roles.cache.find((r) => r.name === "muted")) {
			return message.channel.send(lang.MODERATOR.ALREADY_MUTED);
		}

		if (muteUser.hasPermission("MANAGE_ROLES")) {
			return message.channel.send(lang.MODERATOR.MUTE_NOT_ALLOWED);
		}

		if (
			message.guild.me.roles.highest.comparePositionTo(muteUser.roles.highest) <
			0
		)
			return message.channel.send(
				lang.MODERATOR.MUTE_SIMPLE.replace("{member}", muteUser.tag)
			);

		let muteReason = args.join(" ").slice(23);

		const muteRole =
			message.guild.roles.cache.find((r) => r.name === "muted") ||
			(await message.guild.roles.create({
				data: {
					name: "muted",
					color: "GRAY",
				},
				reason: "Mute a user.",
			}));

		if (!muteUser) return message.channel.send(lang.MODERATOR.BAN_USAGE);
		if (!muteReason) muteReason = "N/A";

		message.guild.channels.cache.forEach(async (channel) => {
			await channel.overwritePermissions([
				{
					id: muteRole.id,
					deny: ["SEND_MESSAGES", "ADD_REACTIONS"],
				},
			]);
		});

		muteUser.roles.add(muteRole);

		message.channel.send(
			lang.MODERATOR.MUTE_USER_SUCCES.replace("{user}", muteUser).replace(
				"{reason}",
				muteReason
			)
		);
	},
};
