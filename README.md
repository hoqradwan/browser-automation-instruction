# Browser Automation Instruction List Tool

[Live Link](https://browser-automation-instruction-list-tool-hoqradwan.vercel.app/)

### To Run This Project:

1. After cloning the project in your PC from github open it in a code editor and run command **npm install**
2. Provide the command **npm run dev** in the terminal to run this project

## Explanation of technical choices

- I have chosen Next JS because it provides a simple routing system and really fast in production.
- TypeScript is used to improve type safety and reduce errors, making development more reliable and maintainable.
- I opted for raw CSS over Tailwind. Since this is a simple news article app, raw CSS provides all the styling control I need without extra complexity. Tailwind is great for larger projects, but here it felt like overkill, and using plain CSS keeps the bundle smaller and the design flexible. This way, I can quickly adapt styles as needed without being tied to a framework.

## Assumptions

**API Reliability:** We’re banking on the idea that the external news API is reliable enough to provide data whenever users load the app. If it’s down, users won’t see any articles, but we assume this won’t happen often.

**Data Structure Consistency:** We’re assuming the data format from the API won’t change. If the API changes its structure, parts of the app might break because we wouldn’t automatically adapt to it.

**API Rate Limits:** The app assumes that the API’s rate limits can handle the expected traffic. If we go over the limit, users won’t get new data, but we’re assuming the current limits should be enough.

**Stable User Connection:** Since the app fetches data from an external source, it assumes users have a good internet connection. No offline mode is planned.

**Client-Side Rendering Is Fine:** Since the data is updated dynamically, we’re assuming client-side rendering will work well enough for most users. For SEO, it’s a bit of a trade-off, as articles won’t be pre-rendered.

## Trade-Offs

**No Backend:** We save on infrastructure costs and keep the setup simple by skipping a backend. However, this means we can’t cache data ourselves, so every request depends entirely on the API’s speed.

**Client-Side Fetching:** This setup is straightforward and means we can directly interact with the API, but it does expose our API key to anyone who knows where to look (even with restrictions, this can be a security risk).
Also, client-side rendering might not be the best for SEO since articles are fetched on load.

**Minimal Error Handling:** Keeping things simple means fewer checks on potential errors from the API. If the API has an issue, users might see broken pages, but this approach keeps our code lighter.

**Real-Time Data Only:** Fetching articles live each time ensures users see the latest news, but it also means slower load times, especially if the API itself is slow.

**TypeScript:** We chose TypeScript to prevent common errors, which should help during development and avoid runtime errors.
The downside is that if the API structure changes, we’ll need to update our types, which can be a bit of a hassle.
