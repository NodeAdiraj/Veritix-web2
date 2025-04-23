// Mock data for events
export const mockEvents = [
  {
    id: '1',
    title: 'Electric Pulse Festival',
    image: 'viewers-1.jpg',
    image2: 'back.jpg',
    date: 'Apr 15, 2025',
    time: '5:00 PM',
    location: 'Miami, FL',
    venue: 'Ocean Front Arena',
    price: '$89 - $250',
    genre: 'Festival',
    about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, mollitia earum. Possimus fuga reprehenderit corporis consequuntur tempore nam delectus ullam tenetur distinctio accusantium ipsam quidem dolorum, culpa nostrum, magnam natus.'
  },
  {
    id: '2',
    title: 'Summer Vibes Tour - Taylor Swift',
    image: 'viewers-2.jpg',
    image2: 'back.jpg',
    date: 'Jun 22, 2025',
    time: '7:30 PM',
    location: 'Los Angeles, CA',
    venue: 'Hollywood Bowl',
    price: '$120 - $450',
    genre: 'Pop',
    about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, mollitia earum. Possimus fuga reprehenderit corporis consequuntur tempore nam delectus ullam tenetur distinctio accusantium ipsam quidem dolorum, culpa nostrum, magnam natus.'
  },
  {
    id: '3',
    title: 'Jazz Under The Stars',
    image: 'viewers-3.jpg',
    image2: 'back.jpg',
    date: 'May 10, 2025',
    time: '8:00 PM',
    location: 'New Orleans, LA',
    venue: 'French Quarter Park',
    price: '$45 - $75',
    genre: 'Jazz',
    about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, mollitia earum. Possimus fuga reprehenderit corporis consequuntur tempore nam delectus ullam tenetur distinctio accusantium ipsam quidem dolorum, culpa nostrum, magnam natus.'
  },
  {
    id: '4',
    title: 'Rock Revolution Tour',
    image: 'viewers-4.jpg',
    image2: 'back.jpg',
    date: 'Jul 8, 2025',
    time: '6:30 PM',
    location: 'Chicago, IL',
    venue: 'Lakefront Stadium',
    price: '$65 - $200',
    genre: 'Rock',
    about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, mollitia earum. Possimus fuga reprehenderit corporis consequuntur tempore nam delectus ullam tenetur distinctio accusantium ipsam quidem dolorum, culpa nostrum, magnam natus.'
  },
  {
    id: '5',
    title: 'Electronic Dreams - DJ Night',
    image: 'viewers-5.jpg',
    image2: 'back.jpg',
    date: 'Aug 14, 2025',
    time: '10:00 PM',
    location: 'New York, NY',
    venue: 'Manhattan Club',
    price: '$40 - $80',
    genre: 'DJ',
    about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, mollitia earum. Possimus fuga reprehenderit corporis consequuntur tempore nam delectus ullam tenetur distinctio accusantium ipsam quidem dolorum, culpa nostrum, magnam natus.'
  },
  {
    id: '6',
    title: 'Hip Hop Revolution - Drake',
    image: 'viewers-6.jpg',
    image2: 'back.jpg',
    date: 'Sep 5, 2025',
    time: '8:00 PM',
    location: 'Austin, TX',
    venue: 'Capitol Arena',
    price: '$95 - $300',
    genre: 'Hip Hop',
    about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, mollitia earum. Possimus fuga reprehenderit corporis consequuntur tempore nam delectus ullam tenetur distinctio accusantium ipsam quidem dolorum, culpa nostrum, magnam natus.'
  },
  {
    id: '7',
    title: 'Symphony No. 9 - Beethoven',
    image: 'viewers-7.jpg',
    image2: 'back.jpg',
    date: 'Oct 12, 2025',
    time: '7:00 PM',
    location: 'Boston, MA',
    venue: 'Symphony Hall',
    price: '$60 - $150',
    genre: 'Classical',
    about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, mollitia earum. Possimus fuga reprehenderit corporis consequuntur tempore nam delectus ullam tenetur distinctio accusantium ipsam quidem dolorum, culpa nostrum, magnam natus.'
  },
  {
    id: '8',
    title: 'Acoustic Sessions - Ed Sheeran',
    image: 'viewers-9.jpg',
    image2: 'back.jpg',
    date: 'Apr 28, 2025',
    time: '7:30 PM',
    location: 'Nashville, TN',
    venue: 'Ryman Auditorium',
    price: '$75 - $180',
    genre: 'Live Music',
    about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, mollitia earum. Possimus fuga reprehenderit corporis consequuntur tempore nam delectus ullam tenetur distinctio accusantium ipsam quidem dolorum, culpa nostrum, magnam natus.'
  },
  {
    id: '9',
    title: 'Desert Rave Festival',
    image: 'viewers-8.jpg',
    image2: 'back.jpg',
    date: 'May 20-22, 2025',
    time: 'All Day',
    location: 'Las Vegas, NV',
    venue: 'Desert Springs Arena',
    price: '$199 - $499',
    genre: 'Electronic',
    about: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, mollitia earum. Possimus fuga reprehenderit corporis consequuntur tempore nam delectus ullam tenetur distinctio accusantium ipsam quidem dolorum, culpa nostrum, magnam natus.'
  }
];
  
  // Get all events
export const getAllEvents = () => {
  return new Promise((resolve) => {
    resolve(mockEvents);
  });
};
  
  // Get featured events
export const getFeaturedEvents = () => {
    return new Promise((resolve) => {
      resolve(mockEvents.slice(0, 5));
    });
};
  
  // Get event by ID
export const getEventById = (id) => {
    return new Promise((resolve) => {
      const event = mockEvents.find(event => event.id === id);
      resolve(event);
    });
};
  
  // Get organizer's events
export const getOrganizerEvents = () => {
    return new Promise((resolve) => {
      resolve(mockEvents.slice(3, 8));
    });
};
  
  // Filter events
export const filterEvents = (events, filters) => {
    return events.filter(event => {
        if (filters.city && filters.city !== 'All Cities') {
            if (!event.location.includes(filters.city)) return false;
        }
  
        if (filters.date) {
            const eventDate = new Date(event.date);
            const filterDate = new Date(filters.date);
            if (
            eventDate.getFullYear() !== filterDate.getFullYear() ||
            eventDate.getMonth() !== filterDate.getMonth() ||
            eventDate.getDate() !== filterDate.getDate()
            ) return false;
        }
  
        if (filters.genre && filters.genre !== 'All Genres') {
            if (event.genre !== filters.genre) return false;
        }
  
        if (filters.search) {
            const search = filters.search.toLowerCase();
            return (
            event.title.toLowerCase().includes(search) ||
            event.location.toLowerCase().includes(search) ||
            event.venue.toLowerCase().includes(search) ||
            event.genre.toLowerCase().includes(search)
            );
        }
  
        return true;
    });
};
  
// Mock user tickets
export const mockTickets = [
    {
        id: 't1',
        eventId: '1',
        eventTitle: 'Electric Pulse Festival',
        eventImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?...',
        date: 'Apr 15, 2025',
        time: '5:00 PM',
        location: 'Miami, FL',
        venue: 'Ocean Front Arena',
        ticketType: 'VIP',
        price: '$250',
        ticketCode: 'EP-VIP-1234567',
        status: 'valid'
    },
    {
        id: 't2',
        eventId: '3',
        eventTitle: 'Jazz Under The Stars',
        eventImage: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?...',
        date: 'May 10, 2025',
        time: '8:00 PM',
        location: 'New Orleans, LA',
        venue: 'French Quarter Park',
        ticketType: 'General Admission',
        price: '$45',
        ticketCode: 'JZ-GA-7654321',
        status: 'valid'
    },
    {
        id: 't3',
        eventId: '5',
        eventTitle: 'Electronic Dreams - DJ Night',
        eventImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?...',
        date: 'Mar 14, 2025',
        time: '10:00 PM',
        location: 'New York, NY',
        venue: 'Manhattan Club',
        ticketType: 'Early Bird',
        price: '$40',
        ticketCode: 'ED-EB-9876543',
        status: 'expired'
    }
];
  
  // Get user tickets
export const getUserTickets = () => {
    return new Promise((resolve) => {
      resolve(mockTickets);
    });
};  