import { Link } from 'react-router-dom'

const values = [
  { title: 'Brotherhood', desc: 'Kyoudai means siblings in Japanese. We believe living together builds lifelong bonds.' },
  { title: 'Focus', desc: 'We handle everything so you can dedicate your energy to studying and growing.' },
  { title: 'Affordability', desc: 'Quality accommodation with all amenities at a price that works for students.' },
  { title: 'Community', desc: 'A mix of students studying different things — college, Korean, Japanese, and more.' },
]

export default function About() {
  return (
    <div className="flex flex-col">

      {/* Header */}
      <section className="bg-[#1C2B4B] text-white py-20 text-center px-4">
        <p className="text-xs tracking-[0.4em] text-[#C9962A] mb-3">OUR STORY</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-widest">About Us</h1>
        <p className="text-gray-400 mt-4 max-w-md mx-auto">
          A hostel built for students, by people who understand the student journey.
        </p>
      </section>

      {/* Story section */}
      <section className="max-w-6xl mx-auto px-4 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div className="flex flex-col gap-6">
            <p className="text-xs tracking-[0.4em] text-[#B5202A]">WHO WE ARE</p>
            <h2 className="font-serif text-3xl font-bold text-[#1C2B4B]">A Home Far From Home</h2>
            <p className="text-gray-500 leading-relaxed">
              Kyoudai Hostel was built with one idea in mind — thousands of students come to Kathmandu
              every year from outside the valley to study, and they need more than just a bed. They need
              a place that feels like home.
            </p>
            <p className="text-gray-500 leading-relaxed">
              The name <span className="text-[#1C2B4B] font-semibold">Kyoudai (兄弟)</span> is a Japanese
              word meaning siblings or brothers. It reflects what we want this hostel to be — not just
              a place to sleep, but a community where you grow together with people who share your goals.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Whether you're studying at a college, learning Korean or Japanese to go abroad, or
              preparing for exams — we're here to make sure your daily life is sorted so you can
              stay focused on what matters.
            </p>
          </div>
          <div className="bg-[#1C2B4B] rounded-lg h-80 flex items-center justify-center">
            <p className="text-white/20 text-sm tracking-widest">HOSTEL PHOTO</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F7F3EE] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] text-[#B5202A] mb-3">WHAT WE STAND FOR</p>
            <h2 className="font-serif text-3xl font-bold text-[#1C2B4B]">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {values.map(({ title, desc }) => (
              <div key={title} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-10 h-0.5 bg-[#C9962A] mx-auto mb-4" />
                <h3 className="font-serif text-lg font-bold text-[#1C2B4B] mb-3">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kirtipur section */}
      <section className="max-w-6xl mx-auto px-4 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div className="bg-[#1C2B4B] rounded-lg h-72 flex items-center justify-center">
            <p className="text-white/20 text-sm tracking-widest">KIRTIPUR PHOTO</p>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-xs tracking-[0.4em] text-[#B5202A]">OUR LOCATION</p>
            <h2 className="font-serif text-3xl font-bold text-[#1C2B4B]">Why Kirtipur?</h2>
            <p className="text-gray-500 leading-relaxed">
              Kirtipur is one of the oldest and most culturally rich towns in the Kathmandu Valley.
              Sitting on a hilltop with ancient Newari temples and a calm atmosphere, it's a place
              that feels removed from the city chaos yet is still well connected.
            </p>
            <p className="text-gray-500 leading-relaxed">
              It's close to Tribhuvan University and language institutes, making it a natural choice
              for students. The town's quiet streets and strong sense of community make it perfect
              for focused study.
            </p>
            <Link to="/location" className="text-[#B5202A] text-sm tracking-widest hover:underline">
              SEE LOCATION & DIRECTIONS →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1C2B4B] text-white py-16 px-4 text-center">
        <p className="text-xs tracking-[0.4em] text-[#C9962A] mb-4">JOIN THE FAMILY</p>
        <h2 className="font-serif text-3xl font-bold mb-4">Become Part of Kyoudai</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Limited spots available. Book now and become part of a community of driven students.
        </p>
        <Link
          to="/book"
          className="bg-[#B5202A] hover:bg-[#8B1520] px-10 py-3 tracking-widest text-sm transition-colors rounded"
        >
          BOOK A BED
        </Link>
      </section>

    </div>
  )
}
