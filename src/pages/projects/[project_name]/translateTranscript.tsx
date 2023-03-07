"use client";

import { useRouter } from 'next/router'
import { trpc } from '../../../utils/trpc';

export default function Transcript() {
    const router = useRouter()
    const { project_name} = router.query
    const transcriptJson = trpc.transcript.list.useQuery(project_name as string);
    const translate_api = trpc.transcript.translate.useMutation();
    console.log("from: ",transcriptJson.data);

    function translate () {
        translate_api.mutateAsync(project_name as string);
    }

    return (
    <>
        <h1>Project: {project_name}</h1>
        <h3>
            Transcript
        </h3>
        <div>
            {JSON.stringify( transcriptJson.data)}
        </div>
        {/* button to generate audio files */}
        <button onClick={translate}>
            Translate
        </button>
        <a href={`/projects/${project_name}/transcript`}>
            Go To Transcript
        </a>
    </>
    )
}
