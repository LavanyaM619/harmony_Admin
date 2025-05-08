import { useState, useEffect } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

interface Event {
  _id: string;
  name: string;
  date: string;
  image: string;
  description: string;
}

const Gallery = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // Fetch events from the API on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Intersection Observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const galleryElement = document.getElementById('gallery-section');
    if (galleryElement) {
      observer.observe(galleryElement);
    }

    return () => {
      if (galleryElement) {
        observer.unobserve(galleryElement);
      }
    };
  }, []);

  const handleRemoveImage = (id: string) => {
    setEvents(events.filter(event => event._id !== id));
  };

  return (
    <section
      id="gallery-section"
      className="section bg-white relative overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-blue-50 filter blur-3xl opacity-70"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-harmony-50 filter blur-3xl opacity-70"></div>
      
      <div className="container-custom relative">
        <div className="text-center mb-12">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-harmony-100 text-harmony-800 inline-block mb-4">
            Event Gallery
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-gray-900 mb-4">
            Our Events
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through photos from our latest investment workshops and client events.
          </p>
        </div>
        
        <div 
          className={`max-w-4xl mx-auto transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-6">
              {events.length > 0 ? (
                <Carousel className="w-full max-w-3xl mx-auto">
                  <CarouselContent>
                    {events.map((event) => (
                      <CarouselItem key={event._id} className="relative">
                        <div className="aspect-video overflow-hidden rounded-md">
                          <img 
                            src={event.image}
                            alt={event.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="absolute top-2 right-2">
                          <button 
                            onClick={() => handleRemoveImage(event._id)}
                            className="p-1 bg-white/80 rounded-full hover:bg-red-50 text-red-500"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <div className="mt-4 text-center">
                          <h3 className="font-medium text-lg">{event.name}</h3>
                          <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                          <p className="mt-2 text-sm text-gray-700">{event.description}</p>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-0" />
                  <CarouselNext className="right-0" />
                </Carousel>
              ) : (
                <div className="text-center py-12">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-gray-500">No images in the gallery yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
