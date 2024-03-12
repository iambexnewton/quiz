import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className='main-container'>
        <h1 className='header'>Are you ready?</h1>
        <Link className='link' href='/quiz'>
          <button>Start</button>
        </Link>
      </div>
    </main>
  );
}
