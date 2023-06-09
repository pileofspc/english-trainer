const path = require("path");
const fs = require("fs");

function getFilesOfExt(filepath, ...ext) {
    return fs
        .readdirSync(filepath, { withFileTypes: true })
        .filter((dirEnt) => {
            let lowerCaseName = dirEnt.name.toLowerCase();
            let result = false;
            for (let i = 0; i < ext.length; i++) {
                if (dirEnt.isFile() && lowerCaseName.endsWith(ext[i])) {
                    result = true;
                    break;
                }
            }
            return result;
        })
        .map((dirEnt) => dirEnt.name);
}

function getFolders(filepath) {
    return fs
        .readdirSync(filepath, { withFileTypes: true })
        .filter((dirEnt) => !dirEnt.isFile())
        .map((dirEnt) => dirEnt.name);
}

function getFoldersWithHtml(filepath) {
    return fs
        .readdirSync(filepath, { withFileTypes: true })
        .filter((dirEnt) => !dirEnt.isFile())
        .filter(
            (dirEnt) =>
                getFilesOfExt(path.resolve(dirEnt.path, dirEnt.name), "html")
                    .length
        )
        .map((dirEnt) => dirEnt.name);
}

function getCssPlugin(exp) {
    for (let item of exp.plugins) {
        if (item.constructor.pluginName === "mini-css-extract-plugin") {
            return item;
        }
    }
}

function absPathToJsconfigArray(pathString) {
    return [
        `${path
            .relative(path.resolve(__dirname, "../"), pathString)
            .replace(/\\/g, "/")}/*`,
    ];
}

function resolveAliases(pathString, webpackAliases) {
    let resolved = pathString;
    if (pathString.startsWith("~")) {
        pathString = pathString.slice(1);
    }
    if (pathString.startsWith("/")) {
        resolved = path.resolve(__dirname, "../", pathString.slice(1));
        return resolved;
    }

    for (const alias in webpackAliases) {
        if (pathString.startsWith(alias)) {
            resolved = path.join(
                webpackAliases[alias],
                pathString.slice(alias.length + 1)
            );
            break;
        }
    }
    return resolved;
}

const PATH = path.resolve(__dirname);

exports = module.exports = {
    getFilesOfExt,
    getFolders,
    getCssPlugin,
    getFoldersWithHtml,
    absPathToJsconfigArray,
    resolveAliases,
    PATH,
};
