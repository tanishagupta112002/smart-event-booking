import Nav from "../components/nav";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div>
      <section className="relative isolate px-6 pt-24 lg:px-8">
        {/* Background gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            className="relative left-1/2 aspect-1155/678 w-36rem -translate-x-1/2 rotate-30 bg-linear-to-tr from-pink-400 to-indigo-500 opacity-30 sm:w-72rem"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="mx-auto max-w-2xl py-32 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
            Smart Event Booking
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover, book, and manage events effortlessly. From concerts to
            conferences — everything in one smart platform.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button className="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500">
              Get Started
            </button>

            <button className="text-sm font-semibold text-gray-900 hover:text-indigo-600">
              Learn More →
            </button>
          </div>
        </div>

        {/* Bottom gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            className="relative left-1/2 aspect-1155/678 w-36rem -translate-x-1/2 bg-linear-to-tr from-pink-400 to-indigo-500 opacity-30 sm:w-72rem"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </section>
    </div>
  );
}
