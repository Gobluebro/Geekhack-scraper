module.exports = {
  topicEnum: function() {
    const topicEnum = Object.freeze({
      IC: 0,
      GB: 1
    });
    return topicEnum;
  }
  // https://www.sitepoint.com/understanding-module-exports-exports-node-js/
  // ,
  //   anotherFunction: function() {
  //     return "Hola";
  //   }
};
