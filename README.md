
## Motivation
In a world overflowing with information, understanding complex topics can be daunting. The ability to distill intricate ideas into digestible explanations is crucial, not only for effective communication but also for fostering a more knowledgeable and connected global community.

Explained in Five Levels can help make any complex topic easier to understand, and do so in a way that anyone can use it as a base, not just us tech literate indivduals.

The goal is to use this to become the next generation of Wikipedia, an infinite knowledge base supported by AI that allows any topic to be distilled in any language to help millions learn and progress through the different complexities of information.


# Future / Potential Roadmap

[ ] Add chat to pages so that you can continue talking and learning at the right level of abstraction.
[ ] Add support for other languages so that anyone can read information in their native language.
[ ] Add up/down stream topic levels to each page to make it easy to jump to related topics.
[ ] Better markdown support for things like returned latex and other markdown parsing
[ ] Generative UI to better explain topics
[ ] Add way to identify user preferences using middleware / potentially some level of automation.
[ ] Build super simple app on top of data to make it easy to download information and be useful in areas with limited internet access.
[ ] Add agents to scrape current internet articles and information to more accurately support evidence on each page.
[ ] Add customizable gradient to allow for any arbitrary level of expertise on a given topic.
[ ] Add an image generator to have a visual header for each topic
[ ] Allow topics to be refreshed automatically or on user demand to stay up to date.
[ ] Use video models to create video tutorials 
[ ] Use Whisper to allow information to be read to you in your language of choice to explain any topic.

# How to contribute
- Reach out to rss2086@gmail.com and get access to the environment variables needed to test and build out this further.
- Donate to allow us to use better models and incorporate more real time knowledge. This will help ensure that the nderpriveledged around the world have an easy way to learn concepts, no matter how many requests we serve.



## Tech Used
- Groq for lightning fast responses and creation of five levels
- [Next.js](https://nextjs.org) App Router
- React Server Components (RSCs), Suspense, and Server Actions
- [Vercel AI SDK](https://sdk.vercel.ai/docs) for streaming chat UI
- Support for OpenAI (default), Anthropic, Cohere, Hugging Face, or custom AI chat models and/or LangChain
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - [Radix UI](https://radix-ui.com) for headless component primitives
- Chat History, rate limiting, and session storage with [Vercel KV](https://vercel.com/storage/kv)
- Explanation Levels: Kid, Teen, Undergraduate, Graduate, Professional
- Similarity Search with QDrant, but examples available for LanceDB and Milvus too
