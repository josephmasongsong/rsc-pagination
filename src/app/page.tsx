import Image from 'next/image';
import Link from 'next/link';

type Photo = {
  id: string;
  albumId: string;
  title: string;
  url: string;
  thumbnailUrl: string;
};

async function getPhotos({ page = 1, limit = 5 }: { page: number; limit: number }) {
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
  const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10;

  const photos = await getPhotos({ page, limit });

  return (
    <main>
      <div className="mx-auto max-w-7xl grid grid-cols-5 gap-y-12 justify-between p-24">
        {photos.map((photo: Photo) => (
          <div key={photo.id}>
            <Image src={photo.thumbnailUrl} width={150} height={150} alt={photo.id} />
            <div>Id: {photo.id}</div>
          </div>
        ))}
        <div className="justify-between col-span-5 flex">
          <Link
            href={{
              pathname: '/',
              query: { page: page > 1 ? page - 1 : 1 },
            }}
          >
            Previous
          </Link>

          <Link
            href={{
              pathname: '/',
              query: { page: page + 1 },
            }}
          >
            Next
          </Link>
        </div>
      </div>
    </main>
  );
}
