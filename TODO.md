[PrettyPrintHTML5ROCKS! - TODO](https://www.ishanatmuz.wordpress.com)
-------------------

This is the list of features that I want to implement, and the ones that have been suggested. It also contains a list of bugs which aren't resolved yet.

###[Website](http://ishanatmuz.github.io/PrettyPrintHTML5Rocks/)
* Add a page to instruct users on how to install the extension from my packaged (crx) build.
> Will add the build in main branch also, but will use .gitignore to not track it.

###[FontOptions](https://github.com/ishanatmuz/PrettyPrintHTML5Rocks/tree/fontOptions)
* The font options choser panel currently looks hideous. Need to make it look pretty.
> The selection panel should be in a separate file.
> I plan to use [Requirejs](http://requirejs.org/) with text plugin to separate the panel in a html file.
> I will use [Mustachejs](http://mustache.github.io/) to render the panel.

###PDF Creation

* **Create PDF on it's own**. Instead of relying on Chrome's feature to make PDF file from the print windows. The extension should be capable of generating PDF on it's own. I thought of this because when creating PDF Chrome does not detects images which aren't directly image tags. It is necessary for this extension because, when converting articles to PDF using Chrome's print dialog. The Supported Browsers icons are not getting converted into PDF.
>I am hoping to use a library to create PDF from the pages.
>This is one library that I found: http://parall.ax/products/jspdf

###Automated Testing
I have to find a way to do automated testing to make sure everything works fine.

####URL(s) to test
*  http://ishanatmuz.wordpress.com/
*  http://www.html5rocks.com/en/
*  http://www.html5rocks.com/it/
*  http://www.html5rocks.com/en/tutorials/
*  http://www.html5rocks.com/en/tutorials/?page=1
*  http://www.html5rocks.com/en/updates/
*  http://www.html5rocks.com/en/tutorials/casestudies/hobbit/
*  http://www.html5rocks.com/en/tutorials/developertools/mobile/
*  http://updates.html5rocks.com/2013/11/The-Yeoman-Monthly-Digest-1
*  http://www.html5rocks.com/en/tutorials/developertools/mobile/?redirect_from_locale=it

----------------------------------------------

#####Please Give me suggestion on where to improve. What features to add. And if there are any bugs, which I missed. Please report them to me.

----------------------------------------------

#### Contact info

* **Twitter:** [@ishanatmuz](http://twitter.com/#!/ishanatmuz)
* **Blog:** www.ishanatmuz.wordpress.com
* **Email id:** ishanatmuzaffarpur@gmail.com