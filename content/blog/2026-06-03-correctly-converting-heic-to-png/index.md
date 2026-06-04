+++
title = "Correctly Converting HEIC to PNG"
description = "Discussing approaches to converting HEIC images to PNG on MacOS and iOS without 3rd-party programs or online converters"

[taxonomies]
tags = ["macos"]
+++

iPhones by default store photos in the [High Efficiency Image File format](https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format) (HEIF), a lossy format that often uses the `.heic` extension[^heif-heic]. While this file format works well enough within the Apple ecosystem, there is very poor support for it outside of the walled garden.

[^heif-heic]: There's actually a bit more nuance to this. HEIF is an image container format where the image itself can be encoded in a number of formats. When the image is encoded with [HEVC (x265)](https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding), it is referred to as a HEIC file. HEIF can be either lossy or lossless, depending on the inner format used. HEVC is usually lossy, but has optional support for lossless encoding. As such, when HEIF uses HEVC, it is called HEIC and is usually lossy.

Windows requires the [HEVC Video Extension](https://www.microsoft.com/en-us/p/hevc-video-extensions/9nmzlz57r3t7), which costs $0.99[^windows-hevc-extension]. Android added support in 2019 with Android 10[^android-heic]. Linux distributions support HEIC if you install [libheif](https://github.com/strukturag/libheif)[^libheif]. Chromium and Firefox do not support HEIC, only Safari does[^web-heic], which reflects in popular web apps like Google Docs and Google Slides also not supporting it.

[^windows-hevc-extension]: I wasn't able to verify this myself, as I don't use Windows, so this may be outdated.
[^android-heic]: <https://source.android.com/docs/core/camera/heif>
[^libheif]: libheif has been experiencing an uptick in security vulnerability reports recently, [similar to curl](https://daniel.haxx.se/blog/2026/04/22/high-quality-chaos/). In the past 2 weeks they published 5 CVEs with a severity of either high or critical, with an additional 10 moderate CVEs. This doesn't mean libheif has poor code quality compared to other projects, rather that it is a much larger target for security researchers who have powerful new tools.
[^web-heic]: <https://caniuse.com/heif>

Because of this, I have a habit of converting HEIC files to PNGs before exporting them from my laptop. This process isn't obvious, however, and many solutions mentioned online suggest using an online service or downloading a sketchy program. In this article I will go over 3 different methods for converting HEIC to PNG using built-in tools in MacOS and iOS. No extra software, no online services, just the vanilla programs shipped by Apple.

{% caution(title = "Caution") %}
**Do not upload your photos to online image converters.** As a matter of privacy, you have no idea how long those images are stored and what the website operators may be doing with them. It is easier, faster, and more secure to do the conversion locally on your computer.
{% end %}

## Export from Photos (MacOS)

If your photos are stored in iCloud or accessible through the Photos app on MacOS, it's really easy to convert them to PNG. Select the image in Photos and export the HEIC using File → Export → Export 1 Photo.

{{ figure(src = "photos-macos-export-menu.png", alt = "A screenshot of the photo export menu, highlighting the text 'Export 1 Photo'") }}

Make sure to set "Photo Kind" to "PNG," "Color Profile" to "Most Compatible," and "Size" to "Full Size" in the export dialogue.

{{ figure(src = "photos-macos-export-dialogue.png", alt = "A screenshot of the photo export dialogue") }}

Once exported, you're good to go!

{{ figure(src = "photos-macos-image.png", alt = "The final image: a bright sky with clouds and a tree line") }}

## Convert with Preview (MacOS)

Preview is also able to convert HEIC to PNG, however you need to use ColorSync Utility for the image to turn out correct. First, open the HEIC file in Preview. Then, select File → Duplicate to create a copy.

{{ figure(src = "preview-duplicate.png", alt = "A screenshot of the file menu, with 'Duplicate' selected", width = "300") }}

When you go to save the duplicate, make sure to set "Format" to "PNG". This will tell Preview to convert the image to PNG instead of leaving it as a HEIC.

{{ figure(src = "preview-save-as.png", alt = "A screenshot of the file export dialogue, asking where to save the image and in what format") }}

At this point, it may look like you're done, but don't be fooled! While Preview on MacOS will show the image as normal...

{{ figure(src = "preview-uncorrected.png", alt = "A screenshot of Preview displaying the image with everything looking normal") }}

...trying to open the same image in a browser will result in it looking washed out and gray! While I don't know the exact reason behind this, my best guess is because the image has [high dynamic range](https://en.wikipedia.org/wiki/High_dynamic_range)[^png-hdr] and / or uses the [Display P3 color profile](https://en.wikipedia.org/wiki/DCI-P3)[^display-p3]. Either way, it doesn't look nearly as good as the original HEIC.

[^png-hdr]: It looks like the PNG specification [only recently added support for HDR](https://www.w3.org/TR/png-3/#changes-20031110:~:text=2100%5D-,High%20Dynamic%20Range) in June 2025. Perhaps MacOS supports PNG 3.0, but Chrome and Firefox don't?
[^display-p3]: Specifically, the image uses the `Display P3 Primaries; PQ (Adaptive Gain Curve 0974DE20B8237D0E)` color profile. Display P3 was developed by Apple, and is a variant of the DCI-P3 color space.

<!-- This is the only image that I did not put through ImageOptim, so readers can look at the real deal and dig into the details themselves if they wish. Enjoy! -->
{{ figure(src = "colorsync-uncorrected.png", alt = "A photograph of electricity poles, the sun, and a bird mid-flight, however the image looks much more gray than it should, lacking vibrant blues and greens") }}

To fix this, we're going to modify the PNG to use the [sRGB color profile](https://en.wikipedia.org/wiki/SRGB) instead of Display P3 using MacOS's ColorSync Utility. ColorSync Utility is a strange, oft-ignored application for managing color profiles and converting between color spaces. In order to fix our image, first open ColorSync Utility, then select File → Open and select the PNG file.

{{ figure(src = "colorsync-open-menu.png", alt = "A screenshot of the file menu, with 'Open' highlighted" width = "300") }}

In the new window, select "Match to Profile" and select the "sRGB IEC61966-2.1" color profile. Click "Apply," then save the file.

{{ figure(src = "colorsync-match-profile.png", alt = "A screenshot of the image open in ColorSync Utility, with 'Match to Profile' and 'sRGB IEC61966-2.1' both selected") }}

Now, if you open the corrected image in a browser, it will look much much closer to the original.

{{ figure(src = "colorsync-corrected.png", alt = "A photograph of electricity poles, the sun, and a bird mid-flight") }}

## Export from Photos (iOS)

The Photos app on iOS is similar to MacOS, except it doesn't give as much control. When you go to export the image, click the "Options" button at the top of the window.

{{ figure(src = "photos-ios-export.png", alt = "A screenshot of the export image screen in the Photos app", width = "400") }}

In the options sheet, make sure to select "Most Compatible" for the format.

{{ figure(src = "photos-ios-export-options.png", alt = "A screenshot of the options menu, with 'Most Compatible' selected. The format selection box is captioned 'Choose Automatic for the best format for the destination or Current to prevent file format conversions. Photos and videos may convert to JPEG, PNG, and H.264 formats if you choose Most Compatible.'", width = "400") }}

The iOS version does not give you control over the file format, and from my experience it exports JPEGs rather than PNGs. Even still, the resulting image appears correct and does not experience the washed-out behavior from Preview.

{{ figure(src = "photos-ios-image.jpeg", alt = "A photo of a pink cherry blossom tree in bloom with a traditional Japanese building visible in the background") }}

{% tip(title = "Tip") %}
If you enjoyed this post, you may be interested Howard Oakley's writing at [The Eclectic Light Company](https://eclecticlight.co/). His blog is a treasure-trove of information on the behind-the-scenes of Macs and MacOS, and has proved invaluable to me time and time again!
{% end %}
