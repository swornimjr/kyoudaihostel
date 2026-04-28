import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import diningPhoto from '../assets/dinner-lunch.jpeg'
import loungePhoto from '../assets/lounge.jpeg'

const amenities = [
  {
    icon: '🍱',
    title: 'Four Meals a Day',
    desc: 'Freshly prepared breakfast, lunch, khaja, and dinner every day. No need to worry about cooking or finding a restaurant — just focus on your studies.',
    details: ['Breakfast: 8am – 9am', 'Lunch: 9:30am – 11am', 'Khaja: 3:30pm – 5pm', 'Dinner: 7pm – 8pm'],
  },
  {
    icon: '👕',
    title: 'Laundry Service',
    desc: 'Regular laundry collection and return so your clothes are always clean without taking time out of your schedule.',
    details: [],
  },
  {
    icon: '📶',
    title: 'High-Speed Wi-Fi',
    desc: 'Fast and reliable internet throughout the hostel — essential for online classes, research, and language study apps.',
    details: ['Available 24/7', 'Throughout the building', 'No usage limits'],
  },
  {
    icon: '📚',
    title: 'Common Study Area',
    desc: 'A quiet, dedicated space for studying with good lighting — because we know why you came to Kathmandu.',
    details: ['Open 24 hours', 'Quiet environment', 'Good lighting'],
  },
  {
    icon: '🧹',
    title: 'Regular Cleaning',
    desc: 'Common areas and rooms are cleaned regularly to keep the hostel fresh and hygienic.',
    details: ['Daily common area cleaning', 'Weekly room cleaning', 'Clean bathrooms daily'],
  },
  {
    icon: '💡',
    title: 'Utilities Included',
    desc: 'Water, electricity, and all basic utilities are included in your monthly fee. No surprise bills.',
    details: ['24/7 electricity', 'No extra charges'],
  },
  {
    icon: '🎉',
    title: 'Festival Leave Policy',
    desc: 'Going home for Dashain or Tihar? We do not charge rent for the days you are away during major festivals.',
    details: ['No charge during Dashain', 'No charge during Tihar', 'Just let us know in advance'],
  },
  {
    icon: '🏠',
    title: 'Long Home Visit Discount',
    desc: 'If you go home for more than 15 consecutive days, we charge only 50% of your monthly fee for those days away — so you are not paying full rent while you are not here.',
    details: ['50% off for 15+ day home visits', 'Available once per year', 'For students staying 6+ months'],
  },
]

export default function Amenities() {
  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Amenities — Meals, Wi-Fi & More | Kyoudai Hostel, Kirtipur</title>
        <meta name="description" content="Kyoudai Hostel includes four daily meals (breakfast, lunch, khaja, dinner), free Wi-Fi, laundry, a study area, regular cleaning, and utilities — all in one monthly fee." />
        <link rel="canonical" href="https://kyoudaihostel.com/amenities" />
      </Helmet>

      {/* Header */}
      <section className="bg-[#1C2B4B] text-white py-20 text-center px-4">
        <p className="text-xs tracking-[0.4em] text-[#C9962A] mb-3">WHAT WE OFFER</p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-widest">Amenities</h1>
        <p className="text-gray-400 mt-4 max-w-md mx-auto">
          Everything included in your monthly fee. No hidden charges, no hassle.
        </p>
      </section>

      {/* Amenities grid */}
      <section className="max-w-6xl mx-auto px-4 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {amenities.map(({ icon, title, desc, details }) => (
            <div key={title} className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 flex gap-6">
              <div className="text-4xl shrink-0">{icon}</div>
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-xl font-bold text-[#1C2B4B]">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                <ul className="flex flex-col gap-1 mt-1">
                  {details.map((d) => (
                    <li key={d} className="text-xs text-[#1C2B4B] flex items-center gap-2">
                      <span className="text-[#C9962A]">✦</span> {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Photo strip */}
      <section className="max-w-6xl mx-auto px-4 pb-20 w-full">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.4em] text-[#B5202A] mb-3">INSIDE KYOUDAI</p>
          <h2 className="font-serif text-3xl font-bold text-[#1C2B4B]">A Glimpse of Life Here</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <img src={diningPhoto} alt="Dining area" className="rounded-lg w-full h-64 object-cover" />
            <p className="text-xs tracking-[0.3em] text-gray-400 text-center">DINING AREA</p>
          </div>
          <div className="flex flex-col gap-3">
            <img src={loungePhoto} alt="Lounge" className="rounded-lg w-full h-64 object-cover" />
            <p className="text-xs tracking-[0.3em] text-gray-400 text-center">COMMON LOUNGE</p>
          </div>
        </div>
      </section>

      {/* All inclusive banner */}
      <section className="bg-[#B5202A] text-white py-16 px-4 text-center">
        <p className="text-xs tracking-[0.4em] mb-4 text-white/70">SIMPLE PRICING</p>
        <h2 className="font-serif text-3xl font-bold mb-4">One Price. Everything Included.</h2>
        <p className="text-white/80 max-w-md mx-auto mb-8">
          Pay your monthly rent and everything above is covered. Meals, laundry, Wi-Fi, utilities — all in.
        </p>
        <Link
          to="/book"
          className="bg-white text-[#B5202A] hover:bg-[#F7F3EE] px-10 py-3 tracking-widest text-sm font-semibold transition-colors rounded"
        >
          BOOK NOW
        </Link>
      </section>

    </div>
  )
}
