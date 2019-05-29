const request = require("request-promise");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = async () => {
  // group buy page
  var url = "https://geekhack.org/index.php?board=70.0";
  var hyperlinks = [];
  await request(url)
    .then(function(response) {
      const dom = new JSDOM(response);

      let linkTable = dom.window.document.querySelector("table.table_grid");
      let linkTableRows = linkTable.querySelectorAll(
        "tr:not(.windowbg2):not(.catbg)"
      );
      for (let i = 0; i < linkTableRows.length; i++) {
        if (!linkTableRows[i].children[0].className.includes("stickybg")) {
          let tempLink =
            linkTableRows[i].children[2].children[0].children[0].children[0]
              .href;
          tempLink =
            "https://geekhack.org/index.php?" +
            tempLink.split("?")[1].split("&")[1];

          hyperlinks.push(tempLink);
        }
      }
    })
    .catch(function(err) {
      console.log("request failed");
      console.error(err);
    });
  return hyperlinks;
};
