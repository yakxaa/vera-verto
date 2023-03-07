import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers";

export default createNextApiHandler({
	router: appRouter,
	createContext: () => ({
		// add whatever you want to context here
		

	}),
});
