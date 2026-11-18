import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { EditorialStar, LightningBolt } from './Graphics';

const FAQS: { question: string; answer: string }[] = [
  {
    question: 'How quickly will my order arrive?',
    answer:
      'Delivery speed depends on your PIN code and local hub stock. In active metro express hubs (such as select Mumbai, New Delhi, Bengaluru, Gurugram, Pune, and Hyderabad zones), orders typically arrive within a 25–55 minute estimated window once packed. Enter your PIN code at checkout or in our Shop bar to see the live estimate for your neighbourhood before placing an order.',
  },
  {
    question: 'Which locations do you deliver to?',
    answer:
      'Our rapid micro-hubs currently operate across select urban pin codes in major Indian metro cities, with priority same-day or scheduled courier coverage across additional tier-1 and tier-2 cities. Use the PIN code checker on our Home or Shop page to verify your exact zone.',
  },
  {
    question: 'Can I track my order?',
    answer:
      'Yes. Immediately after you place an order, you receive an Order Confirmation ID with live status milestones—from Studio Packing to Rider Hand-off and Doorstep Arrival.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'If the fit isn’t quite right, unworn items with original Snap Style tags intact can be exchanged or returned within 7 days of delivery. Express hub pickup slots are available in serviceable metro zones.',
  },
  {
    question: 'Can I cancel an order?',
    answer:
      'Orders can be cancelled directly before our studio team completes packing and hands the keepsake box to your rider. Once dispatched, you can easily refuse or schedule a return pickup after arrival.',
  },
];

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Order Support');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim().includes('@') || !message.trim()) {
      setError('Please fill in your name, a valid email address, and your message.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F6F3E8] text-[#1A1415]">
      {/* Header */}
      <section className="border-b border-[#1A1415]/15">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 lg:py-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8B1E2D] mb-3">
            <LightningBolt className="w-3.5 h-3.5" />
            <span>CUSTOMER CARE · COLLABORATIONS</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-none text-[#1A1415]">
            NEED A QUICK <span className="italic text-[#8B1E2D]">FIX?</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#5C4D50] max-w-xl">
            Questions, orders or collaborations? We’re just a Snap away.
          </p>
        </div>
      </section>

      {/* Contact Form + Support Info */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Interactive Form */}
          <div className="lg:col-span-7 bg-[#F6F3E8] border border-[#1A1415]/20 p-6 sm:p-10">
            <h2 className="font-display text-2xl sm:text-3xl text-[#1A1415] mb-6">
              Send us a message
            </h2>

            {submitted ? (
              <div className="bg-[#C8E0F4]/55 border border-[#1A1415]/15 p-8 space-y-4">
                <div className="flex items-center gap-2.5 text-[#8B1E2D]">
                  <CheckCircle2 className="w-6 h-6" />
                  <h3 className="font-display text-2xl text-[#1A1415]">
                    Message received, {name}.
                  </h3>
                </div>
                <p className="text-sm text-[#5C4D50] leading-relaxed">
                  Our support desk has logged your inquiry under{' '}
                  <span className="font-semibold text-[#1A1415]">{topic}</span> and will reply to{' '}
                  <span className="font-semibold text-[#1A1415]">{email}</span> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="px-5 py-2.5 bg-[#1A1415] text-[#F6F3E8] text-xs font-bold uppercase tracking-wider hover:bg-[#8B1E2D] transition-colors"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold uppercase tracking-wider text-[#1A1415] mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-[#ECE6D4]/55 border border-[#1A1415]/25 text-sm text-[#1A1415] placeholder:text-[#5C4D50]/65 focus:outline-none focus:border-[#8B1E2D]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold uppercase tracking-wider text-[#1A1415] mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full px-4 py-3 bg-[#ECE6D4]/55 border border-[#1A1415]/25 text-sm text-[#1A1415] placeholder:text-[#5C4D50]/65 focus:outline-none focus:border-[#8B1E2D]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block text-xs font-bold uppercase tracking-wider text-[#1A1415] mb-2"
                  >
                    Topic
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-4 py-3 bg-[#ECE6D4]/55 border border-[#1A1415]/25 text-sm text-[#1A1415] focus:outline-none focus:border-[#8B1E2D]"
                  >
                    <option value="Order Support">Order Support & Delivery</option>
                    <option value="Sizing & Styling">Sizing & Styling Help</option>
                    <option value="Brand Collaborations">Creator & Brand Collaborations</option>
                    <option value="Press & Partnerships">Press & Partnerships</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold uppercase tracking-wider text-[#1A1415] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your order, sizing question, or collaboration idea..."
                    className="w-full px-4 py-3 bg-[#ECE6D4]/55 border border-[#1A1415]/25 text-sm text-[#1A1415] placeholder:text-[#5C4D50]/65 focus:outline-none focus:border-[#8B1E2D]"
                  />
                </div>

                {error && <p className="text-xs font-medium text-[#8B1E2D]">{error}</p>}

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#8B1E2D] text-[#F6F3E8] text-xs font-bold uppercase tracking-[0.14em] hover:bg-[#6D1521] transition-colors inline-flex items-center gap-2"
                >
                  <span>Submit Message</span>
                  <LightningBolt className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right: Customer Support Details (Editable Placeholders) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F7D6DB] border border-[#1A1415]/15 p-7 sm:p-8 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl text-[#1A1415]">Customer Support</h3>
                <EditorialStar className="w-5 h-5 text-[#8B1E2D]" />
              </div>

              <p className="text-xs text-[#5C4D50]">
                Placeholder studio contact details ready to be swapped with your live operations desk:
              </p>

              <ul className="space-y-4 text-sm text-[#1A1415]">
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#8B1E2D] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#5C4D50]">
                      Support Email (Placeholder)
                    </p>
                    <p className="font-medium">support@snapstyle.placeholder</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#8B1E2D] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#5C4D50]">
                      Dispatch Desk Line (Placeholder)
                    </p>
                    <p className="font-medium tabular-nums">+91 00000 00000</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#8B1E2D] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#5C4D50]">
                      Studio Hub Address (Placeholder)
                    </p>
                    <p className="font-medium">Studio Lane 04, Fashion District [City Placeholder]</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#8B1E2D] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#5C4D50]">
                      Live Support Hours
                    </p>
                    <p className="font-medium">Daily · 9:00 AM – 11:30 PM IST</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[#C8E0F4] border border-[#1A1415]/15 p-7 sm:p-8 space-y-3">
              <h3 className="font-display text-xl text-[#1A1415]">Follow Snap Style</h3>
              <p className="text-xs text-[#1A1415]/75">
                Daily outfit emergencies, behind-the-scenes styling, and drop previews.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {[
                  { name: 'Instagram', handle: '@snapstyle.in' },
                  { name: 'TikTok', handle: '@snapstyle' },
                  { name: 'Pinterest', handle: '@snapstyleedits' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={`#${social.name.toLowerCase()}`}
                    onClick={(e) => e.preventDefault()}
                    className="px-3.5 py-2 bg-[#F6F3E8] border border-[#1A1415]/20 text-xs font-semibold text-[#1A1415] hover:bg-[#8B1E2D] hover:text-[#F6F3E8] hover:border-[#8B1E2D] transition-colors"
                  >
                    {social.name} · {social.handle}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="border-t border-[#1A1415]/15 bg-[#ECE6D4]/55">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-14 lg:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8B1E2D] mb-2">
                Frequently Asked
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1A1415]">
                Everything about fast fashion delivery.
              </h2>
            </div>

            <div className="divide-y divide-[#1A1415]/15 border-y border-[#1A1415]/15 bg-[#F6F3E8]">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={faq.question}>
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[#ECE6D4]/40 transition-colors"
                    >
                      <span className="font-display text-lg sm:text-xl text-[#1A1415]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#8B1E2D] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-sm text-[#5C4D50] leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
