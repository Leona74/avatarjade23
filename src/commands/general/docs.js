/**
 * NOTES:
 * Not any issue found, command works as expected.
 *
 * @format
 */

const fetch = require("node-fetch");

module.exports = {
	name: "docs",
	usage: "docs <Str:query>",
	description: "Search queries on djs docs.",
	category: "general",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const query = args.join(" ");

		if (!query) {
			return message.channel.send(lang.GENERAL.PROVIDE_ARGS);
		}

		const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
			query
		)}`;

		const data = await fetch(url).then((res) => res.json());

		if (!data) {
			return message.channel.send(lang.GENERAL.QUERY_NOT_FOUND);
		}

		const embed = {
			...data,
			author: {},
			color: "#7289DA",
			footer: {
				text: message.author.username,
				icon_url: message.author.displayAvatarURL({ dynamic: true }),
			},
		};

		return message.channel.send({ embed });
	},
};
