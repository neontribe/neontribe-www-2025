import { useState } from 'react';

export default function InteractiveTestimonial() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      quote: "Neontribe transformed our digital presence completely. Their approach to user-centered design is exceptional.",
      name: "Sarah Johnson",
      organization: "Tech for Good Foundation"
    },
    {
      quote: "Working with Neontribe was a game-changer. They understood our mission and delivered beyond expectations.",
      name: "Michael Chen",
      organization: "Digital Inclusion Initiative"
    },
    {
      quote: "The team's expertise in accessible design helped us reach more people than ever before.",
      name: "Emma Rodriguez",
      organization: "Community Connect"
    }
  ];
  
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  
  const current = testimonials[currentTestimonial];
  
  return (
    <div className="bg-brand-amethyst text-white p-6 rounded-lg">
      <p className="mb-4">"{current.quote}"</p>
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        <div>
          <p className="font-bold">{current.name}</p>
          <p className="text-sm text-white opacity-80">{current.organization}</p>
        </div>
      </div>
      <button 
        onClick={nextTestimonial}
        className="bg-brand-amethyst hover:opacity-90 text-white px-4 py-2 rounded text-sm transition-colors"
      >
        Next Testimonial ({currentTestimonial + 1}/{testimonials.length})
      </button>
    </div>
  );
}
