# Geekhack Scraper

## Motivation

I believe that for the average user, keeping up with keyboard group buys can be somewhat tedious. I believe there are people that are interested in getting something custom but they do not have the time to keep up with everything and they eventually feel that they really missed out.

I think Drop (formly known as Massdrop) is a good example of grabbing enough attention for average users. I think being able to see a photo of the group buy along with a title is a lot better than clicking through every single group buy on a forum like Geekhack just to see what it looks like. So I made this project to hopefully bring more attention to group buys.

I'm also trying to alleviate these community upheld lists with automation.

**Requests for something like this to be made:**

- [IC Group Buy List](https://old.reddit.com/r/MechanicalKeyboards/comments/bmdtlo/ic_group_buy_list/)

**Community Made and Curated Lists:**

- [LIST OF CURRENTLY RUNNING COMUNITY AND VENDOR GROUP BUYS](https://geekhack.org/index.php?topic=57761.0)
- [Keycap Calendar](http://keycaplendar.com/)

Just wanted to mention that this web scraping shouldn't be a replacement for things like:

- [Top Clack](https://www.youtube.com/c/topclack)
- [Man Of Interests](https://youtube.com/manofinterests)
- Actually going to the group buy page for information about the group buy

It should be used just to spark interest enough for a user to click a link to go to the geekhack thread.

## Difficulties in this solution

Since this solution is based on automated scraping of data and then displaying said data, issues arise when you cannot predict how someone might structure their post.

The main issue that I have come across when you scrape a photo is it's hard to know if that photo is important or not. I currently take the same photo order that is on the original post.

Grabbing the vendors from a page are difficult as well. I'm attempting to grab them through the base domain names. The problem is that I will never really know what vendor is on the page unless I try to match it to a list of vendors. If the vendor does not have a link (for whatever reason) then I won't be getting back the vendors for the group buy.

Keycap kits are basically hit or miss. Not all people label their kits with text. Sometimes they do it on the photos themselves. Finding text itself is already a struggle. So I believe this should generally end up as a manual task that cannot be totally automated.

The hardest issue is finding the start and end date of a group buy. There is no way to truly identify these dates from a geekhack post itself. It is more like to scrape it from a vendor's website instead as they are generally structured in a similar manner for every group buy. Atleast more than the wild west that is a geekhack post.

## Installation and Start the project

```
npm install
```

Configure your .env file.

```
cp .env.template .env
```

When you are finished, start scraping with the run scrape command.

```
npm run scrape
```

## License

MIT
