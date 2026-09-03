import { MessageCircle, MapPin } from "lucide-react";

const WHATSAPP_NUMBER = "48453283345"; // placeholder — update with real WhatsApp number
const ADDRESS_LINES = [
  "Address line 1", // placeholder
  "Address line 2", // placeholder
  "City, Country",  // placeholder
];
const MAP_EMBED_SRC = "https://www.google.com/maps?q=Warsaw,Poland&output=embed"; // placeholder location

const Tutoring = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      {/* Hero */}
      <section className="px-8 pt-16 pb-12 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-mono font-bold text-black leading-tight mb-6">
          Hi 👋
        </h1>
        <p className="text-xl font-sans text-gray-800 leading-relaxed max-w-2xl">
          I'm Konrad, and I help ambitious IB students get the best out of their studies.
        </p>
      </section>

      {/* Who I am */}
      <section className="px-8 py-16 max-w-4xl mx-auto border-t border-gray-200">
        <h2 className="text-3xl font-mono font-bold text-black mb-8">Who I am</h2>
        <div className="grid md:grid-cols-[1fr_320px] gap-10 items-start">
          <div className="space-y-6 font-sans text-lg text-gray-800 leading-relaxed">
            <p>
              I'm an industrial designer by training and currently work as an adjunct
              lecturer of UX/UI Design and Web Development at the University of Europe
              in Potsdam.
            </p>
            <p>
              I hold degrees from New York University (Interactive Media Arts) and TU
              Delft (Industrial Design), both awarded cum laude.
            </p>
            <p>
              Before any of that, I was an IB Diploma student myself — one who came out
              the other side with 41 out of 45 points, funded by a scholarship at a
              public school in Warsaw, Poland. I know exactly what the program demands,
              because I lived it.
            </p>
          </div>
          <div className="aspect-[4/5] w-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 font-mono text-sm">
            photo placeholder
          </div>
        </div>
      </section>

      {/* What I Teach */}
      <section className="px-8 py-16 max-w-4xl mx-auto border-t border-gray-200">
        <h2 className="text-3xl font-mono font-bold text-black mb-10">What I Teach</h2>

        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <div>
            <h3 className="text-xl font-mono font-bold text-black mb-4">
              Higher Level (HL) Focus
            </h3>
            <ul className="space-y-2 font-sans text-gray-800 text-lg">
              <li>English A: Language and Literature</li>
              <li>Geography</li>
              <li>Visual Arts</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-mono font-bold text-black mb-4">
              Also Supporting
            </h3>
            <ul className="space-y-2 font-sans text-gray-800 text-lg">
              <li>Design Technology</li>
              <li>Theory of Knowledge (TOK)</li>
              <li>Biology</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6 mb-10">
          <div>
            <h3 className="text-xl font-mono font-bold text-black mb-3">
              Extended Essay (EE) Support
            </h3>
            <p className="font-sans text-lg text-gray-800 leading-relaxed">
              Structuring an argument, narrowing a research question, and writing to an
              academic standard are skills I use daily — I've supervised and contributed
              to multiple dissertations and published research. I help students bring
              that same rigor to their EE, from topic selection through final draft.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-mono font-bold text-black mb-3">
              College Application Guidance
            </h3>
            <p className="font-sans text-lg text-gray-800 leading-relaxed">
              I'm also familiar with the application process for liberal arts colleges
              in both the US and the Netherlands, and can help students think through
              how their IB profile fits into that picture.
            </p>
          </div>
        </div>
      </section>

      {/* My Approach to IB */}
      <section className="px-8 py-16 max-w-4xl mx-auto border-t border-gray-200">
        <h2 className="text-3xl font-mono font-bold text-black mb-8">
          My Approach to IB
        </h2>
        <div className="space-y-6 font-sans text-lg text-gray-800 leading-relaxed">
          <p>
            The IB Diploma is one of the most rigorous secondary programs out there, and
            it demands real perseverance. Students often feel buried under the sheer
            volume of material — that's normal, and it doesn't mean something's wrong.
          </p>
          <p>
            What the program rewards isn't cramming — it's diligent planning paired with
            a steady, progress-oriented attitude. It doesn't hand out participation
            trophies, and the payoff isn't always immediate. But few programs prepare
            young people as well to study, work, and think across cultures.
          </p>
          <p>
            I consider it one of the most formative experiences of my own education, and
            I bring that perspective — not just subject knowledge — into every session.
          </p>
        </div>
      </section>

      {/* Let's chat */}
      <section className="px-8 py-20 max-w-4xl mx-auto border-t border-gray-200 text-center">
        <h2 className="text-3xl font-mono font-bold text-black mb-8">Let's chat!</h2>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-mono text-sm rounded-lg hover:bg-gray-800 transition-colors"
        >
          <MessageCircle size={18} /> message me on whatsapp
        </a>
      </section>

      {/* Address */}
      <section className="px-8 py-16 max-w-4xl mx-auto border-t border-gray-200">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="aspect-video md:aspect-auto w-full min-h-[280px] bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              title="Location"
              src={MAP_EMBED_SRC}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 280 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-mono font-bold text-black mb-4 flex items-center gap-2">
              <MapPin size={20} /> Address
            </h3>
            <div className="font-sans text-lg text-gray-800 leading-relaxed">
              {ADDRESS_LINES.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-12 max-w-4xl mx-auto border-t border-gray-200">
        <p className="text-gray-500 font-mono text-sm">
          © {new Date().getFullYear()} Konrad Krawczyk
        </p>
      </footer>
    </div>
  );
};

export default Tutoring;
