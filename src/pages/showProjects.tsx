import { trpc } from '../utils/trpc';

export default function IndexPage() {
  const hello = trpc.getAllProjects.list.useQuery();
  if (!hello.data?.items) {
    return <div>Loading...</div>;
  }
  return (
    <div>
        {/* Each project on different line */}
        {hello.data.items.map((item: any) => (
            <div key={item}>
              <a href={"projects/"+item}>{item}</a>
            </div>
        ))}
    </div>
  );
}