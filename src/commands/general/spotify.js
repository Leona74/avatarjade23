/**
 * TODO:
 * Fix the elapsed time bug.
 *
 * @format
 */

const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
	name: "spotify",
	category: "general",
	aliases: ["spot"],
	description:
		"Shows spotify rich presence. (only if user is listening to something with linked spotify)",
	usage: "spotify <User:user_mention>",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);

		function formatDate(timestamp) {
			let startTime = timestamp;
			let endTime = Date.now();
			let totalSeconds = (endTime - startTime) / 1000;

			let hours = Math.floor(totalSeconds / 3600);
			let minutes = Math.floor((totalSeconds % 3600) / 60);
			let seconds = Math.floor((totalSeconds % 3600) % 60);

			return `${hours >= 1 ? ("0" + hours).slice(-2) + ":" : ""}${(
				"0" + minutes
			).slice(-2)}:${("0" + seconds).slice(-2)}`;
		}

		let member = bot.findMember(message, args, true);

		member.user.presence.activities.forEach((activity) => {
			if (
				activity.type === "LISTENING" &&
				activity.name === "Spotify" &&
				activity.assets !== null
			) {
				const trackIMG = `https://i.scdn.co/image/${activity.assets.largeImage.slice(
					8
				)}`;
				const trackURL = `https://open.spotify.com/track/${activity.syncID}`;
				const trackName = activity.details;
				const trackAuthor = activity.state?.replace(/;/g, ",");

				if (!trackURL & !trackName & !trackAuthor & !trackIMG)
					return message.channel.send(lang.GENERAL.SPOTIFY_NOT_LISTED_ON);

				const embed = new MessageEmbed()
					.setTitle(trackAuthor + " - " + trackName)
					.setURL(trackURL)
					.setColor("#36393e")
					.setThumbnail(trackIMG)
					.setDescription(
						stripIndents`
          ${lang.GENERAL.SPOTIFY_INFO}
          ${trackName}
          ${trackAuthor}
          ${formatDate(new Date(activity.timestamps.start).getTime())} ${
							lang.GENERAL.WHOIS_ELAPSED_TIMESTAMPS
						}
          `
					)
					.setFooter(
						"Spotify",
						"https://nektony.com/wp-content/uploads/2019/08/spotify-icon-55x55.png"
					);
				message.channel.send(embed);
			}
		});
	},
};
