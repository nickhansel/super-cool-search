### Early GigaBrain Prototype SWE Take-home Assignment

What?
Implement semantic search against a provided sample of reddit posts using the provided front-end site as a starting point.

Included is a codebase for an early prototype of gigabrain search. The codebase was originally ripped from a side-project of mine and was quickly adapted so it has some idiosyncrasies, dead code, bad code, etc.
The point of the website at the time was to test early hypotheses on the viability of the recently state of the art open source ML models for semantic search of reddit data.
Likewise, the main focus of this assignment is to build a semantic search solution using this website as a place to visualize the results.

Your task is to:
- get this website running
- build an API capable of semantically searching against the sample data (1 week of reddit submissions & comments) or however much of it you can manage
- connect the api to the front end so that I can perform queries

Stretch goals:
- deploy a version of your site to the internet so I can test without needing to do any work (bonus points for using Google Cloud Platform)
- feature request: make it so that clicking a subreddit in the side bar filters your query to search that subreddit in particular rather than linking to the subreddit
- improve the code quality of the existing site
- add a feature you think would be useful or make other improvements not listed (note them in your writeup)


Document your solution 
- giving steps for trying out your solution
- design choices you made
- limitations
- ideas for how to improve it
- how you might do things differently with more time / resources
- how you might scale your approach to more than 1 week of data.
- other thoughts you think are important

Notes / Gotchas
- The website code is a node project using `npm` and was originally developed with Node 14, however, on newer Apple Silicon Macs, Node 14 isn't compilable and causes issues. You should be able to use Node 16 instead.
- The sample data is in a zip file which is 5.63GB compressed but expands to 20+GB so ensure you have enough disk space.
- You may make whatever changes you want to the existing site, including changes to the api request format.
- I want to be able to type in a search query and find relevant discussions from the dataset. I don't need to be able to find every last comment, but I want to see relevant content to my query and be able to ask about any topic.
