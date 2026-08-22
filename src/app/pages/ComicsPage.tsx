import React from "react";

const comics = [
  {
    title: "The Amazing Spider-Man",
    issue: "#1",
    year: "1963",
    category: "Spider-Man",
    image:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=900&q=80",
    description:
      "Follow Peter Parker as he balances everyday life with the responsibility of being Spider-Man.",
  },
  {
    title: "The Avengers",
    issue: "#1",
    year: "1963",
    category: "Avengers",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdd35OfnhL9kw_wlmmDVsOuwbWTwdLpH8Yi5olWXdv4Q&s",
    description:
      "Earth's mightiest heroes unite to face threats no single hero could defeat alone.",
  },
  {
    title: "Iron Man",
    issue: "#1",
    year: "1968",
    category: "Iron Man",
    image:
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPjO_HzVj6zIEYzpkZ95USN_wjvIjwYQW9YZb_KyFi6A&s=10",
    description:
      "Tony Stark transforms his genius and technology into one of Marvel's greatest heroes.",
  },
  {
    title: "Captain America",
    issue: "#1",
    year: "1941",
    category: "Captain America",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdCbKaw5meR_svo1vcn5atArVB1QJ8T7QhipJrMlzBBw&s=10",
    description:
      "A symbol of courage and freedom rises to defend humanity against overwhelming odds.",
  },
  {
    title: "Doctor Strange",
    issue: "#1",
    year: "1963",
    category: "Doctor Strange",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHHNpo9bI_oRx5OVnOQgr8j0Ak1PXJN8qIQUd_407tEg&s",
    description:
      "Enter the mystical side of Marvel and explore realities beyond the ordinary.",
  },
  {
    title: "Black Panther",
    issue: "#1",
    year: "1966",
    category: "Black Panther",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtSVQuiQ9KxO2kirgvAdEYj9H5SflFeFxVUj0qgUVKnw&s",
    description:
      "The protector of Wakanda combines ancient tradition, advanced technology and heroic power.",
  },
];

export default function ComicsPage() {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(circle at top, #241000 0%, #0a0a0f 35%, #050509 100%)",
      }}
    >
      {/* HERO */}
<section
  className="relative overflow-hidden px-6 py-24 md:px-12 lg:px-20"
  style={{
    backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX0-50fSA15SghdpWY_ihmvkpn1waAHdCIbUwsdoWxGQ&s=10")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
       <div className="absolute inset-0 bg-black/80" />

<div className="absolute inset-0 opacity-30">
  <div
    className="absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl"
    style={{ background: "#ffd700" }}
  />
</div>

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.4em] text-yellow-400">
            Marvel Universe
          </p>

          <h1 className="max-w-4xl text-5xl font-black uppercase leading-none md:text-7xl">
            Enter the
            <span className="block text-yellow-400">Comic Universe</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Discover legendary Marvel stories, iconic heroes and unforgettable
            comic book adventures that built the Marvel Universe.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-full bg-yellow-400 px-7 py-3 font-bold text-black transition hover:scale-105 hover:bg-yellow-300">
              Explore Comics
            </button>

            <button className="rounded-full border border-white/20 px-7 py-3 font-bold transition hover:border-yellow-400 hover:text-yellow-400">
              Featured Issues
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {[
            ["900+", "Characters"],
            ["60+", "Years of Stories"],
            ["1000+", "Comic Issues"],
            ["1", "Infinite Universe"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="border-r border-white/10 px-6 py-8 text-center"
            >
              <div className="text-3xl font-black text-yellow-400">
                {value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-gray-500">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 lg:px-20">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              Featured
            </p>

            <h2 className="mt-2 text-4xl font-black uppercase md:text-5xl">
              Iconic Issues
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-gray-500">
            Explore some of the legendary characters and stories that shaped
            Marvel Comics.
          </p>
        </div>

        {/* COMIC GRID */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {comics.map((comic) => (
            <article
              key={comic.title}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-2 hover:border-yellow-400/50 hover:shadow-2xl"
            >
              {/* IMAGE */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={comic.image}
                  alt={comic.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute left-4 top-4 rounded-full bg-black/70 px-4 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur">
                  {comic.category}
                </div>

                <div className="absolute bottom-4 left-4">
                  <span className="rounded bg-yellow-400 px-3 py-1 text-xs font-black text-black">
                    ISSUE {comic.issue}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <div className="mb-2 text-xs uppercase tracking-widest text-gray-500">
                  Marvel Comics • {comic.year}
                </div>

                <h3 className="text-2xl font-black uppercase transition group-hover:text-yellow-400">
                  {comic.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {comic.description}
                </p>

                <button className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-yellow-400 transition hover:gap-4">
                  Read More
                  <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-y border-white/10 bg-black/30 px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
            Browse
          </p>

          <h2 className="mt-2 text-4xl font-black uppercase">
            Explore By Universe
          </h2>

          <div className="mt-10 flex flex-wrap gap-3">
            {[
              "Avengers",
              "Spider-Man",
              "X-Men",
              "Guardians",
              "Fantastic Four",
              "Black Panther",
              "Iron Man",
              "Doctor Strange",
              "Captain America",
              "Thor",
            ].map((category) => (
              <button
                key={category}
                className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-gray-300 transition hover:border-yellow-400 hover:bg-yellow-400 hover:text-black"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-6 py-24 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-yellow-400">
          The story continues
        </p>

        <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black uppercase md:text-6xl">
          Every Hero Has A Story
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-gray-500">
          From the pages of classic comics to today's Marvel Universe,
          discover the stories behind your favorite heroes.
        </p>
      </section>
    </div>
  );
}