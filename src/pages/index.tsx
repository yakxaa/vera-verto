import { trpc } from '../utils/trpc';

export default function IndexPage() {
  const hello = trpc.greeting.useQuery();
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data}</p>
    </div>
  );
}