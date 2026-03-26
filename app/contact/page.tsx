'use client';

import { useState } from 'react';
import { Phone, Clock, MapPin, ExternalLink, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const deliveryAreas = [
  'Clarence', 'Clarence Creek', 'Cumberland', 'Plantagenet',
  'Rockland', 'Sarsfield', 'Treadwell', 'Wendover',
  'Pendleton', 'Surrounding camping grounds & ferries',
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function updateForm(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl font-bold text-[#FFD700] mb-3">Contact Us</h1>
          <p className="text-gray-400 text-lg">We&apos;d love to hear from you</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Info */}
          <div className="space-y-6">
            {/* Phone */}
            <div className="bg-[#2d0a0a] border border-[#5c1010] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="w-5 h-5 text-[#FFD700]" />
                <h2 className="font-display text-lg font-semibold text-[#FFD700]">Call Us</h2>
              </div>
              <a
                href="tel:6134461291"
                className="text-3xl font-bold text-white hover:text-[#FFD700] transition-colors block"
              >
                613-446-1291
              </a>
              <p className="text-sm text-gray-400 mt-1">We take phone orders too!</p>
            </div>

            {/* Hours */}
            <div className="bg-[#2d0a0a] border border-[#5c1010] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-[#FFD700]" />
                <h2 className="font-display text-lg font-semibold text-[#FFD700]">Hours</h2>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Sunday – Thursday</span>
                  <span className="text-white font-semibold">11 AM – 9 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Friday – Saturday</span>
                  <span className="text-white font-semibold">11 AM – 10 PM</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-[#2d0a0a] border border-[#5c1010] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-5 h-5 text-[#FFD700]" />
                <h2 className="font-display text-lg font-semibold text-[#FFD700]">Location</h2>
              </div>
              <p className="text-gray-300">Rockland, Ontario, Canada</p>
            </div>

            {/* Social */}
            <div className="bg-[#2d0a0a] border border-[#5c1010] rounded-xl p-6">
              <h2 className="font-display text-lg font-semibold text-[#FFD700] mb-3">Follow Us</h2>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#FFD700] transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-[#FFD700] transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>

            {/* Delivery Areas */}
            <div className="bg-[#2d0a0a] border border-[#5c1010] rounded-xl p-6">
              <h2 className="font-display text-lg font-semibold text-[#FFD700] mb-3">
                Delivery Areas
              </h2>
              <div className="flex flex-wrap gap-2">
                {deliveryAreas.map((area) => (
                  <span
                    key={area}
                    className="bg-[#3B0A0A] border border-[#5c1010] rounded-full px-3 py-1 text-xs text-gray-300"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-[#2d0a0a] border border-[#5c1010] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-5 h-5 text-[#FFD700]" />
                <h2 className="font-display text-lg font-semibold text-[#FFD700]">Send a Message</h2>
              </div>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-900/30 border border-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-sm">
                    Thank you for reaching out. We&apos;ll get back to you soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name" className="text-gray-200 mb-1.5 block">Name</Label>
                    <Input
                      id="contact-name"
                      value={form.name}
                      onChange={(e) => updateForm('name', e.target.value)}
                      placeholder="Your name"
                      required
                      className="bg-[#3B0A0A] border-[#5c1010] text-white placeholder:text-gray-500 focus:border-[#FFD700]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-email" className="text-gray-200 mb-1.5 block">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateForm('email', e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="bg-[#3B0A0A] border-[#5c1010] text-white placeholder:text-gray-500 focus:border-[#FFD700]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-message" className="text-gray-200 mb-1.5 block">Message</Label>
                    <Textarea
                      id="contact-message"
                      value={form.message}
                      onChange={(e) => updateForm('message', e.target.value)}
                      placeholder="Your message..."
                      required
                      rows={5}
                      className="bg-[#3B0A0A] border-[#5c1010] text-white placeholder:text-gray-500 focus:border-[#FFD700]"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#FFD700] hover:bg-[#FFE44D] text-[#1a0505] font-bold py-5"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
