import { Artwork } from '../stores/artworkStore';
import { User } from '../stores/authStore';

// Mock Artists Data
export const mockArtists: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Youssef Benali',
    email: 'youssef@awaart.ma',
    password: 'demo123',
    role: 'artist',
    emailVerified: true,
    phoneVerified: true,
    phone: '+212612345678',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150&h=150&fit=crop&crop=face',
    bio: 'Traditional Moroccan artist specializing in geometric patterns and calligraphy. My work celebrates the rich heritage of Islamic art.',
    location: 'Fez, Morocco',
    createdAt: '2023-01-15T10:00:00Z',
    kyc: {
      status: 'approved',
      submittedAt: '2023-01-16T10:00:00Z',
      reviewedAt: '2023-01-17T10:00:00Z',
      reviewedBy: 'admin@awaart.ma',
    },
  },
  {
    id: '2',
    name: 'Aicha Mansouri',
    email: 'aicha@awaart.ma',
    password: 'demo123',
    role: 'artist',
    emailVerified: true,
    phoneVerified: true,
    phone: '+212623456789',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=150&h=150&fit=crop&crop=face',
    bio: 'Contemporary artist blending traditional Berber motifs with modern techniques. Passionate about preserving Amazigh culture.',
    location: 'Marrakech, Morocco',
    createdAt: '2023-02-10T10:00:00Z',
    kyc: {
      status: 'approved',
      submittedAt: '2023-02-11T10:00:00Z',
      reviewedAt: '2023-02-12T10:00:00Z',
      reviewedBy: 'admin@awaart.ma',
    },
  },
  {
    id: '3',
    name: 'Hassan Alaoui',
    email: 'hassan@awaart.ma',
    password: 'demo123',
    role: 'artist',
    emailVerified: true,
    phoneVerified: true,
    phone: '+212634567890',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?w=150&h=150&fit=crop&crop=face',
    bio: 'Master craftsman specializing in traditional Moroccan pottery and ceramics. Third generation artisan from Salé.',
    location: 'Salé, Morocco',
    createdAt: '2023-03-05T10:00:00Z',
    kyc: {
      status: 'approved',
      submittedAt: '2023-03-06T10:00:00Z',
      reviewedAt: '2023-03-07T10:00:00Z',
      reviewedBy: 'admin@awaart.ma',
    },
  },
  {
    id: '4',
    name: 'Fatima Zahra',
    email: 'fatima@awaart.ma',
    password: 'demo123',
    role: 'artist',
    emailVerified: true,
    phoneVerified: true,
    phone: '+212645678901',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=150&h=150&fit=crop&crop=face',
    bio: 'Digital artist creating modern interpretations of traditional Moroccan architecture and landscapes.',
    location: 'Casablanca, Morocco',
    createdAt: '2023-04-20T10:00:00Z',
    kyc: {
      status: 'approved',
      submittedAt: '2023-04-21T10:00:00Z',
      reviewedAt: '2023-04-22T10:00:00Z',
      reviewedBy: 'admin@awaart.ma',
    },
  },
  {
    id: '5',
    name: 'Omar Tazi',
    email: 'omar@awaart.ma',
    password: 'demo123',
    role: 'artist',
    emailVerified: true,
    phoneVerified: true,
    phone: '+212656789012',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=150&h=150&fit=crop&face',
    bio: 'Sculptor working with traditional materials like cedar wood and marble, creating contemporary Moroccan art.',
    location: 'Rabat, Morocco',
    createdAt: '2023-05-15T10:00:00Z',
    kyc: {
      status: 'approved',
      submittedAt: '2023-05-16T10:00:00Z',
      reviewedAt: '2023-05-17T10:00:00Z',
      reviewedBy: 'admin@awaart.ma',
    },
  },
];

// Mock Customers Data
export const mockCustomers: (User & { password: string })[] = [
  {
    id: '6',
    name: 'Ahmed Customer',
    email: 'customer@demo.com',
    password: 'demo123',
    role: 'customer',
    emailVerified: true,
    phoneVerified: false,
    phone: '+212667890123',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150&h=150&fit=crop&crop=face',
    createdAt: '2023-01-10T10:00:00Z',
  },
  {
    id: '7',
    name: 'Khadija Benali',
    email: 'khadija@awaart.ma',
    password: 'demo123',
    role: 'customer',
    emailVerified: true,
    phoneVerified: true,
    phone: '+212678901234',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150&h=150&fit=crop&crop=face',
    createdAt: '2023-02-05T10:00:00Z',
  },
];

// Mock Admin Data
export const mockAdmins: (User & { password: string })[] = [
  {
    id: '8',
    name: 'Admin User',
    email: 'admin@demo.com',
    password: 'demo123',
    role: 'admin',
    emailVerified: true,
    phoneVerified: true,
    phone: '+212689012345',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=150&h=150&fit=crop&crop=face',
    createdAt: '2023-01-01T10:00:00Z',
  },
];

// All mock users combined
export const mockUsers = [...mockArtists, ...mockCustomers, ...mockAdmins];

// Generate 100 diverse Moroccan artworks
const moroccanArtCategories = [
  'geometric-patterns', 'calligraphy', 'pottery', 'textiles', 'metalwork',
  'woodcarving', 'mosaics', 'paintings', 'photography', 'digital-art'
];

const moroccanArtTags = [
  'traditional', 'geometric', 'islamic', 'berber', 'amazigh', 'arabic',
  'calligraphy', 'patterns', 'morocco', 'fez', 'marrakech', 'casablanca',
  'rabat', 'pottery', 'ceramics', 'textiles', 'rugs', 'carpets',
  'metalwork', 'brass', 'copper', 'woodcarving', 'cedar', 'thuya',
  'mosaics', 'zellige', 'tadelakt', 'contemporary', 'modern', 'heritage',
  'culture', 'handmade', 'artisan', 'craftsmanship', 'authentic'
];

const artworkTitles = [
  'Geometric Harmony', 'Desert Sunset', 'Atlas Mountains', 'Medina Dreams',
  'Berber Patterns', 'Islamic Calligraphy', 'Moroccan Tiles', 'Sahara Winds',
  'Fez Medina', 'Marrakech Souks', 'Blue City Chefchaouen', 'Hassan Tower',
  'Koutoubia Minaret', 'Alhambra Inspiration', 'Moorish Architecture',
  'Traditional Pottery', 'Handwoven Textiles', 'Brass Lanterns',
  'Cedar Wood Carving', 'Thuya Burl Art', 'Zellige Mosaics',
  'Tadelakt Walls', 'Argan Oil Painting', 'Saffron Fields',
  'Mint Tea Ceremony', 'Gnawa Music', 'Andalusian Gardens',
  'Rif Mountains', 'Anti-Atlas Landscapes', 'Essaouira Winds',
  'Agadir Beaches', 'Tangier Strait', 'Ouarzazate Kasbahs',
  'Merzouga Dunes', 'Todra Gorges', 'Dades Valley', 'Rose Valley',
  'Ait Benhaddou', 'Volubilis Ruins', 'Meknes Granaries',
  'Ifrane Cedar Forest', 'Ouzoud Waterfalls', 'Legzira Beach',
  'Akchour Waterfalls', 'Bin el Ouidane', 'Imouzzer Falls',
  'Taghazout Surf', 'Asilah Murals', 'Tetouan Medina',
  'Al Hoceima Bay', 'Nador Lagoon', 'Saidia Beach'
];

const artworkDescriptions = [
  'A stunning representation of traditional Moroccan geometric patterns, showcasing the mathematical precision of Islamic art.',
  'Inspired by the breathtaking sunsets over the Sahara Desert, this piece captures the warm colors of Morocco.',
  'A contemporary interpretation of the majestic Atlas Mountains, blending traditional and modern techniques.',
  'Depicting the bustling life within the ancient medinas of Morocco, rich with cultural heritage.',
  'Traditional Berber motifs reimagined for the modern world, celebrating Amazigh culture.',
  'Beautiful Arabic calligraphy piece featuring verses from classical Moroccan poetry.',
  'Intricate tile work inspired by the famous zellige craftsmen of Fez and Meknes.',
  'Abstract representation of the desert winds that shape the Moroccan landscape.',
  'A detailed portrayal of the historic medina of Fez, UNESCO World Heritage site.',
  'Vibrant colors and textures inspired by the famous souks of Marrakech.',
  'Capturing the unique blue-washed walls of Chefchaouen in the Rif Mountains.',
  'Architectural study of the iconic Hassan Tower in Rabat, symbol of Morocco.',
  'Detailed artwork of the famous Koutoubia Mosque minaret in Marrakech.',
  'Drawing inspiration from Andalusian architecture and Moorish design principles.',
  'Contemporary piece celebrating the rich tradition of Moroccan pottery.',
  'Textile art showcasing traditional weaving techniques passed down through generations.',
  'Metalwork art inspired by the brass craftsmen of the Fez medina.',
  'Hand-carved cedar wood piece reflecting the forests of the Middle Atlas.',
  'Luxury artwork made from precious thuya burl wood, native to Morocco.',
  'Mosaic art using traditional zellige techniques in contemporary patterns.',
  'Smooth tadelakt finish artwork, showcasing this ancient Moroccan plastering technique.',
  'Oil painting created using pigments derived from Moroccan argan oil.',
  'Landscape painting of the saffron fields in the Taliouine region.',
  'Cultural scene depicting the traditional Moroccan mint tea ceremony.',
  'Musical artwork inspired by the spiritual Gnawa music tradition.',
  'Garden scene inspired by the Andalusian gardens of Morocco.',
  'Mountain landscape of the beautiful Rif Mountains in northern Morocco.',
  'Geological artwork inspired by the Anti-Atlas mountain range.',
  'Coastal artwork capturing the Atlantic winds of Essaouira.',
  'Beach scene from the popular resort city of Agadir.',
  'Strait artwork depicting the meeting point of Africa and Europe.',
  'Desert fortress artwork inspired by the kasbahs of Ouarzazate.',
  'Sand dune artwork from the famous Erg Chebbi near Merzouga.',
  'Canyon artwork inspired by the dramatic Todra Gorges.',
  'Valley landscape from the scenic Dades Valley route.',
  'Floral artwork inspired by the fragrant Rose Valley of Kelaat M\'Gouna.',
  'Historical artwork of the famous ksar Ait Benhaddou.',
  'Archaeological artwork inspired by the Roman ruins of Volubilis.',
  'Architectural piece featuring the massive granaries of Meknes.',
  'Forest artwork from the cedar forests around Ifrane.',
  'Waterfall artwork inspired by the beautiful Ouzoud Falls.',
  'Coastal artwork of the natural arches at Legzira Beach.',
  'Mountain waterfall scene from the Akchour region.',
  'Lake artwork of the artificial lake Bin el Ouidane.',
  'Cascade artwork from the Imouzzer waterfalls near Agadir.',
  'Surf culture artwork from the famous waves of Taghazout.',
  'Street art inspired by the colorful murals of Asilah.',
  'Medina artwork from the UNESCO site of Tetouan.',
  'Coastal artwork of the beautiful Al Hoceima National Park.',
  'Lagoon artwork from the Nador region in northeastern Morocco.'
];

// Generate 100 artworks
export const mockArtworks: Artwork[] = Array.from({ length: 100 }, (_, index) => {
  const artistId = mockArtists[index % mockArtists.length].id;
  const artistName = mockArtists[index % mockArtists.length].name;
  const category = Math.random() > 0.3 ? 'physical' : 'digital';
  const titleIndex = index % artworkTitles.length;
  const descIndex = index % artworkDescriptions.length;
  
  // Generate random tags
  const numTags = Math.floor(Math.random() * 5) + 3;
  const tags = [];
  for (let i = 0; i < numTags; i++) {
    const tag = moroccanArtTags[Math.floor(Math.random() * moroccanArtTags.length)];
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  }

  // Generate realistic prices
  const basePrice = category === 'digital' ? 50 : 200;
  const price = basePrice + Math.floor(Math.random() * 2000);
  
  // Generate stock
  const stock = category === 'digital' ? Math.floor(Math.random() * 50) + 10 : Math.floor(Math.random() * 3) + 1;

  // Use a variety of high-quality images
  const imageUrls = [
    'https://images.pexels.com/photos/1070527/pexels-photo-1070527.jpeg?w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/1109354/pexels-photo-1109354.jpeg?w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/2693212/pexels-photo-2693212.jpeg?w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/1579708/pexels-photo-1579708.jpeg?w=800&h=800&fit=crop',
    'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?w=800&h=800&fit=crop'
  ];

  return {
    id: (index + 1).toString(),
    title: `${artworkTitles[titleIndex]} ${index > artworkTitles.length - 1 ? `#${Math.floor(index / artworkTitles.length) + 1}` : ''}`,
    description: artworkDescriptions[descIndex],
    price,
    category,
    imageUrl: imageUrls[index % imageUrls.length],
    artistId,
    artistName,
    stock,
    tags,
    dimensions: category === 'physical' ? `${60 + Math.floor(Math.random() * 40)}x${80 + Math.floor(Math.random() * 40)} cm` : undefined,
    medium: category === 'physical' ? 
      ['Acrylic on canvas', 'Oil on canvas', 'Watercolor', 'Mixed media', 'Ceramic', 'Wood carving', 'Metal work', 'Textile'][Math.floor(Math.random() * 8)] : 
      undefined,
    year: 2020 + Math.floor(Math.random() * 5),
    featured: Math.random() > 0.8, // 20% chance of being featured
  };
});

// Mock Sales Data
export interface Sale {
  id: string;
  artworkId: string;
  artworkTitle: string;
  artistId: string;
  artistName: string;
  customerId: string;
  customerName: string;
  price: number;
  date: string;
  status: 'pending' | 'completed' | 'shipped' | 'cancelled';
}

export const mockSales: Sale[] = [
  {
    id: 'sale-1',
    artworkId: '1',
    artworkTitle: 'Geometric Harmony',
    artistId: '1',
    artistName: 'Youssef Benali',
    customerId: '6',
    customerName: 'Ahmed Customer',
    price: 850,
    date: '2024-01-20',
    status: 'completed',
  },
  {
    id: 'sale-2',
    artworkId: '4',
    artworkTitle: 'Medina Dreams',
    artistId: '2',
    artistName: 'Aicha Mansouri',
    customerId: '7',
    customerName: 'Khadija Benali',
    price: 1200,
    date: '2024-01-22',
    status: 'shipped',
  },
  {
    id: 'sale-3',
    artworkId: '7',
    artworkTitle: 'Islamic Calligraphy',
    artistId: '1',
    artistName: 'Youssef Benali',
    customerId: '6',
    customerName: 'Ahmed Customer',
    price: 650,
    date: '2024-01-25',
    status: 'pending',
  },
];

// Mock Reviews Data
export interface Review {
  id: string;
  artworkId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    artworkId: '1',
    customerId: '6',
    customerName: 'Ahmed Customer',
    rating: 5,
    comment: 'Absolutely stunning piece! The geometric patterns are mesmerizing and the craftsmanship is exceptional.',
    date: '2024-01-22',
  },
  {
    id: 'review-2',
    artworkId: '4',
    customerId: '7',
    customerName: 'Khadija Benali',
    rating: 5,
    comment: 'Beautiful representation of Moroccan culture. The colors are vibrant and the detail is incredible.',
    date: '2024-01-24',
  },
];