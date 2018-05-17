const path = require("path");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },

    devServer: {
        contentBase: path.resolve(__dirname, "./dist"),
        historyApiFallback: true,
        inline: true,
        open: true
    },
    devtool: "eval-source-map"
}