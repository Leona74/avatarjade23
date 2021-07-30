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
	name: "bedwars",
	description:
		"Featches hypixel bedwars informations for a argued minecraft username.",
	usage: "bedwars <Str:minecraft_username>",
	category: "hypixel",
	cooldown: 3,
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

	if (!args[0]) return message.channel.send(lang.HYPIXEL.ARGUE_A_USERNAME);

		const hypixelAPIReborn = new HypixelAPIReborn.Client(key);

		hypixelAPIReborn.getPlayer(args[0]).then(async (player) => {
			if (!player.stats.bedwars)
				return message.channel.send(lang.HYPIXEL.NO_DATA);

			const embed = BaseEmbed(message)
				.setTitle(`${player.nickname}`)
				.setURL(`https://namemc.com/profile/${player.uuid}`)
				.setImage(`https://visage.surgeplay.com/full/512/${player.uuid}`)
				.setThumbnail(`https://visage.surgeplay.com/head/512/${player.uuid}`)
				.addField(lang.HYPIXEL.LEVEL, player.stats.bedwars.level, true)
				.addField(lang.HYPIXEL.KD_RATIO, player.stats.bedwars.KDRatio, true)
				.addField(
					lang.HYPIXEL.FINAL_KD_RATIO,
					player.stats.bedwars.finalKDRatio,
					true
				)
				.addField(lang.HYPIXEL.WL_RATIO, player.stats.bedwars.WLRatio, true)
				.addField(
					lang.HYPIXEL.BROKEN_BEDS,
					player.stats.bedwars.beds.broken,
					true
				)
				.addField(lang.HYPIXEL.BEDS_LOST, player.stats.bedwars.beds.lost, true)
				.addField(lang.HYPIXEL.COINS, player.stats.bedwars.coins, true)
				.addField(lang.HYPIXEL.TOTAL_DEATHS, player.stats.bedwars.deaths, true)
				.addField(
					lang.HYPIXEL.FINAL_DEATHS,
					player.stats.bedwars.finalDeaths,
					true
				)
				.addField(lang.HYPIXEL.TOTAL_KILLS, player.stats.bedwars.kills, true)
				.addField(
					lang.HYPIXEL.TOTAL_FINAL_KILLS,
					player.stats.bedwars.finalKills,
					true
				)
				.addField(lang.HYPIXEL.WINSTREAK, player.stats.bedwars.winstreak, true)
				.addField(lang.HYPIXEL.TOTAL_WINS, player.stats.bedwars.wins, true);

			return message.channel.send(embed);
		});

	},
};
