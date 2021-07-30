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
	name: "speeduhc",
	description:
		"Featches hypixel speeduhc informations for a argued minecraft username.",
	usage: "speeduhc <Str:minecraft_username>",
	category: "hypixel",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		if (!args[0]) return message.channel.send(lang.HYPIXEL.ARGUE_A_USERNAME);

		const hypixelAPIReborn = new HypixelAPIReborn.Client(key);

		hypixelAPIReborn.getPlayer(args[0]).then(async (player) => {
			if (!player.stats.speedUHC)
				return message.channel.send(lang.HYPIXEL.NO_DATA);

			const embed = BaseEmbed(message)
				.setTitle(`${player.nickname}`)
				.setURL(`https://namemc.com/profile/${player.uuid}`)
				.addField(lang.HYPIXEL.KILLS, player.stats.speedUHC.kills, true)
				.addField(lang.HYPIXEL.LOSSES, player.stats.speedUHC.losses, true)
				.addField(lang.HYPIXEL.WINS, player.stats.speedUHC.wins, true)
				.addField(lang.HYPIXEL.WINSTREAK, player.stats.speedUHC.winstreak, true)
				.addField(lang.HYPIXEL.DEATHS, player.stats.speedUHC.deaths, true)
				.addField(
					lang.HYPIXEL.GAMES_PLAYED,
					player.stats.speedUHC.playedGames,
					true
				)
				.addField(lang.HYPIXEL.KD_RATIO, player.stats.speedUHC.KDRatio, true)
				.addField(lang.HYPIXEL.WL_RATIO, player.stats.speedUHC.WLRatio, true)
				.setImage(`https://visage.surgeplay.com/full/512/${player.uuid}`)
				.setThumbnail(`https://visage.surgeplay.com/head/512/${player.uuid}`);

			return message.channel.send(embed);
		});
	},
};
