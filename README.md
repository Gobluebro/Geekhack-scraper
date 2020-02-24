# Geekhack Scraper

## Motivation

I believe that for the average user, keeping up with keyboard group buys can be somewhat tedious. I believe there are people are interested in getting something custom but they do not have the time to keep up with everything and they eventually feel that they really missed out.

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

The main issue that I have come across so far is that when you scrape a photo, it's hard to know if that photo is important or not. I currently take the same photo order that is on the original post.

So my idea was to have up to 4 photos that could hopefully describe what the post is about.
Pros:

- Has enough photos to on most cases showcase what the post is about.
- This allows the site to exist with very little maintaining.

Cons:

- Large amount of space taken up.
- Looks busy
- Goes against the standard of only one photo per card

## Installation and Start the project

```
npm install
npm run server
npm run serve
```

## License

MIT
