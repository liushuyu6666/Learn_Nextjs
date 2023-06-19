# Structure of the whole projects

The structure of the next.js project:
<root>
  |
  |--- components
  |
  |--- public
  |
  |--- styles
  |
  |--- pages
         |
         |--- _app.js

## `components` folder
Keep components here.

## `public` folder
For static assets.

## `styles` folder
To store global CSS files. Next.js project also has component-level CSS in each component folder.
1. `globals.css`: You can add global CSS files by importing them from `pages/_app.js` (create one if you don't have it). You cannot import global CSS anywhere else. The reason that global CSS can't be imported outside of `pages/_app.js` is that global CSS affects all elements on the page.

## `pages` folder

### `_app.js`
1. The default export of `_app.js` is a top-level React component that wraps all the pages in your application.
   1. Go to `pages/_app.js` to see how to use.
2. You can use this component to keep state when navigating between pages,
3. or to add global styles.
4. You need to restart the development server when you add `pages/_app.js`.



# [CSS Modules](https://nextjs.org/docs/pages/building-your-application/styling/css-modules)
1. CSS Modules are extracted from the JavaScript bundles at build time and generate .css files that are loaded automatically by Next.js.
2. CSS module allows you to scope CSS at the component-level, you can create a `.css` file in each component folder to make the whole structure organized.
   1. Go to `components/layout.js` to see how to use CSS in a component level.
3. A unique class name will be generated automatically for avoiding a class name collisions.
4. Next.js’s code splitting feature works on CSS Modules as well. It ensures the minimal amount of CSS is loaded for each page.




# More Libraries

There are some additional libraries to use:
1. `clsx`
2. `postcss`
3. `tailwindcss`
4. `autoprefixer`
5. `sass`

