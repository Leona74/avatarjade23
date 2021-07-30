/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

module.exports = {
	name: "discrim",
	usage: "discrim <Number:discriminator>",
	description:
		"Searches for users with the specified discriminator. (your own if not specified)",
	aliases: ["tag", "discriminator"],
	category: "general",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		let discrim = args[0];
		if (!discrim) {
			discrim = message.author.discriminator;
		}
		if (discrim.startsWith("#")) {
			discrim = discrim.slice(1);
		}

		if (/^[0-9]+$/.test(discrim) && discrim.length === 4) {
			const users = bot.users.cache
				.filter((user) => user.discriminator === discrim)
				.map((user) => user.username);

			const splice = (s) =>
				s.length > 1500 ? `${s.substring(0, 1490)}...` : s;

			if (users.length === 0)
				return message.channel.send(
					lang.GENERAL.DISCRIM_NOT.replace("{discrim}", discrim)
				);

			return message.channel.send(
				`**${users.length}** ${
					lang.GENERAL.DISCRIM_FOUND
				} **#${discrim}**:\n\`\`\`yml\n${splice(
					users.join(", ").toString()
				)}\`\`\``
			);
		} else {
			return message.channel.send(lang.GENERAL.DISCRIM_INVALID);
		}
	},
};
