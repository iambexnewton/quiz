import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className='container'>
        <h1>Paint</h1>
        <Link href='/quiz'>
          <button>Start</button>
        </Link>
      </div>
    </main>
  );
}
