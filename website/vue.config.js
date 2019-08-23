// change the rule to add the i at the end so that it is case insensitive so JPG works as well
module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/Geekhack-scraper/" : "/",
  chainWebpack: config => {
    config.module.rule("images").test(/\.(png|jpe?g|gif|webp)(\?.*)?$/i);
  }
};
