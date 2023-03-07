import { router, publicProcedure } from "../trpc";
import fs from "fs";
import axios from "axios";
import { resolve } from "path";
import { ObjectType } from "typescript";

const __dirname = resolve();

const API_KEY = "AIzaSyDFKmWu6FuGMwwbrWv2OOph0IxIEfzNWVo";

const url = "https://texttospeech.googleapis.com";

const query = "/v1/text:synthesize?key=" + API_KEY;

function pad(s: string) {
	while (s.length < 4) s = "0" + s;
	return s;
}

type Transcript = {
	sentence: string;
	start: string;
	end: string;
	start_time: string;
	end_time: string;
	speaker: string;
	translated_sentence: string;
};

const Voices = {
	spk_1: "hi-IN-Wavenet-A",
	spk_0: "hi-IN-Wavenet-B",
	spk_2: "hi-IN-Wavenet-C",
	spk_3: "hi-IN-Wavenet-D",
};

export const generateAudioRouter = router({
	list: publicProcedure.input(String).mutation(async ({ input, ctx }) => {
		const PROJECT_NAME = input;
		const PROJECT_ROOT = resolve(__dirname, `projects/${PROJECT_NAME}`);

		console.log(PROJECT_ROOT);

		// read the unified transcript.json file inside storage folder
		const data = fs.readFileSync(`${PROJECT_ROOT}/transcript.json`);
		const transcript: Transcript[] = JSON.parse(data.toString());

		for (let i = 0; i < transcript.length; i++) {
			let params = {
				input: {
					text: transcript[i].translated_sentence,
				},
				voice: {
					languageCode: "hi-IN",
					name: Voices[transcript[i].speaker as keyof Object],
				},
				audioConfig: {
					audioEncoding: "LINEAR16",
				},
			};

			fetch(url + query, {
				method: "POST",
				body: JSON.stringify(params),
			})
				.then((res) => res.json())
				.then((res) => {
					// Convert audio content string to audio file
					fs.writeFile(
						`${PROJECT_ROOT}/audios/${pad(i.toString())}_${
							transcript[i].start_time
						}`,
						res.audioContent,
						"base64",
						(err) => {
							if (err) {
								console.log(err);
							}
						}
					);
				});
		}

		console.log(transcript);
		return {
			reply: transcript,
		};
	}),
});
