import * as trpc from "@trpc/server";
import { publicProcedure, router } from "../trpc";
import { getAllProjectsRouter } from "./getAll";
import { unifiedTranscriptRouter } from "./unifiedTranscript";
import { generateAudioRouter } from "./generateAudio";
import { transcriptRouter } from "./transcript";
export const appRouter = router({
	greeting: publicProcedure.query(() => "hello tRPC v10!"),
	getAllProjects: getAllProjectsRouter,
	transcript: transcriptRouter,
	unifiedTranscript: unifiedTranscriptRouter,
	generateAudio: generateAudioRouter,
});
// Export only the **type** of a router to avoid importing server code on the client
export type AppRouter = typeof appRouter;
