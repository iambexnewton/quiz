import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className='main-container'>
        <h1 className='main-heading'>Are you ready?</h1>
        <Link href='/quiz'>
          <button>Yes</button>
        </Link>
      </div>
    </main>
  );
}
