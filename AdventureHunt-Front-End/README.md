**CMSI 370** Interaction Design, Fall 2018

# Assignment 1025

Now that you have your design and some startup know-how, you must be itching to start implementing it. So now we will, but _in two phases_.

The first phase is solely about the front end. We will leave stubs, placeholders, or mocks at the points where we expect to call our chosen web service APIs. Filling those in will be the concern of [Assignment 1115](./api-integration.md). For this assignment, we focus on the core content of the course: your application’s user interface.

Resources to help you with this include many of the links listed on the course website, assorted samples from the [bazaar](https://github.com/dondi/bazaar) repository, and the starter files that are included with your GitHub Classroom repositories for this assignment, once you have set yourself up.

## Background Reading
For this assignment, you will want to be acquainted with one or more of the development resources listed in the course website, depending on the front end technology stack that you have chosen. You are likely to be consulting those frequently, including other resources that you might discover on your own.

Textbook reading is centered on the menus, forms, and dialogs interaction style, which would be Shneiderman/Plaisant Chapter 6.

For nuts-and-bolts web details (even for React, to a degree), the JavaScript textbook will be of help, particularly Chapter 6, Section 7.5, and Sections 8.2.3, 8.3, 8.4.1, 8.5, and 8.7. For the best exposure, read Chapters 6, 7, and 8 in full.

## Best Practices and Automated Feedback
Starter code for three possible front-end technology stacks is available in the [bazaar](https://github.com/dondi/bazaar) repository:
 * jQuery and Bootstrap web app: [giphy-sample](https://github.com/dondi/bazaar/tree/master/giphy-sample)
 * React web app: [giphy-sample-react](https://github.com/dondi/bazaar/tree/master/giphy-sample-react)
 * iOS application: [giphy-sample-ios](https://github.com/dondi/bazaar/tree/master/giphy-sample-ios)

The web-based starters require [Node.js](https://nodejs.org) and are fully configured for linting ([ESLint](http://eslint.org)), unit tests ([Jest](https://jestjs.io)), and code coverage ([Istanbul](https://github.com/gotwarlost/istanbul), built into Jest). These will be run automatically whenever you push to GitHub.

The iOS starter requires [Xcode](https://developer.apple.com/xcode/) and has similar tooling.

### Automated Feedback Setup
In order to connect your repository to our automated code review and feedback system, once you are up and running please contact [Ian Lizarda](https://github.com/ianlizzo) or [Donovan Moini](https://github.com/dmoini) so that they can set you up. Send an email to either of them with your GitHub URL, username, and your chosen front-end tech stack/type. Once they have you hooked up, the system will provide feedback on code formatting and quality whenever you commit a new version to GitHub. _Points will be deducted if issues here linger in the final submission._

## For Submission: A Front End to an Existing Web Service API
The title pretty much says it: put together a front end for a pre-existing web service API. Details on selecting this API and the scope of usage for this API were specified in [Assignment 0920](https://github.com/lmu-cmsi370-fall2018/assignments/blob/master/front-end-design.md). The key requirement is worth reiterating: we are looking for the implementation of _at least three (3)_ non-trivial web service functions. Also as stated in that assignment, there is a “home-grown” option which, if chosen, hikes the requirement to five (5) specific services.

Technology, coding, and architecture specifics will vary by technology stack, but one specification is common across the board: this assignment expects you to implement _the front end only_ (i.e., no real connections to the web services yet), but also requires that there are _clear, well-defined placeholders_ for those web services in your code. The starter code already has these qualities, so as long as you don’t veer too far from them, you should be fine.

### How to Turn it In
The starter applications can be run/built from within their own subfolders, but for your own submission, _copy the files_ from the starter code of choice to the top level of this repository, then start working on those files as your own. This has the secondary effect of keeping the starter code untouched—you’ll probably benefit from that, in case you do something that breaks the application code.

To evaluate your work, we will invoke or build your application based on the files at the top of the repository.

## Specific Point Allocations
Programming assignments are scored according to outcomes _3a_, _3b_, and _4a_ to _4f_ in the [syllabus](http://dondi.lmu.build/fall2018/cmsi370/cmsi370-fall2018-syllabus.pdf). For this particular assignment, graded categories are as follows:

| Category | Points | Outcomes |
| -------- | -----: | -------- |
| Model Implementation | 20 | _3a_, _3b_, _4a_, _4b_, _4d_ |
| View Implementation | 25 | _3a_, _3b_, _4a_, _4b_, _4d_ |
| Controller Implementation | 25 | _3a_, _3b_, _4a_, _4b_, _4d_ |
| API Stubs/Mocks | 10 | _3a_, _3b_, _4a_, _4b_, _4d_ |
| Test Suite and Coverage | 20 | _4a_ |
| Linting | deduction only | _4c_ |
| Version Control | deduction only | _4e_ |
| Punctuality | deduction only | _4f_ |
| **Total** | **100** |

The last three graded categories are “deduction only,” meaning that you will only get points taken off if there are significant issues with those categories. Such issues include but are not limited to: lingering linting errors as of the final commit (_4c_), insufficiently granular or unmessaged commits (_4e_), and late commits (_4f_).
