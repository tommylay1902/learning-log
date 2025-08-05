import Streaks from "./_components/streaks";

export default async function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center flex-1">
        <div className="flex">
          <Streaks />
        </div>
      </main>
    </>
  );
}
