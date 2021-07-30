/**
 * NOTES:
 * Hypixel api reborn is a bit old for some new features.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");
const HypixelAPIReborn = require("hypixel-api-reborn");

const key = `733544fa-d61b-4d31-9531-5aaff48e9624`;

module.exports = {
	name: "skywars",
	description:
		"Featches hypixel skywars informations for a argued minecraft username.",
	usage: "skywars <Str:minecraft_username>",
	category: "hypixel",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		if (!args[0]) return message.channel.send(lang.HYPIXEL.ARGUE_A_USERNAME);

		const hypixelAPIReborn = new HypixelAPIReborn.Client(key);

		hypixelAPIReborn.getPlayer(args[0]).then(async (player) => {
			if (!player.stats.skywars)
				return message.channel.send(lang.HYPIXEL.NO_DATA);

			const embed = BaseEmbed(message)
				.setTitle(`${player.nickname}`)
				.setURL(`https://namemc.com/profile/${player.uuid}`)
				.addField(lang.HYPIXEL.LEVEL, player.stats.skywars.level, true)
				.addField(lang.HYPIXEL.HEADS, player.stats.skywars.heads, true)
				.addField(lang.HYPIXEL.KD_RATIO, player.stats.skywars.KDRatio, true)
				.addField(lang.HYPIXEL.WL_RATIO, player.stats.skywars.WLRatio, true)
				.addField(lang.HYPIXEL.COINS, player.stats.skywars.coins, true)
				.addField(lang.HYPIXEL.TOTAL_DEATHS, player.stats.skywars.deaths, true)
				.addField(lang.HYPIXEL.TOTAL_KILLS, player.stats.skywars.kills, true)
				.addField(
					lang.HYPIXEL.TOTAL_RANKED_WINS,
					player.stats.skywars.ranked.wins,
					true
				)
				.addField(lang.HYPIXEL.TOTAL_WINS, player.stats.skywars.wins, true)
				.addField(lang.HYPIXEL.TOKENS, player.stats.skywars.tokens, true)
				.addField(lang.HYPIXEL.PRESTIGE, player.stats.skywars.prestige, true)
				.addField(lang.HYPIXEL.SOULS, player.stats.skywars.souls, true)
				.setImage(`https://visage.surgeplay.com/full/512/${player.uuid}`)
				.setThumbnail(`https://visage.surgeplay.com/head/512/${player.uuid}`);

			return message.channel.send(embed);
		});
	},
};
