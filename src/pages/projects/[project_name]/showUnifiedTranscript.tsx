import { useRouter } from 'next/router'
import { trpc } from '../../../utils/trpc';

export default function Transcript() {
  const router = useRouter()
  const { project_name} = router.query
  const transcriptJson = trpc.unifiedTranscript.list.useQuery(project_name as string);
  console.log("from: ",transcriptJson.data);

  let generateAudios = async () => {
    const generate = trpc.generateAudio.list.useMutation();
    console.log("generate: ",generate);
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
      <button onClick={generateAudios}>
        Generate Audio Files
      </button>
      
    </>
  )
}
