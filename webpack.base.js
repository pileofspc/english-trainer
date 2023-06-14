const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const helpers = require("./webpack-helpers/webpack-helpers");

const PATHS = {
    root: path.resolve(__dirname),
    helpers: helpers.PATH,
    jsconfig: path.resolve(__dirname, "jsconfig.json"),
    src: path.resolve(__dirname, "src"),
    dist: path.resolve(__dirname, "dist"),

    pages: path.resolve(__dirname, "src", "pages"),
    modules: path.resolve(__dirname, "src", "modules"),
    components: path.resolve(__dirname, "src", "components"),
    assets: path.resolve(__dirname, "src", "assets"),
    images: path.resolve(__dirname, "src", "assets", "images"),
    styles: path.resolve(__dirname, "src", "assets", "styles"),
    static: path.resolve(__dirname, "src", "static"),
    stores: path.resolve(__dirname, "src", "stores"),
    types: path.resolve(__dirname, "src", "types.ts"),

    distJs: ".",
    distAssets: "assets",
    distCss: "assets/css",
    distImg: "assets/images",

    distStatic: path.resolve(__dirname, "dist", "static"),
};

const entries = {};

// Array of names of *.html files:
const pages = helpers.getFoldersWithHtml(PATHS.pages);

// Array of HtmlWebpackPlugin entries for PAGES:
const htmlPluginPages = pages.map(
    (page) =>
        new HtmlWebpackPlugin({
            template: path.join(PATHS.pages, page, `${page}.html`),
            filename: `${page}.html`,
            chunks: [path.parse(page).name],
        })
);

// Js entries for each page of PAGES:
pages.forEach((page) => {
    let entryName = path.parse(page).name;
    let filePath = path.join(PATHS.pages, entryName, `${entryName}.js`);
    if (fs.existsSync(filePath)) {
        entries[entryName] = filePath;
    }
});

module.exports = exports = {
    PATHS,
    entries,
    pages,
    htmlPluginPages,

    webpackBase: {
        resolve: {
            extensions: [".ts", ".tsx", "..."],
            alias: {
                "@root": PATHS.root,
                "@modules": PATHS.modules,
                "@components": PATHS.components,
                "@pages": PATHS.pages,
                "@styles": PATHS.styles,
                "@images": PATHS.images,
                "@stores": PATHS.stores,
                "@types": PATHS.types,
            },
        },
        entry: entries,
    },
};
