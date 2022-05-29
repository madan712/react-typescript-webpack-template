const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");

module.exports = {
	mode: "production",
	entry: ["@babel/polyfill", "./src/index.tsx"],
	output: {
		filename: "main.[contenthash].js",
		path: path.resolve(__dirname, "dist")
	},
	resolve: {
		extensions: [".js", ".ts", ".tsx", ".css"]
	},
	performance: {
		hints: false
	},
	devServer: {
		historyApiFallback: true,
	},
	module: {
		rules: [{
			test: /\.(ts|tsx)$/,
			exclude: /node_modules/,
			use: ["babel-loader"]
		},
		{
			test: /\.css$/,
			use: [MiniCssExtractPlugin.loader, "css-loader"]
		}, {
			test: /\.html$/,
			use: ["html-loader"]
		}]
	},
	plugins: [new HtmlWebpackPlugin({
		template: "./public/index.html",
		favicon: "./public/favicon.ico",
	}), 
	new InterpolateHtmlPlugin({PUBLIC_URL: "public" }),
	new MiniCssExtractPlugin({
		filename: "style.[contenthash].css"
	})]
}