import { router, publicProcedure } from "../trpc";
import fs from "fs";
import { resolve } from "path";

const __dirname = resolve();
const PROJECT_ROOT = resolve(__dirname, `projects/`);
const API_KEY = "AIzaSyDFKmWu6FuGMwwbrWv2OOph0IxIEfzNWVo";

async function translate(text: string, target: string, source: string) {
	fetch(
		`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&q=${text}&target=${target}&source=${source}}`,
		{
			method: "GET",
		}
	)
		.then((res) => res.json())
		.then((res) => {
			console.log(res.data.translations[0].translatedText);
		});
}

export const transcriptRouter = router({
	list: publicProcedure.input(String).query(async ({ input, ctx }) => {
		// read the transcript.json file inside storage folder
		const data = fs.readFileSync(`${PROJECT_ROOT}/${input}/transcript.json`);
		const transcript = JSON.parse(data.toString());
		console.log(transcript);
		return {
			reply: transcript,
		};
	}),
	translate: publicProcedure.input(String).mutation(async ({ input, ctx }) => {
		// read the unified transcript.json file inside storage folder
		const data = fs.readFileSync(`${PROJECT_ROOT}/${input}/transcript.json`);
		const transcript = JSON.parse(data.toString());
		for (let i = 0; i < transcript.length; i++) {
			transcript[i].translated_sentence = await translate(
				transcript[i].text,
				"en",
				"hi"
			);
		}
		console.log(transcript);
		fs.writeFile(
			`${PROJECT_ROOT}/${input}/transcript_translated1.json`,
			JSON.stringify(transcript),
			(err) => {
				if (err) throw err;
				console.log("done");
			}
		);
		return {
			reply: transcript,
		};
	}),
});
