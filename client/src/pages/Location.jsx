import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const directions = [
  {
    from: 'Kathmandu City Center',
    steps: ['Take a microbus or bus toward Kirtipur from Ratna Park or Balkhu', 'Get off at Kirtipur Bus Stop', 'Walk or take a local tempo to the hostel — approx 5 min'],
    time: '30 – 45 min',
  },
  {
    from: 'Tribhuvan University',
    steps: ['Walk south toward Kirtipur town', 'Ask locals for Kyoudai Hostel', 'Approx 10 min walk'],
    time: '10 – 15 min',
  },
  {
    from: 'Balkhu (Ring Road)',
    steps: ['Take a tempo or local bus from Balkhu toward Kirtipur', 'Get off at Kirtipur main chowk', 'Short walk to hostel'],
    time: '15 – 20 min',
  },
]

export default function Location() {
  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Location & Directions — Kyoudai Hostel, Kirtipur, Kathmandu</title>
        <meta name="description" content="Kyoudai Hostel is located in Kirtipur, Kathmandu — 10 min walk from Tribhuvan University, 30–45 min from Kathmandu city center. Get directions and contact info." />
        <link rel="canonical" href="https://kyoudaihostel.com/location" />
      </Helmet>

      {/* Header */}
      <section className="bg-[#1C2B4B] text-white py-20 text-center px-4">
        <p className="text-xs tracking-[0.4em] text-[#C9962A] mb-3">FIND US</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-widest">Location</h1>
        <p className="text-gray-400 mt-4 max-w-md mx-auto">
          We're in Kirtipur, Kathmandu — historic, calm, and well connected.
        </p>
      </section>

      {/* Map */}
      <section className="w-full h-96 bg-[#1C2B4B] relative">
        <iframe
          title="Kyoudai Hostel Location"
          src="https://maps.google.com/maps?q=27.67267320234665,85.28156880334213&z=17&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(20%)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* Address + contact */}
      <section className="bg-[#B5202A] text-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-16 gap-y-4 text-center">
          <div>
            <p className="text-xs tracking-widest text-white/60 mb-1">ADDRESS</p>
            <p className="text-sm font-semibold">M7FJ+3J3, Kirtipur 44600, Nepal</p>
          </div>
          <div>
            <p className="text-xs tracking-widest text-white/60 mb-1">PHONE</p>
            <a href="tel:+9779863035404" className="text-sm font-semibold hover:underline">+977 986-3035404</a>
          </div>
          <div>
            <p className="text-xs tracking-widest text-white/60 mb-1">WHATSAPP</p>
            <a href="https://wa.me/9779863035404" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:underline">Message Us</a>
          </div>
          <div>
            <p className="text-xs tracking-widest text-white/60 mb-1">EMAIL</p>
            <a href="mailto:kyoudaihostel@gmail.com" className="text-sm font-semibold hover:underline">kyoudaihostel@gmail.com</a>
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="max-w-6xl mx-auto px-4 py-20 w-full">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] text-[#B5202A] mb-3">HOW TO GET HERE</p>
          <h2 className="font-serif text-3xl font-bold text-[#1C2B4B]">Directions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {directions.map(({ from, steps, time }) => (
            <div key={from} className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
              <div>
                <p className="text-xs tracking-widest text-[#B5202A] mb-1">FROM</p>
                <h3 className="font-serif text-lg font-bold text-[#1C2B4B]">{from}</h3>
              </div>
              <ul className="flex flex-col gap-2">
                {steps.map((step, i) => (
                  <li key={i} className="text-sm text-gray-500 flex gap-3">
                    <span className="text-[#C9962A] font-bold shrink-0">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 tracking-widest">⏱ {time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Neighbourhood */}
      <section className="bg-[#F7F3EE] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] text-[#B5202A] mb-3">THE NEIGHBOURHOOD</p>
            <h2 className="font-serif text-3xl font-bold text-[#1C2B4B]">Life in Kirtipur</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">
              Kirtipur is more than just a location — it's one of the most historically rich towns
              in Nepal, with a calm and student-friendly atmosphere.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🏛️', label: 'Ancient temples and Newari architecture' },
              { icon: '🎓', label: 'Close to Tribhuvan University' },
              { icon: '🛒', label: 'Local markets and shops nearby' },
              { icon: '🌄', label: 'Beautiful hilltop views of Kathmandu Valley' },
            ].map(({ icon, label }) => (
              <div key={label} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-3xl mb-3">{icon}</div>
                <p className="text-sm text-gray-500 leading-relaxed">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1C2B4B] text-white py-16 px-4 text-center">
        <p className="text-xs tracking-[0.4em] text-[#C9962A] mb-4">READY?</p>
        <h2 className="font-serif text-3xl font-bold mb-4">Come Stay With Us</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Book your bed online or WhatsApp us and we'll get back to you within a few hours.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/book" className="bg-[#B5202A] hover:bg-[#8B1520] px-8 py-3 tracking-widest text-sm rounded transition-colors">
            BOOK ONLINE
          </Link>
          <a href="https://wa.me/9779863035404" target="_blank" rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 px-8 py-3 tracking-widest text-sm rounded transition-colors">
            WHATSAPP US
          </a>
        </div>
      </section>

    </div>
  )
}
