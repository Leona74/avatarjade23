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
	name: "duels",
	description:
		"Featches hypixel duels specified category informations for a argued minecraft username.",
	usage: "duels <Str:category> <Str:minecraft_username>",
	category: "hypixel",
	cooldown: 3,
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		const hypixelAPIReborn = new HypixelAPIReborn.Client(key);

		if (!args[0]) return message.channel.send(lang.HYPIXEL.DUELS_CATEGORY);

		if (!args[1]) return message.channel.send(lang.HYPIXEL.ARGUE_A_USERNAME);

		if (args[0] == "uhc") {
			hypixelAPIReborn.getPlayer(args[1]).then((player) => {
				if (!player.stats.duels.uhc.v1)
					return message.channel.send(lang.HYPIXEL.NO_DATA);

				const embed = BaseEmbed(message)
					.setTitle(`${player.nickname}`)
					.setURL(`https://namemc.com/profile/${player.uuid}`)
					.addField(lang.HYPIXEL.KILLS, player.stats.duels.uhc.v1.kills, true)
					.addField(lang.HYPIXEL.LOSSES, player.stats.duels.uhc.v1.losses, true)
					.addField(lang.HYPIXEL.DEATHS, player.stats.duels.uhc.v1.deaths, true)
					.addField(lang.HYPIXEL.WINS, player.stats.duels.uhc.v1.wins, true)
					.setImage(`https://visage.surgeplay.com/full/512/${player.uuid}`)
					.setThumbnail(`https://visage.surgeplay.com/head/512/${player.uuid}`);

				message.channel.send(embed);
			});
		}

		if (args[0] == "skywars") {
			hypixelAPIReborn.getPlayer(args[1]).then((player) => {
				if (!player.stats.duels.skywars.v1)
					return message.channel.send(lang.HYPIXEL.NO_DATA);

				const embed = BaseEmbed(message)
					.setTitle(`${player.nickname}`)
					.setURL(`https://namemc.com/profile/${player.nickname}`)
					.addField(
						lang.HYPIXEL.KILLS,
						player.stats.duels.skywars.v1.kills,
						true
					)
					.addField(
						lang.HYPIXEL.LOSSES,
						player.stats.duels.skywars.v1.losses,
						true
					)
					.addField(
						lang.HYPIXEL.DEATHS,
						player.stats.duels.skywars.v1.deaths,
						true
					)
					.addField(lang.HYPIXEL.WINS, player.stats.duels.skywars.v1.wins, true)
					.setImage(`https://visage.surgeplay.com/full/512/${player.uuid}`)
					.setThumbnail(`https://visage.surgeplay.com/head/512/${player.uuid}`);

				message.channel.send(embed);
			});
		}

		if (args[0] == "bridge") {
			hypixelAPIReborn.getPlayer(args[1]).then((player) => {
				if (!player.stats.duels.bridge.v1)
					return message.channel.send(lang.HYPIXEL.NO_DATA);

				const embed = BaseEmbed(message)
					.setTitle(`${player.nickname}`)
					.setURL(`https://namemc.com/profile/${player.nickname}`)
					.addField(
						lang.HYPIXEL.KILLS,
						player.stats.duels.bridge.v1.kills,
						true
					)
					.addField(
						lang.HYPIXEL.LOSSES,
						player.stats.duels.bridge.v1.losses,
						true
					)
					.addField(
						lang.HYPIXEL.DEATHS,
						player.stats.duels.bridge.v1.deaths,
						true
					)
					.addField(lang.HYPIXEL.WINS, player.stats.duels.bridge.v1.wins, true)
					.setImage(`https://visage.surgeplay.com/full/512/${player.uuid}`)
					.setThumbnail(`https://visage.surgeplay.com/head/512/${player.uuid}`);

				message.channel.send(embed);
			});
		}

		if (args[0] == "sumo") {
			hypixelAPIReborn.getPlayer(args[1]).then((player) => {
				if (!player.stats.duels.sumo)
					return message.channel.send(lang.HYPIXEL.NO_DATA);

				const embed = BaseEmbed(message)
					.setTitle(`${player.nickname}`)
					.setURL(`https://namemc.com/profile/${player.nickname}`)
					.addField(lang.HYPIXEL.KILLS, player.stats.duels.sumo.kills, true)
					.addField(lang.HYPIXEL.LOSSES, player.stats.duels.sumo.losses, true)
					.addField(lang.HYPIXEL.DEATHS, player.stats.duels.sumo.deaths, true)
					.addField(lang.HYPIXEL.WINS, player.stats.duels.sumo.wins, true)
					.setImage(`https://visage.surgeplay.com/full/512/${player.uuid}`)
					.setThumbnail(`https://visage.surgeplay.com/head/512/${player.uuid}`);

				message.channel.send(embed);
			});
		}

		if (args[0] == "op") {
			hypixelAPIReborn.getPlayer(args[1]).then((player) => {
				if (!player.stats.duels.op.v1)
					return message.channel.send(lang.HYPIXEL.NO_DATA);

				const embed = BaseEmbed(message)
					.setTitle(`${player.nickname}`)
					.setURL(`https://namemc.com/profile/${player.nickname}`)
					.addField(lang.HYPIXEL.KILLS, player.stats.duels.op.v1.kills, true)
					.addField(lang.HYPIXEL.LOSSES, player.stats.duels.op.v1.losses, true)
					.addField(lang.HYPIXEL.DEATHS, player.stats.duels.op.v1.deaths, true)
					.addField(lang.HYPIXEL.WINS, player.stats.duels.op.v1.wins, true)
					.setImage(`https://visage.surgeplay.com/full/512/${player.uuid}`)
					.setThumbnail(`https://visage.surgeplay.com/head/512/${player.uuid}`);

				message.channel.send(embed);
			});
		}

		if (args[0] == "combo") {
			hypixelAPIReborn.getPlayer(args[1]).then((player) => {
				if (!player.stats.duels.combo)
					return message.channel.send(lang.HYPIXEL.NO_DATA);

				const embed = BaseEmbed(message)
					.setTitle(`${player.nickname}`)
					.setURL(`https://namemc.com/profile/${player.nickname}`)
					.addField(lang.HYPIXEL.KILLS, player.stats.duels.combo.kills, true)
					.addField(lang.HYPIXEL.LOSSES, player.stats.duels.combo.losses, true)
					.addField(lang.HYPIXEL.DEATHS, player.stats.duels.combo.deaths, true)
					.addField(lang.HYPIXEL.WINS, player.stats.duels.combo.wins, true)
					.setImage(`https://visage.surgeplay.com/full/512/${player.uuid}`)
					.setThumbnail(`https://visage.surgeplay.com/head/512/${player.uuid}`);

				message.channel.send(embed);
			});
		}

	},
};
