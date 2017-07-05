const path = require('path');

module.exports = {
    entry: "./src/App.jsx", // входная точка - исходный файл
    output:{
        path: path.resolve(__dirname + "/public/js"),     // путь к каталогу выходных файлов
        filename: "bundle.js"       // название создаваемого файла
    },
    resolve:{   
        extensions: [".js", ".jsx", '.css', '.scss', '.less'] // расширения для загрузки модулей
    },
    module:{
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.css$/,
            loader: ["style-loader", "css-loader"]
        },
        {
            test: /\.scss$/,
            loader: ["style-loader", "css-loader", "sass-loader"]
        },
        {
            test: /\.less$/,
            loader: ["style-loader", "css-loader", "less-loader"]
        },
        {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
        }]
    }
}