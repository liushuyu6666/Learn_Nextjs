# Overview
There are two types of Next.js, one is **Pages Router** and another is **App Router**,  
In Next.js, there are two main components: the server and the client. To understand how Next.js works, let's consider some key concepts. Web pages consist of HTML, CSS, and JavaScript. HTML can be seen as the structural foundation of the project, while JavaScript dynamically generates additional HTML snippets to enhance the original HTML skeleton based on user actions or other events. HTML and CSS are relatively straightforward for the browser to execute, while JavaScript may require more processing time.

The server-client model in Next.js operates on the principle of minimizing JavaScript execution on the client side. The **server** strives to convert as much JavaScript code, along with fetched data, into pre-rendered HTML code. This pre-rendered HTML is then sent to the browser, eliminating the need for the browser to perform additional rendering. This approach optimizes performance and reduces the burden on the client.

On the other hand, the **client-side** code in Next.js is responsible for sending JavaScript code to the browser. This JavaScript code enables the rendering of interactive components, which can respond to user interactions and events.

Due to the pre-rendering process in Next.js, deploying a Next.js project to S3 as a pure React.js project is not feasible. However, this does not imply that we must deploy the server and client components separately. Instead, we have alternative options such as deploying the entire project on AWS Elastic Beanstalk or Vercel, both of which can effectively handle the combined server and client components.

To clarify all of the concepts, let's take a look at **Pre-rendering** and **Life cycle** sections.

# Pre-rendering
By default, Next.js pre-renders every page. This means that Next.js generates HTML with minimal JavaScript code for each page in advance, instead of having it all done. Only When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called **hydration**.)

<img src="public/images/prerendering.png" width=300 height=200></img>
<img src="public/images/no-prerendering.png" width=300 height=150></img>

Pre-rendering can result in better performance and SEO.  

We can check the pre-rendering by disabling JavaScript in the browser. You will see the Next.js app is still rendered without JavaScript, but [This pure React.js page](https://create-react-template.vercel.app/) cannot be displayed.

The are two forms for pre-rendering: Static generation and Server-side rendering.

## Static Generation (build time only)
Static Generation is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
<img src="public/images/static-generation.png" width=300 height=150></img>

In development mode (when you run `npm run dev` or `yarn dev`), pages are pre-rendered on every request. This also applies to Static Generation to make it easier to develop. When going to production, Static Generation will happen once, at build time, and not on every request.

We recommend using Static Generation (with and without data) whenever possible because your page can be built once and served by CDN

## Server-side (for each request)
Server-side Rendering is the pre-rendering method that generates the HTML on each request.
<img src="public/images/server-side-prerendering.png" width=300 height=180></img>

# Life cycle
During the build time in Next.js, the following processes occur:

Client-side code execution: The client-side code is bundled, optimized, and prepared for execution in the browser. This includes any JavaScript code responsible for handling client-side interactivity or dynamic updates.

Static pre-rendering: Next.js identifies the pages that can be statically pre-rendered based on the configuration and code in the project. These pages are generated as HTML files during the build process. The generated HTML files will contain the pre-rendered content, including any dynamic data that was available during the build.

Once the build process is complete, the static HTML files are ready to be served to the client.

Now, during each request from the client:

Server-side rendering (SSR): If a requested page cannot be statically pre-rendered (or if dynamic content is required), Next.js falls back to server-side rendering (SSR). In SSR, the server processes the request, generates the HTML content on-demand, and sends it to the client. This allows for dynamic data to be fetched and rendered on each request, ensuring the most up-to-date content is delivered.
To summarize, during the build time, Next.js performs client-side code execution first, followed by static pre-rendering to generate pre-rendered HTML files. Then, during each request, if needed, the server-side rendering (SSR) process takes place to generate dynamic HTML content on-demand.


# Structure of the whole projects

The structure of the next.js project:
```text
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
         |
         |--- index.js
         |
         |--- posts
                |
                |--- [id].js
```

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

# Build-in Component
## Link
To link to anther page by clicking.  

Go to `pages/index.js` to check the code.

# CSS Modules

The [official documentation is here](https://nextjs.org/docs/pages/building-your-application/styling/css-modules).

1. CSS Modules are extracted from the JavaScript bundles at build time and generate .css files that are loaded automatically by Next.js.
2. CSS module allows you to scope CSS at the component-level, you can create a `.css` file in each component folder to make the whole structure organized.
   1. Go to `components/layout.js` to see how to use CSS in a component level.
3. A unique class name will be generated automatically for avoiding a class name collisions.
4. Next.js’s code splitting feature works on CSS Modules as well. It ensures the minimal amount of CSS is loaded for each page.

# Routes

## Dynamic Routes
Since the pages folder determines the routes, if we want to have the path `/posts/<id>`, we need to utilize dynamic routes. Hence, we must create a `pages/posts/[id].js` file. Pages that begin with `[` and end with `]` signify dynamic routes in Next.js.

There components must be contained in the dynamic routes:
1. `getStaticPaths` to list all possible values for `id`.
2. `getStaticProps` to take `id` and fetch necessary data based on `id` and return the value wrapped in the `props`.
3. A React component to get the values from `props` and render them.

To list all possible values for `id`, we need to use the `getStaticPaths` function in the file `pages/posts/[id].js`. The return value must be in this format:
```javascript
return {
    paths: [ // must contain paths
        { // object's array
            params: { // must contain params key
                // Values in the params can be customized
                id: 'what-you-want',
            },
        },
        {
            params: { // must contain params key
                id: 'whatever',
            }
        }
    ],
    fallback: true
}
```

Additionally, the filename `id` (a.k.a path variable) will be passed to the `getStaticProps` function. Therefore, you can access the value of `id` within the `getStaticProps` function. Wrap `postData` into `props` and return it.

The component `Post` could take `postData` and render it.

Refer to `pages/posts/[id].js` to review the code.


# Fetch data

The [official document is here](https://nextjs.org/docs/pages/building-your-application/data-fetching).

**`getStaticProps()`**

It is used in a Static Generation form. The function is executed at build time ahead of a user's request. Return the data in props and the data can be used as a prop. Go to `pages/index.js` to see how to use.  

Since `getStaticProps()` executes entirely on the server-side, it doesn't send any JavaScript code to the browser. Instead, it prepares the data, renders it, and then sends the resulting HTML to the browser. This unique behavior allows you to write code directly within `getStaticProps()`, such as database queries, without worrying about exposing sensitive logic or data to the client-side.
   
In development (`npm run dev` or `yarn dev`), `getStaticProps` runs on every request.
   
In production, `getStaticProps` runs at build time. However, this behavior can be enhanced using the fallback key returned by `getStaticPaths`

**`getStaticPaths()`**


**`getServerSideProps()`**
It provides a server-side rendering.

**`useSWR`**
To fetch data on client side.



# Libraries / Dependencies

## In this project
1. `gray-matter`: convert markdown files into `.json` format.
2. `remark` & `remark-html`: render Markdown.


## More Libraries

There are some additional libraries to use:
1. `clsx`
2. `postcss`
3. `tailwindcss`
4. `autoprefixer`
5. `sass`

