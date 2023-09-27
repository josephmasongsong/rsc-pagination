import Pagination from './components/pagination';

type Musician = {
  id: string;
  name: string;
  genre: string;
  sex: string;
};

async function getMusicians({ page = 1, limit = 6 }: { page: number; limit: number }) {
  const res = await fetch(
    `https://my-json-server.typicode.com/josephmasongsong/rsc-pagination/musicians?_page=${page}&_limit=${limit}`
  );
  return res.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
  const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 6;

  const musicians = await getMusicians({ page, limit });

  return (
    <main>
      <div className="mx-auto max-w-7xl grid grid-cols-3 gap-12 justify-between p-24">
        {musicians.map((musician: Musician) => (
          <div key={musician.id}>
            <div>
              <strong>Id:</strong> {musician.id}
            </div>
            <div>
              <strong>Name:</strong> {musician.name}
            </div>
            <div>
              <strong>Sex:</strong> {musician.sex}
            </div>
            <div>
              <strong>Genre:</strong> {musician.genre}
            </div>
          </div>
        ))}
        <Pagination page={page} numPages={Math.ceil(30 / limit)} />
      </div>
    </main>
  );
}
