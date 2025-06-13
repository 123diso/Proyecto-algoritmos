import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Limpia dist al recompilar
  },
  mode: 'development',
  devtool: 'source-map', // Mejor depuración
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Servir /public
    },
    compress: true,
    historyApiFallback: true,
    port: 8085,
    open: true, // Abre el navegador automáticamente
    hot: true, // HMR (Hot Module Replacement)
    watchFiles: ['src/**/*', 'public/**/*'], // Para reiniciar al editar
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
  },
};
