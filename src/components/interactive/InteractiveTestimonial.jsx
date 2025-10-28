import { useState } from 'react';

export default function InteractiveTestimonial() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      quote: "A quote from a customer explaining the project, the impact of the work and why they loved working with us",
      name: "Customer name",
      organization: "Customer organisation"
    },
    {
      quote: "A quote from a customer explaining the project, the impact of the work and why they loved working with us",
      name: "Customer name",
      organization: "Customer organisation"
    },
    {
      quote: "A quote from a customer explaining the project, the impact of the work and why they loved working with us",
      name: "Customer name",
      organization: "Customer organisation"
    }
  ];
  
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  
  const current = testimonials[currentTestimonial];
  
  return (
    <div className="text-white p-6 rounded-lg" style={{backgroundColor: '#4B00E7'}}>
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
        className="hover:opacity-90 text-white px-4 py-2 rounded text-sm transition-colors"
        style={{backgroundColor: '#4B00E7'}}
      >
        Next Testimonial ({currentTestimonial + 1}/{testimonials.length})
      </button>
    </div>
  );
}
