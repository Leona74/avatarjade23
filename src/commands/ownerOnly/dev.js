/**
 * NOTES:
 * New menu only for devs
 *
 * @format
 */

const BaseEmbed = require("../../modules/BaseEmbed");
const { owners } = require("../../../config.json");
const categories = require("../../data/categories-dev.json");
const { stripIndents } = require("common-tags");

module.exports = {
	name: "dev",
	description: "Display the devsOnly commands.",
	category: "ownerOnly",
	usage: "dev <Str:command_name>",
	ownerOnly: true,
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const guild = await bot.getGuildById(message.guild.id);
		const prefix = guild.prefix;
		const cmdArgs = args[0];
		const isBotOwner = owners.includes(message.author.id);

		function getTargetEmojiByStatus(status, mobile) {
			switch (status) {
				case "dnd":
					return "<:charliewave_dnd:771635335486111744>";
				case "idle":
					return "<:charliewave_idle:771635289839501333>";
				case "offline":
					return "<:charliewave_offline:771635390871502858>";
				case "online":
					return mobile === "online"
						? "<:charliewave_mobile:771635443698499584>"
						: "<:charliewave_online:771635233384693791>";
			}
		}
		
		const commands = [...bot.commands.array()];

		if (cmdArgs && categories.includes(cmdArgs.toLowerCase())) {
			const cmds = commands
				.filter(({ category }) => category === cmdArgs.toLowerCase())
				.map(({ name }) => name)
				.join(", ");

			if (cmds.length < 0) {
				return message.channel.send(lang.HELP.CAT_NOT_EXIST);
			}

			const embed = BaseEmbed(message)
				.setTitle(`${lang.HELP.COMMANDS}\n${cmdArgs}`)
				.setThumbnail(
					"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5c709219-8811-46be-838d-2e8ca9143dc9/ddw3h8b-5dd50e8b-32f3-4d51-9328-e55cab4aa546.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNWM3MDkyMTktODgxMS00NmJlLTgzOGQtMmU4Y2E5MTQzZGM5XC9kZHczaDhiLTVkZDUwZThiLTMyZjMtNGQ1MS05MzI4LWU1NWNhYjRhYTU0Ni5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.lvs8BLMeArKxgsA00_mTajbXsO_AC4Yj-40rUQS41bI"
				);

			if (cmdArgs === "ownerOnly") {
				if (isBotOwner) {
					embed.setDescription(`\`${cmds}\``);
				} else {
					embed.setDescription(lang.HELP.OWNER_ONLY);
				}
			} else {
				embed.setDescription(`\`${cmds}\``);
			}
			return message.channel.send({ embed });
		} else if (cmdArgs) {
			const cmd = commands.find(
				(cmd) => cmd.name.toLowerCase() === cmdArgs.toLowerCase()
			);
			if (!cmd) return message.channel.send(lang.HELP.CMD_NOT_FOUND);

			let aliases;
			let options;
			let cooldown;
			let memberPerms;
			let botPerms;

			const embed = BaseEmbed(message)
				.setTitle(`${cmd.name.capitalizeFirst()} command.`)
				.setDescription(`${lang.HELP.CUSTOM_CMD}`);

			if (cmd.category !== "custom") {
				aliases = cmd.aliases ? cmd.aliases.map((alias) => alias) : "N/A";
				options = cmd.options ? cmd.options.map((option) => option) : "N/A";
				cooldown = cmd.cooldown ? `${cmd.cooldown}s` : "N/A";
				memberPerms = !cmd.memberPermissions
					? "N/A"
					: [...cmd.memberPermissions].map((p) => p);

				botPerms = !cmd.botPermissions
					? ["SEND_MESSAGES"].map((p) => p)
					: [...cmd.botPermissions, "SEND_MESSAGES"].map((p) => p);

				embed
					.setDescription(
						stripIndents`
          ${cmd.description ? cmd.description : "N/A"}`
					)
					.setThumbnail(
						"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5c709219-8811-46be-838d-2e8ca9143dc9/ddw3h8b-5dd50e8b-32f3-4d51-9328-e55cab4aa546.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNWM3MDkyMTktODgxMS00NmJlLTgzOGQtMmU4Y2E5MTQzZGM5XC9kZHczaDhiLTVkZDUwZThiLTMyZjMtNGQ1MS05MzI4LWU1NWNhYjRhYTU0Ni5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.lvs8BLMeArKxgsA00_mTajbXsO_AC4Yj-40rUQS41bI"
					)
					.addField(lang.HELP.ALIASES, aliases, true)
					.addField(lang.HELP.CATEGORY, cmd.category, true)
					.addField(lang.HELP.COOLDOWN, cooldown, true)
					.addField(lang.HELP.OPTIONS, options)
					.addField(lang.HELP.BOTPERMS, botPerms, true)
					.addField(lang.HELP.MEMBERPERMS, memberPerms, true)
					.setFooter(
						cmd.usage ? `${prefix}${cmd.usage}` : lang.HELP.USAGENOTDEFINIED
					);
			}

			return message.channel.send(embed);
		}

		const cates = [];

		for (let i = 0; i < categories.length; i++) {
			const category = commands
				.filter(({ category }) => category === categories[i])
				.map(({ name }) => name);

			cates.push(category);
		}

		const botDescHelp = lang.HELP.TAB_INFORMATIONS.replace("{prefix}", prefix);

		const embed = BaseEmbed(message);

		for (let i = 0; i < cates.length; i++) {
			const name = lang.HELP.CATEGORIES[categories[i]];

			embed.addField(name, `${cates[i].join(", ")}`);
		}

		embed
			.setTitle(
				`${message.client.user.username} ${getTargetEmojiByStatus(
					message.client.presence.status,
					message.client.presence.clientStatus != undefined &&
						message.client.presence.clientStatus.mobile
				)}`
			)
			.setDescription(botDescHelp)
			.setThumbnail(
				bot.user.avatarURL({ dynamic: true, size: 2048, format: "png" })
			);

		message.channel.send(embed);
	},
};
