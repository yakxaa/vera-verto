import { router, publicProcedure } from "../trpc";
import fs from "fs";
import { resolve } from "path";

const __dirname = resolve();

const PROJECT_ROOT = resolve(__dirname, `projects`);

export const getAllProjectsRouter = router({
	list: publicProcedure.query(async () => {
		let fileArray: string[] = [];
		// read all transcribe.json files for storage folder
		const files = fs.readdirSync(PROJECT_ROOT, { withFileTypes: true });
		// for each folder check if transcribe.json exists
		files.forEach((file) => {
			console.log(`${PROJECT_ROOT}/${file.name}/transcript.json`);
			if (fs.existsSync(`${PROJECT_ROOT}/${file.name}/transcript.json`)) {
				// if it does, store filename in array
				fileArray.push(file.name);
			} else {
				// if it doesn't, do nothing
				console.log("file doesn't exist");
			}
		});

		console.log(fileArray);
		return { items: fileArray };
	}),
});
