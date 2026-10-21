+++
title = "Mitigating eMudhra Private Key Compromise on Ungoogled Chromium"
description = "How to mitigate the eMudhra intermediate CA private key compromise on Ungoogled Chromium, which hasn't yet published a patch"

[taxonomies]
tags = ["security"]

[extra]
outdated_alert = true
outdated_alert_days = 14
+++

I don't use Chrome, as I dislike Google's blatant disrespect for my privacy, so instead I use [Ungoogled Chromium](https://ungoogled-software.github.io/) as my browser[^firefox]. Because Ungoogled Chromium is a community-run project, they are slower to respond to security incidents.

Yesterday, it was publicly announced that eight private keys of the eMudhra intermediate certificate authority were compromised. This is seriously bad, as anyone with those private keys can impersonate any website on the internet![^xkcd-221]

Why am I bringing up these two points? Well, as of today, October 21st, Ungoogled Chromium hasn't yet published a patch to mitigate the compromised certificates. This isn't a dunk on them, they are a volunteer project with zero obligation to do anything about the situation. ("THIS SOFTWARE IS PROVIDED 'AS IS'."[^bsd-3-clause]) In the meantime, users should protect themselves by manually distrusting the eMudhra certificates.

[^firefox]: When I'm not using Firefox, that is.
[^xkcd-221]: Totally unrelated, but [do you want to see a funny XKCD?](https://xkcd.com/221/)
[^bsd-3-clause]: Ungoogled Chromium is [licensed under the BSD 3-Clause License](https://github.com/ungoogled-software/ungoogled-chromium/blob/19d7f0c9d2c9bf5ae355d7d1ed68605e0396bcfc/LICENSE), after all. Beyond that, most OSS contributors do this work for free. Demanding more without sponsoring them is entitled.

## Checking If You're at Risk

To check whether your browser blocks the compromised certificates, go to <https://emudhra.we-have-a-problem.com/> and verify the table says "✅ Did not connect" for all 12 entries. For example, here's what the table shows for Ungoogled Chromium:

{{ <figure src="compromised-intermediates.png" caption="Ungoogled Chromium doesn't block some of the certificates, oh no!" alt="A screenshot of the vulnerability test result table, where the first 6 entries are labeled as '❌ Insecure' and the last 6 entries are labeled '✅ Did not connect'." width="600" page /> }}

If any of the entries say "❌ Insecure", you're at risk! You should update your browser immediately. If there is no update available and your browser is Chromium-based, you can manually distrust the certificates as described in the next section.

## Manually Distrusting the Certificates

First, download [`certs.zip`](@/blog/2026-10-21-mitigating-emudhra-ungoogled-chromium/certs.zip)[^certs-zip-hash] using a browser that isn't vulnerable (like [Firefox 158.0.1](https://www.firefox.com/en-US/firefox/158.0.1/releasenotes/)). This zip file contains all 16 compromised certificates, which I manually constructed from [`impacted-intermediates.json`](https://emudhra.we-have-a-problem.com/impacted-intermediates.json).

Next, open `chrome://certificate-manager/localcerts/usercerts` in Ungoogled Chromium. Scroll down to the section labeled "Distrusted Certificates" and import every certificate in `certs.zip` using the "Import" button. It's tedious, doing this for every certificate, but it's worth it. You can verify you did everything correctly by [going to the same website mentioned above](https://emudhra.we-have-a-problem.com/).

{{ <figure src="chromium-certificate-manager.png" caption="Chromium's Certificate Manager" alt="A screenshot of Chromium's Certificate Manager page, showing a portion of the imported certificates as distrusted. There is additional text saying, 'There should be 16 distrusted certificates in total'." width="700" page /> }}

{{ <figure src="blocked-intermediates.png" caption="Much better, the compromised certificates are mitigated!" alt="A screenshot of the vulnerability test result table, where all entries are labeled '✅ Did not connect'." width="600" page /> }}


[^certs-zip-hash]: SHA256: `2560e622713e5b3c6fc44c20a67c928e4b74aef05ca000f339fb432e4a394f8d`
