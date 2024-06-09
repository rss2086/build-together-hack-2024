
## Motivation
In a world overflowing with information, understanding complex topics can be daunting. The ability to distill intricate ideas into digestible explanations is crucial, not only for effective communication but also for fostering a more knowledgeable and connected global community.

We think Explained in Five Levels could help make any complex topic easier to understand. 


# Future / how to improve
- Finish heirarchy of topics to make it a tree and easy to find the next topic
- Use video models to create video tutorials
- Retries, Model choices, etc

## Tech
- Groq for lightning fast responses and creation of five levels
- [Next.js](https://nextjs.org) App Router
- React Server Components (RSCs), Suspense, and Server Actions
- [Vercel AI SDK](https://sdk.vercel.ai/docs) for streaming chat UI
- Support for OpenAI (default), Anthropic, Cohere, Hugging Face, or custom AI chat models and/or LangChain
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - [Radix UI](https://radix-ui.com) for headless component primitives
- Chat History, rate limiting, and session storage with [Vercel KV](https://vercel.com/storage/kv)
- [NextAuth.js](https://github.com/nextauthjs/next-auth) for authentication
- Explanation Levels: Kid, Teen, Undergraduate, Graduate, Professional
- Similarity Search with QDrant but examples of LanceDB and Milvus too
