# Pokedex exercise

## Overview

Our goal is to fix and enhance a Pokedex application. If you are unfamiliar with
the world of Pokemon, here is a brief explanation:

> The Pokedex is an electronic device created and designed to catalog and
> provide information regarding the various species of Pokemon featured in the
> Pokemon video game, anime and manga series.

[Source](https://pokemon.fandom.com/wiki/Pokedex)

Our version of the Pokedex is able to list and search through Pokemon. However,
our search is a bit buggy. Additionally, we want to add a feature that shows a
selected Pokemon's details like its **type**, **moves**, and **evolution
chain**.

Your time is valuable, and we are extremely appreciative of you participating in
this assessment. We're looking to gauge your ability to read and edit code,
understand instructions, and deliver features, just as you would during your
typical day-to-day work. We expect this test to take no more than one to two
hours and ask to complete this work within the next two days. Upon submit, we
will review and provide feedback to you regardless of our decision to continue
the process.

Please update and add code in `App.js` and `index.css` based on the requirements
found below. Additionally, we ask you to edit the `readme.md` with answers to a
few questions found in the `Follow-up Questions` section also found below.

When you are finished, please upload your completed work to your Github and
invite `@gperl27` to view it.

## Setup

- This repo was scaffolded using `create-react-app`. As such, this app requires
  a stable version of `node` to get up and running.
- Clone this repo and run `npm install`.
- To run the app, run `npm start`.

## Requirements

### Search

- Typing in the search input should filter the existing Pokemon list and render
  only matches found
- Fix any bugs that prevent the search functionality from working correctly
- If there are no results from search, render "No Results Found"
- The search results container should be scrollable
- The UI should match the below mockup

![](mockup0.png)

### Details Card

- Clicking "Get Details" for any given Pokemon should render a card that has the
  Pokemon's `name`, `types`, `moves`, and `evolution chain`
- Use the api functions defined in `api.js` to retrieve this data. Adding new
  endpoints or editing existing ones are out of scope
- The details card should match the below mockup

![](mockup1.png)

## Follow-up Questions

Please take some time to answer the following questions. Your answers should go
directly in this `readme`.

- Given more time, what would you suggest for improving the performance of this
  app?

  > I'd recommend using caching for data updates with
  > [SWR](https://swr.vercel.app/), which would limit requests greatly,
  > especially when retrieving pokemon details.

- Is there anything you would consider doing if we were to go live with this
  app?

  > I'd suggest adding `TypeScript` checks, unit tests and better error handling
  > would be invaluable when going live with this app. As it is now, having all
  > of the logic in `App.js` makes it difficult to sepearate concerns and hard
  > to test, so I'd also recommend spliting each block into smaller components
  > and possibly using something like the
  > [React Context API](https://reactjs.org/docs/context.html) to share state
  > with child components and limit prop drilling.

- What was the most challenging aspect of this work for you (if at all)?

  > TBH, I appreciated this exercise. I enjoy solving/fixing problems and
  > iterating on existing code. I like fixing bugs and improving code. A
  > challenge for me was wanting to do more outside of the acceptance criteria,
  > especially with styles and architecture. I timeboxed this to 2hrs and that
  > alone was hard for me to do. :).
