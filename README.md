# Weather For You

> This is a weather app that displays the weather forecast for 4 days.

![screenshot](./img/preview.PNG)

## The weather app displays weather data for the location entered in the search bar or by obtaining the location of the deviceif user allows location access

- The units of the weather data are in metric by default, but can be switched to imperial based on user's preference with a toggle button provided.
- The preferred unit of the user is saved so the user won't have to select it again on reload.
- The user input is screened to prevent useless HTTP requests.

## Built With

- HTML, CSS, JavaScript
- OpenWeatherMap Api, Geo-location Api, Geo-coder Api,
- Fetch API, Async, Await.

- WEBPACK
- Implement webpack with various plugins to bundle `js`, minify `css`, and create a `HTMl` template.
- Split `webpack` config into two modes `production` and `development`.
- Create a common webpack config and use a `webpack-merge` plugin to keep things `DRY` in production and development configs.
- Load `DateTime` from `luxon` library.
- The Google `workbox` plugin is used to precache application shell to make it work offline
- Various webpack plugins were used for this project.

  - HTMLWebpackPlugin
  - MiniCssExtractPlugin
  - OptimizeCSSAssetsPlugin
  - CssMinimizerPlugin
  - CleanWebpackPlugin
  - WorkboxWebpackPlugin
  - CopyPlugin
  - TerserPlugin to minimze bundle size

- Service Worker
- Workbox Plugin is used to precache necessary URLS to enable site to work offline, so as to make it a fully Progressive Web App

## Live Demo

[Live Demo Link](https://weather-4-you.netlify.app/)

### Development (Running locally)

- Clone the project

```bash
git clone https://github.com/Lanr3waju/weather-for-you.git

```

- Install Dependencies

```bash
npm install
```

To run StyleLint by itself, you may run the lint task:

```bash
npm run lint:check
```

Or to automatically fix issues found (where possible):

```bash
npm run lint
```

You can also check against Prettier:

```bash
npm run format:check
```

and to have it actually fix (to the best of its ability) any format issues, run:

```bash
npm run format
```

You can also check against HTML Validator:

```bash
npm run html-validator
```

## Style Guides

- [CSS Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/css.html)
- [HTML Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/index.html)
- [JavaScript Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html)
- [Git Style Guide](https://udacity.github.io/git-styleguide/)

## 👤 Author

- Github: [@author](https://github.com/lanr3waju)
- Twitter: [@author](https://twitter.com/abass-wasi)
- Linkedin: [@author](https://www.linkedin.com/in/abass-abdul-wasi-53883422a/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](https://github.com/Lanr3waju/weather-for-you/issues/4#issue-1384916250).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- [openWeatherMap](https://openweathermap.org/)
- [openCage Geocoding Api](https://opencagedata.com/api)
- [Bgjar SVG](https://bgjar.com/)
- [amCharts Weather Icons](https://www.amcharts.com/)
- [SVG Backgrounds](https://www.svgbackgrounds.com/)

## 📝 License

[MIT licensed](./LICENSE).
