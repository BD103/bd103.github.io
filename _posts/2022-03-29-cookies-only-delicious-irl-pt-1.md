---
layout: post
title: "Cookies are only Delicious in Real Life"
date: 2022-03-29 13:39:09 +0000
tags: information
---

Hello and welcome to my 2-part article on website cookies. This first article is purely informational, and is meant for any regular person to read. The second will be on best practices with implementing cookies, and creating a better user-experience with them. Enjoy!

## What are cookies?

Cookies are small bits of information that a website sends and saves on your computer. Whenever you next connect to that same website, it sends that cookie back. There are multiple modifiers to the behavior of cookies. There is also a set expiration date for every cookie.

Typical uses of cookies are for identifying a computer, as well as small customizations.

## What kinds of cookies are there?

There are two kinds of cookies, session and persistent.

### Session cookies

Session cookies only exist while a user is browsing a website. Once the browser is closed, the cookie gets deleted. The most common use would be to log out a user once they close their browser.

### Persistent cookies

These cookies persist between browser sessions. They are deleted once they expire, or if they are manually removed. A common use of these would be to remember whether a user prefers light or dark mode.

## Cookie modifiers

There are many modifiers and attributes that a server can specify for a cookie.

| Modifier   | Description                                                                                                                                                                |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Expiration | Tells the browser when this cookie should be removed.                                                                                                                      |
| Domain     | Tells the browser which websites this cookie should be sent to.                                                                                                            |
| Path       | Tells the browser which pages on the specified site should recieve this cookie.                                                                                            |
| Secure     | Requires the browser to only send this cookie over an encrypted connection. This prevents programs from "intercepting" connections and reading the contents of the cookie. |
| HttpOnly   | Prevents client scripts from accessing the cookie. This means that while you can still see the cookie, any code being run on your computer cannot.                         |

## How to view cookies for a site

### Chrome

Click the lock on the left side of the address bar. Select the cookies button. You can now view all cookies currently in use.

### Firefox

Right click on any webpage and click "Inspect Element". Go to the storage tab, and expand the cookies menu.

### Safari

Same instructions as Firefox, though "Inspect Element" may not appear depending on what settings you have enabled.

## Privacy concerns with cookies

Cookies are great and all when used by the website your are connecting to, but they can easily get out of hand. Let's create a scenario that explains this.

### The scenario

A user is on TalkPlace, a social media site whose name I just came up with. TalkPlace embeds advertisements in their site using a service called Ad-lib Ads. (I also came up with this name.)

<iframe title="TalkPlace mockup website" src="https://cookies-examples.bd103.repl.co/talk-place/" width="100%" height="400"></iframe>

While the user may be connected to the TalkPlace website, it links an image to Ad-libs Ads' website. Because of this, the user now has cookies for both TalkPlace and Ad-libs Ads'. The link for the image may be customized for TalkPlace specifically, so Ad-libs Ads now knows that the user has been to TalkPlace.

If Ad-libs Ads has these images on multiple websites, all with their own custom links, it now knows which websites the user has been to and in what order.

> **Note**: The mockup doesn't actually have any of this functionality. It's just supposed to look like it does. [You can view the source here](https://replit.com/@BD103/Cookies-Examples?v=1#talk-place/index.html).

### Why this is an issue

Ad-libs Ads now has a plethora of information about all the users that have been to these websites. It can sell this information to 3rd parties for a lot of money. While I'm not going to mention any names, I recommend you [Google](https://www.google.com/search?q=adsense) popular internet advertisers.

This is your personal information that Ad-libs Ads has no business knowing. This amassed information over time can result in targeted ads and immoral privacy issues.

## Should I accept all?

Because of global internet laws, websites are required to notice the user that it uses cookies. (This law is rarely enforced if the website is not making money off of cookies.) This usually results in a banner that says, "This website uses cookies for 'better performance' and 'increased user experience.' Accept all?"

To say it shortly, **no. Do not accept all if possible.** If there is a "reject all" button, click it. Most of the time, cookies are not necessary. News websites do not need to give you cookies.

Not to mention, most websites will not let you disable cookies that are required to use it. Everything else that can be "customized" is either 3rd party, advertising, or analytics.

### What if there is no easy way to reject cookies?

If a website has such a bad user experience that it doesn't show you how to reject cookies, then you can either block them or install an ad-blocker.

To block cookies on Chrome, click the lock icon in the search bar, click cookies, and select the websites to block cookies from.

If you want an ad-blocker, the only one that I recommend is [uBlock Origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm). It is completely open-sourced and not monetized. [See it's article here.](https://github.com/gorhill/uBlock/wiki/Can-you-trust-uBlock-Origin%3F) Please research this extension before you install it. Do not just take the word of a man on the internet. Figure out what you want first, and be smart.

---

Thank you for taking your time to read this article. If you have any more questions, feel free to contact me by [raising an issue here](https://github.com/BD103/BD103/issues). I check Github regularly, so you can count on a swift reply.

I hope this article is informative, coming from a developer who decidedly does _not_ want to steal your social security number. 🙃 (You can check how many cookies are on this site.)

Bye!

---

(I really like the melting emoji 🫠)
