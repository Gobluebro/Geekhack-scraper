module.exports = async function(browser) {
  const page = await browser.newPage();
  // group buy page
  await page.goto("https://geekhack.org/index.php?board=70.0");
  const threadLinks = await page.evaluate(() => {
    let linkTable = document.querySelector("table.table_grid");
    let linkTableRows = linkTable.querySelectorAll(
      "tr:not(.windowbg2):not(.catbg)"
    );
    let hyperlinks = [];
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
    return hyperlinks;
  });
  await page.close();
  return threadLinks;
};
