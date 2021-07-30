/**
 * NOTES:
 * Sometimes the API fetches wrong data.
 *
 * @format
 */

const fetch = require("node-fetch");
const { openWeatherMapKey } = require("../../../config.json");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
	name: "weather",
	description: "Meteo informations about a submitted location.",
	category: "general",
	usage: "weather <Str:location>",
	async execute(bot, message, args) {
		const lang = await bot.getGuildLang(message.guild.id);
		const query = args.join(" ");

		if (!query) {
			return message.channel.send(lang.GENERAL.PROVIDE_COUNTRY_ARGS);
		}

		const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
			query
		)}&appid=${openWeatherMapKey}&units=metric`;
		const data = await fetch(url).then((res) => res.json());

		if (data.cod === 401) {
			return message.channel.send(lang.GENERAL.WEATHER_ERROR);
		}

		if (data.cod === "404") {
			return message.channel.send(
				lang.GENERAL.WEATHER_NOT_OK.replace("{query}", query)
			);
		}

		const main = data.weather[0].main;
		const desc = data.weather[0].description;
		const icon = data.weather[0].icon;
		const feelsLike = data.main.feels_like;
		const temp = data.main.temp;
		const windSpeed = data.wind.speed;
		const windDeg = data.wind.deg;
		const country = data.sys.country;

		const embed = BaseEmbed(message)
			.setTitle(`${data.name}`)
			.addField(`**${lang.GENERAL.WEATHER_MAIN}:**`, main, true)
			.addField(`**${lang.GENERAL.WEATHER_COUNTRY}:**`, desc, true)
			.addField(`**${lang.GENERAL.WEATHER_CUR_TEMP}:**`, `${temp}°C`, true)
			.addField(
				`**${lang.GENERAL.WEATHER_FEELS_LIKE}:**`,
				`${feelsLike}°C`,
				true
			)
			.addField(
				`**${lang.GENERAL.WEATHER_WIND_SPEED}:**`,
				`${windSpeed}Km/h`,
				true
			)
			.addField(`**${lang.GENERAL.WEATHER_WIND_DEE}:**`, windDeg, true)
			.addField(`**${lang.GENERAL.WEATHER_COUNTRY}:**`, country)
			.setThumbnail(`https://openweathermap.org/img/wn/${icon}@2x.png`);

		message.channel.send({ embed });
	},
};
