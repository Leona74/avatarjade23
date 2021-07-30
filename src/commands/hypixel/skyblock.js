/**
 * NOTES:
 * Hypixel api reborn is a bit old for some new features.
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");
const ssn = require("short-string-number");
const fetch = require("cross-fetch");

module.exports = {
	name: "skyblock",
	description:
		"Featches hypixel skyblock informations for a argued minecraft username.",
	usage: "skyblock <Str:minecraft_username>",
	category: "hypixel",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		if (!args.length)
			return message.channel.send(lang.HYPIXEL.ARGUE_A_USERNAME);

		fetch(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`)
			.then((result) => result.json())
			.then(async ({ id, name }) => {
				const fetchProf = await fetch(
					`https://api.slothpixel.me/api/skyblock/profile/${args[0]}`
				);
				const playerUUIDFetch = await fetch(
					`https://api.mojang.com/users/profiles/minecraft/${args[0]}`
				);
				const playerUUIDData = await playerUUIDFetch.json();
				const profileData = await fetchProf.json();

				if (!playerUUIDData && !profileData) {
					return message.channel.send(lang.HYPIXEL.NO_DATA);
				}

				const embed = BaseEmbed(message)
					.setTitle(`${name}`)
					.setURL(`https://namemc.com/profile/${playerUUIDData.id}`)
					.setDescription(profileData.cute_name);

				if (
					profileData.members[id].armor[3].name != null ||
					(profileData.members[id].armor[3].name != undefined &&
						profileData.members[id].armor[2].name != null) ||
					(profileData.members[id].armor[2].name != undefined &&
						profileData.members[id].armor[2].name != null) ||
					(profileData.members[id].armor[2].name != undefined &&
						profileData.members[id].armor[1].name != null) ||
					profileData.members[id].armor[1].name != undefined
				)
					embed.addField(
						"<:tank_adaptive_chestplate:852567374145519656> Armor:",
						profileData.members[id].armor[3].name
							.replace(/§/g, "")
							.replace(/\d+/, "")
							.replace("d", "")
							.replace("f", "")
							.replace(/6/g, "") +
							`\n` +
							profileData.members[id].armor[2].name
								.replace(/§/g, "")
								.replace(/\d+/, "")
								.replace("d", "")
								.replace("f", "")
								.replace(/6/g, "") +
							`\n` +
							profileData.members[id].armor[1].name
								.replace(/§/g, "")
								.replace(/\d+/, "")
								.replace("d", "")
								.replace("f", "")
								.replace(/6/g, "") +
							`\n` +
							profileData.members[id].armor[0].name
								.replace(/§/g, "")
								.replace(/\d+/, "")
								.replace("d", "")
								.replace("f", "")
								.replace(/6/g, "")
					);
				embed.addField(
					"<:Enchantment_Table:852572393842671636> Stats:",
					`<:Health_icon:852570156261834762> ${profileData.members[id].attributes.health} | <:Absorption_icon:852570156110184489> ${profileData.members[id].attributes.effective_health} \n<:Defense_icon:852570156211503109> ${profileData.members[id].attributes.defense} | <:Strength_icon:852570155966791692> ${profileData.members[id].attributes.strength}\n<:Speed_icon:852570156198133790> ${profileData.members[id].attributes.speed}% | <:Intelligence_icon:852570156239683594> ${profileData.members[id].attributes.intelligence}`,
					true
				);

				let petStatsContainter;

				const petStatistics = `[LVL ${
					profileData.members[id].active_pet.level
				}] ${profileData.members[id].active_pet.name}\nRarity: ${
					profileData.members[id].active_pet.rarity
				}\nExp: ${ssn(profileData.members[id].active_pet.exp)}`;

				if (petStatistics != null || petStatistics != undefined)
					petStatsContainter = petStatistics;

				if (petStatsContainter.includes("undefined"))
					petStatsContainter = "No Active Pet";

				embed.addField(
					"<:Bee_Pet:852572171942363147> Active Pet:",
					petStatsContainter,
					true
				);
				embed.addField(
					"<:Auctions_Icon:852576559319220275> Auctions:",
					`Fees: ${ssn(
						profileData.members[id].stats.auctions.total_fees
					)}\nEarnings: ${ssn(
						profileData.members[id].stats.auctions.gold_earned
					)}\nSpent: ${ssn(profileData.members[id].stats.auctions.gold_spent)}`,
					true
				);
				embed.addField(
					"<:Skills_Icon:852573240597413908> Average Skill Level:",
					profileData.members[id].average_skill_level,
					true
				);
				embed.addField(
					"<:Fairy_Icon:852573240597020693> Fairy Souls:",
					`${profileData.members[id].fairy_souls_collected}/227`,
					true
				);
				embed.addField(
					"<:cutlass:853269941092089866> Highest Damage:",
					ssn(profileData.members[id].stats.highest_critical_damage),
					true
				);
				embed.addField(
					"<:White_Gift:852582133095858189> Gifts:",
					`Given: ${profileData.members[id].stats.gifts_given.toFixed(
						1
					)}\nReceived: ${profileData.members[id].stats.gifts_received.toFixed(
						1
					)}`,
					true
				);

				let BankStatsContainter;

				const BankStatistics = `Bank: ${ssn(
					profileData.banking.balance
				)}\nPurse: ${ssn(profileData.members[id].coin_purse)}`;

				if (BankStatistics != null || BankStatistics != undefined)
					BankStatsContainter = BankStatistics;

				if (BankStatsContainter.includes("null")) BankStatsContainter = "0";

				embed.addField(
					"<:Coins:852582293818310656> Coins:",
					BankStatsContainter,
					true
				);
				embed.addField(
					"<:St:852584176459710474> Jerry's Workshop",
					`Snowballs Hits: ${profileData.members[
						id
					].stats.winter_records.snowballs_hit.toFixed(
						1
					)}\nDamage: ${profileData.members[
						id
					].stats.winter_records.damage.toFixed(1)}`,
					true
				);
				embed.setThumbnail(
					`https://visage.surgeplay.com/head/512/${playerUUIDData.id}`
				);

				return message.channel.send(embed);
			});
	},
};
