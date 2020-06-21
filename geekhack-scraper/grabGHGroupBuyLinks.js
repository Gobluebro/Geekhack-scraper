const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = async (url) => {
  var hyperlinks = [];
  try {
    let response = await axios.get(url);
    const dom = new JSDOM(response.data);

    let linkTable = dom.window.document.querySelector("table.table_grid");
    let linkTableRows = linkTable.querySelectorAll(
      "tr:not(.windowbg2):not(.catbg)"
    );

    for (let i = 0; i < linkTableRows.length; i++) {
      if (!linkTableRows[i].children[0].className.includes("stickybg")) {
        let tempLink =
          linkTableRows[i].children[2].children[0].children[0].children[0].href;
        tempLink =
          "https://geekhack.org/index.php?" +
          tempLink.split("?")[1].split("&")[1];

        hyperlinks.push(tempLink);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    return hyperlinks;
  }
};
