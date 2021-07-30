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
	name: "uhc",
	description:
		"Featches hypixel uhc informations for a argued minecraft username.",
	usage: "uhc <Str:minecraft_username>",
	category: "hypixel",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		if (!args[0]) return message.channel.send(lang.HYPIXEL.ARGUE_A_USERNAME);

		const hypixelAPIReborn = new HypixelAPIReborn.Client(key);

		hypixelAPIReborn.getPlayer(args[0]).then(async (player) => {
			if (!player.stats.uhc) return message.channel.send(lang.HYPIXEL.NO_DATA);

			const embed = BaseEmbed(message)
				.setTitle(`${player.nickname}`)
				.setURL(`https://namemc.com/profile/${player.uuid}`)
				.addField(lang.HYPIXEL.KILLS, player.stats.uhc.kills, true)
				.addField(lang.HYPIXEL.LEVEL, player.stats.uhc.starLevel, true)
				.addField(lang.HYPIXEL.WINS, player.stats.uhc.wins, true)
				.addField(lang.HYPIXEL.HEADS_EATEN, player.stats.uhc.headsEaten, true)
				.addField(lang.HYPIXEL.DEATHS, player.stats.uhc.deaths, true)
				.addField(lang.HYPIXEL.COINS, player.stats.uhc.coins, true)
				.setImage(`https://visage.surgeplay.com/full/512/${player.uuid}`)
				.setThumbnail(`https://visage.surgeplay.com/head/512/${player.uuid}`);

			return message.channel.send(embed);
		});
	},
};
