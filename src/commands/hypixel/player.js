/**
 * NOTES:
 * Hypixel api reborn is a bit old for some new features.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");
const hypixel = require("hypixel-api-nodejs");

const key = `733544fa-d61b-4d31-9531-5aaff48e9624`;

function minecraftColorToHex(colorname) {
	switch (colorname) {
		case "BLACK":
			return "#000000";
		case "DARK_BLUE":
			return "#0100BD";
		case "DARK_GREEN":
			return "#00BF00";
		case "DARK_AQUA":
			return "#00BDBD";
		case "DARK_RED":
			return "#BE0000";
		case "DARK_PURPLE":
			return "#BC01BC";
		case "GOLD":
			return "#DB9F37";
		case "GRAY":
			return "#BEBDBE";
		case "DARK_GRAY":
			return "#3F3F3F";
		case "BLUE":
			return "#3F3FFE";
		case "GREEN":
			return "#3FFE3E";
		case "AQUA":
			return "#40FCFF";
		case "RED":
			return "#FF3E3F";
		case "LIGHT_PURPLE":
			return "#FE3FFE";
		case "YELLOW":
			return "#FEFD3F";
		case "WHITE":
			return "#FFFFFF";
	}
}

String.prototype.toCleanGameType = function () {
	switch (this.toString()) {
		case "BEDWARS":
			return "BedWars";
		case "QUAKECRAFT":
			return "Quake";
		case "WALLS":
			return "Walls";
		case "PAINTBALL":
			return "Paintball";
		case "SURVIVAL_GAMES":
			return "Blitz Survival Games";
		case "TNTGAMES":
			return "TNT Games";
		case "VAMPIREZ":
			return "VampireZ";
		case "WALLS3":
			return "Mega Walls";
		case "ARCADE":
			return "Arcade";
		case "ARENA":
			return "Arena";
		case "UHC":
			return "UHC Champions";
		case "MCGO":
			return "Cops and Crims";
		case "BATTLEGROUND":
			return "Warlords";
		case "SUPER_SMASH":
			return "Smash Heroes";
		case "GINGERBREAD":
			return "Turbo Kart Racers";
		case "HOUSING":
			return "Housing";
		case "SKYWARS":
			return "SkyWars";
		case "TRUE_COMBAT":
			return "Crazy Walls";
		case "SPEED_UHC":
			return "Speed UHC";
		case "SKYCLASH":
			return "SkyClash";
		case "LEGACY":
			return "Classic Games";
		case "PROTOTYPE":
			return "Prototype";
		case "MURDER_MYSTERY":
			return "Murder Mystery";
		case "BUILD_BATTLE":
			return "Build Battle";
		case "DUELS":
			return "Duels";
		case "SKYBLOCK":
			return "SkyBlock";
		case "PIT":
			return "Pit";
		default:
			return "None";
	}
};

var ObjectforEach = function (collection, callback, scope) {
	if (Object.prototype.toString.call(collection) === "[object Object]") {
		for (var prop in collection) {
			if (Object.prototype.hasOwnProperty.call(collection, prop)) {
				callback.call(scope, collection[prop], prop, collection);
			}
		}
	} else {
		for (var i = 0, len = collection.length; i < len; i++) {
			callback.call(scope, collection[i], i, collection);
		}
	}
};

String.prototype.capitalizeFirst = function () {
	return (
		this.toString().charAt(0).toUpperCase() +
		this.toString().slice(1).toLowerCase()
	);
};

String.prototype.toTimeString = function () {
	let num = this.toString();
	if (num < 60) return `${num}m`;
	let hours = num / 60;
	let rhours = Math.floor(hours);
	let minutes = (hours - rhours) * 60;
	let rminutes = Math.round(minutes);
	return `${rhours}h ${rminutes}m`;
};

function pad(n) {
	return n < 10 ? "0" + n : n;
}

module.exports = {
	name: "player",
	description: "Featches hypixel informations for a argued minecraft username.",
	usage: "player <Str:minecraft_username>",
	aliases: ["hypixel"],
	category: "hypixel",
	cooldown: 3,
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		if (!args[0]) return message.channel.send(lang.HYPIXEL.ARGUE_A_USERNAME);

		const tinodata = { rank: {}, user: {} };

		hypixel.getPlayerByName(key, `${args[0]}`).then((user) => {
			if (
				!user.success ||
				user.success == false ||
				user.player == null ||
				user.player == undefined ||
				!user.player
			) {
				return message.channel.send(lang.HYPIXEL.NO_DATA);
			}
			hypixel.getGuildByPlayer(key, `${user.player.uuid}`).then((guild) => {
				switch (user.player.newPackageRank) {
					case "MVP_PLUS":
						tinodata.rank.displayName = "[MVP+]";
						tinodata.rank.name = "MVP+";
						tinodata.rank.color = minecraftColorToHex("AQUA");
						break;
					case "MVP":
						tinodata.rank.displayName = "[MVP]";
						tinodata.rank.name = "MVP";
						tinodata.rank.color = minecraftColorToHex("AQUA");
						break;
					case "VIP_PLUS":
						tinodata.rank.displayName = "[VIP+]";
						tinodata.rank.name = "VIP+";
						tinodata.rank.color = minecraftColorToHex("GREEN");
						break;
					case "VIP":
						tinodata.rank.displayName = "[VIP]";
						tinodata.rank.name = "VIP";
						tinodata.rank.color = minecraftColorToHex("GREEN");
						break;
					default:
						tinodata.rank.displayName = "";
						tinodata.rank.name = "None";
						tinodata.rank.color = minecraftColorToHex("GRAY");
				}

				if (user.player.monthlyPackageRank == "SUPERSTAR") {
					tinodata.rank.displayName = "[MVP++]";
					tinodata.rank.name = "MVP++";
					tinodata.rank.color = minecraftColorToHex("GOLD");
				}

				if (user.player.rank != undefined) {
					let rank = user.player.rank;

					if (rank == "YOUTUBER") {
						tinodata.rank.displayName = "[YouTuber]";
						tinodata.rank.name = "YouTuber";
						tinodata.rank.color = minecraftColorToHex("RED");
					} else {
						tinodata.rank.displayName = "[" + rank.capitalizeFirst() + "]";
						tinodata.rank.name = tinodata.rank.displayName
							.slice(1, tinodata.rank.displayName.length - 1)
							.capitalizeFirst();
						tinodata.rank.color = minecraftColorToHex("RED");
					}
				}

				if (user.player.prefix != undefined) {
					let prefix = user.player.prefix;

					tinodata.rank.displayName = `[${prefix
						.replace(
							/[\[\]]|(\§a)|(\§b)|(\§c)|(\§d)|(\§e)|(\§f)|(\§0)|(\§9)|(\§8)|(\§7)|(\§6)|(\§5)|(\§4)|(\§3)|(\§2)|(\§1)|(\§b)|(\§l)|(\§c)|(\§s)|(\§n)|(\§r)/gim,
							""
						)
						.capitalizeFirst()}]`;
					tinodata.rank.name = tinodata.rank.displayName
						.slice(1, tinodata.rank.displayName.length - 1)
						.capitalizeFirst();
					tinodata.rank.color = minecraftColorToHex("RED");
				}

				if (user.player.rankPlusColor)
					tinodata.rank.color = minecraftColorToHex(user.player.rankPlusColor);
				if (user.player.userLanguage)
					tinodata.user.language = user.player.userLanguage.capitalizeFirst();
				else tinodata.user.language = "N/A";
				if (
					user.player.mcVersionRp &&
					user.player.mcVersionRp != undefined &&
					user.player.mcVersionRp != ""
				)
					tinodata.user.version = user.player.mcVersionRp;
				else tinodata.user.version = "N/A";
				if (
					guild &&
					guild.guild &&
					guild.guild != undefined &&
					guild.guild != null &&
					guild.success == true &&
					guild.guild.name != undefined &&
					guild.guild.name
				)
					tinodata.user.guild = `[${
						guild.guild.name
					}](https://hypixel.net/guilds/${guild.guild.name_lower.replace(
						/[ ]/,
						"+"
					)})`;
				else tinodata.user.guild = "N/A";
				if (
					user.player.mostRecentGameType &&
					user.player.mostRecentGameType != undefined
				)
					tinodata.user.recentGameType = user.player.mostRecentGameType.toCleanGameType();

				tinodata.user.level = Math.ceil(
					(Math.sqrt(user.player.networkExp + 15312.5) - 125 / Math.sqrt(2)) /
						(25 * Math.sqrt(2))
				);

				let lastLogin = new Date(user.player.lastLogin);
				let firstLogin = new Date(user.player.firstLogin);

				const embed = BaseEmbed(message)
					.setTitle(`${user.player.displayname}`)
					.setURL(`https://namemc.com/profile/${user.player.uuid}`)
					.addField(lang.HYPIXEL.RANK, tinodata.rank.name, true)
					.addField(
						lang.HYPIXEL.KARMA_POINTS,
						user.player.karma == undefined ? 0 : user.player.karma,
						true
					)
					.addField(lang.HYPIXEL.LEVEL, tinodata.user.level, true)
					.addField(lang.HYPIXEL.LANGUAGE, tinodata.user.language, true)
					.addField(lang.HYPIXEL.VERSION, tinodata.user.version, true)
					.addField(lang.HYPIXEL.GUILD, tinodata.user.guild, true)
					.addField(
						lang.HYPIXEL.RECENT_GAME,
						tinodata.user.recentGameType == undefined
							? "N/A"
							: tinodata.user.recentGameType,
						true
					)
					.addField(
						lang.HYPIXEL.FIRST_LOGIN,
						`${pad(firstLogin.getDate())}/${pad(
							firstLogin.getMonth() + 1
						)}/${firstLogin.getFullYear()} - ${pad(
							firstLogin.getHours()
						)}:${pad(firstLogin.getMinutes())}`,
						true
					)
					.addField(
						lang.HYPIXEL.LAST_LOGIN,
						`${pad(lastLogin.getDate())}/${pad(
							lastLogin.getMonth() + 1
						)}/${lastLogin.getFullYear()} - ${pad(lastLogin.getHours())}:${pad(
							lastLogin.getMinutes()
						)}`,
						true
					)
					.setThumbnail(
						`https://visage.surgeplay.com/head/512/${user.player.uuid}`
					)
					.setImage(
						`https://visage.surgeplay.com/full/512/${user.player.uuid}`
					);

				if (
					user.player.socialMedia != undefined &&
					user.player.socialMedia.links
				) {
					embed.addField(`\u200b`, `\u200b`);
					ObjectforEach(
						user.player.socialMedia.links,
						function (value, prop, obj) {
							if (prop == "HYPIXEL")
								value = `[${value.split("/")[4].split(".")[0]}](${value})`;
							if (prop == "TWITTER")
								value = `[${value.split("/")[3]}](${value})`;
							if (prop == "INSTAGRAM")
								value = `[${value.split("/")[3]}](${value})`;
							if (prop == "MIXER") value = `[${value.split("/")[3]}](${value})`;
							if (prop == "TWITCH")
								value = `[${value.split("/")[3]}](${value})`;
							if (
								prop == "YOUTUBE" &&
								(value.toLowerCase().includes("/channel/") ||
									value.toLowerCase().includes("/user/") ||
									value.toLowerCase().includes("/c/"))
							)
								value = `[${value.split("/")[4]}](${value})`;
							if (
								prop == "YOUTUBE" &&
								!(
									value.toLowerCase().includes("/channel/") ||
									value.toLowerCase().includes("/user/") ||
									value.toLowerCase().includes("/c/")
								)
							)
								value = `[${value.split("/")[3]}](${value})`;
							embed.addField(`**${prop.capitalizeFirst()}**`, `${value}`, true);
						}
					);
				}
				return message.channel.send(embed);
			});
		});

	},
};
