import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className='main-container'>
        <Link href='/quiz'>
          <button>Start</button>
        </Link>
      </div>
    </main>
  );
}
