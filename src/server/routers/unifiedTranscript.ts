import { router, publicProcedure } from "../trpc";
import fs from "fs";
import { resolve } from "path";

const __dirname = resolve();
const PROJECT_ROOT = resolve(__dirname, `projects/`);

export const unifiedTranscriptRouter = router({
	list: publicProcedure.input(String).query(async ({ input, ctx }) => {
		// read the unified transcript.json file inside storage folder
		const data = fs.readFileSync(
			`${PROJECT_ROOT}/${input}/transcript_translated.json`
		);
		const transcript = JSON.parse(data.toString());
		console.log(transcript);
		return {
			reply: transcript,
		};
	}),
});
