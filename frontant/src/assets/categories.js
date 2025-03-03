const categories = [
  {
    id: 'trending',
    name: 'Trending',
    products: [
      {
        id: 1,
        name: 'Elegant Evening Dress',
        price: 129.99,
        description: 'Beautiful evening dress for special occasions',
        category: 'Dresses',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
        rating: 4.5,
        reviews: 24,
        badge: 'new'
      },
      {
        id: 2,
        name: 'Premium Denim Collection',
        price: 89.99,
        description: 'High-quality denim collection with perfect fit',
        category: 'Jeans',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246',
        rating: 4.3,
        reviews: 18,
        badge: 'sale'
      },
      {
        id: 3,
        name: 'Summer Essentials',
        price: 59.99,
        description: 'Must-have summer clothing items',
        category: 'Summer',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
        rating: 4.0,
        reviews: 12,
        badge: 'trending'
      },
      {
        id: 4,
        name: 'Luxury Handbags',
        price: 199.99,
        description: 'Designer handbags made with premium materials',
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
        rating: 4.8,
        reviews: 32,
        badge: 'premium'
      }
    ]
  },
  {
    id: 'new',
    name: 'New Arrivals', 
    products: [
      {
        id: 5,
        name: 'Designer Sunglasses',
        price: 149.99,
        description: 'Stylish designer sunglasses for any occasion',
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
        rating: 4.4,
        reviews: 15,
        badge: 'new'
      },
      {
        id: 6,
        name: 'Premium Watches',
        price: 299.99,
        description: 'Luxury watches with premium craftsmanship',
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314',
        rating: 4.7,
        reviews: 28,
        badge: 'premium'
      },
      {
        id: 7,
        name: 'Casual Sneakers',
        price: 79.99,
        description: 'Comfortable casual sneakers for everyday wear',
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2',
        rating: 4.2,
        reviews: 22,
        badge: 'sale'
      }
    ]
  },
  {
    id: 'seasonal',
    name: 'Seasonal',
    products: [
      {
        id: 8,
        name: 'Winter Coats',
        price: 189.99,
        description: 'Warm winter coats for cold weather',
        category: 'Outerwear',
        image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543',
        rating: 4.6,
        reviews: 20,
        badge: 'seasonal'
      },
      {
        id: 9,
        name: 'Spring Dresses',
        price: 99.99,
        description: 'Light and flowy dresses for spring',
        category: 'Dresses',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446',
        rating: 4.3,
        reviews: 16,
        badge: 'seasonal'
      }
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories',
    products: [
      {
        id: 10,
        name: 'Leather Belts',
        price: 45.99,
        description: 'Quality leather belts for any outfit',
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
        rating: 4.1,
        reviews: 14,
        badge: null
      },
      {
        id: 11,
        name: 'Designer Scarves',
        price: 39.99,
        description: 'Elegant designer scarves for all seasons',
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26',
        rating: 4.0,
        reviews: 10,
        badge: null
      }
    ]
  },
  {
    id: 'footwear',
    name: 'Footwear',
    products: [
      {
        id: 12,
        name: 'Luxury Heels',
        price: 159.99,
        description: 'Elegant high heels for special occasions',
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
        rating: 4.5,
        reviews: 25,
        badge: 'premium'
      },
      {
        id: 13,
        name: 'Casual Loafers',
        price: 89.99,
        description: 'Comfortable loafers for casual wear',
        category: 'Footwear',
        image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509',
        rating: 4.2,
        reviews: 19,
        badge: null
      }
    ]
  },
  {
    id: 'activewear',
    name: 'Activewear',
    products: [
      {
        id: 14,
        name: 'Performance Leggings',
        price: 69.99,
        description: 'High-performance leggings for workouts',
        category: 'Activewear',
        image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c',
        rating: 4.4,
        reviews: 30,
        badge: 'trending'
      },
      {
        id: 15,
        name: 'Sports Bras',
        price: 34.99,
        description: 'Supportive sports bras for active lifestyle',
        category: 'Activewear',
        image: 'https://images.unsplash.com/photo-1571945192246-4fcee13c27b1',
        rating: 4.3,
        reviews: 26,
        badge: null
      }
    ]
  },
  {
    id: 'formal',
    name: 'Formal Wear',
    products: [
      {
        id: 16,
        name: 'Business Suits',
        price: 299.99,
        description: 'Professional business suits for work',
        category: 'Formal',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
        rating: 4.7,
        reviews: 35,
        badge: 'premium'
      },
      {
        id: 17,
        name: 'Formal Shirts',
        price: 79.99,
        description: 'Classic formal shirts for business wear',
        category: 'Formal',
        image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157',
        rating: 4.2,
        reviews: 21,
        badge: null
      }
    ]
  },
  {
    id: 'beachwear',
    name: 'Beachwear',
    products: [
      {
        id: 18,
        name: 'Swimsuits',
        price: 49.99,
        description: 'Stylish swimsuits for beach days',
        category: 'Beachwear',
        image: 'https://images.unsplash.com/photo-1570976447640-ac859083963f',
        rating: 4.1,
        reviews: 17,
        badge: 'seasonal'
      },
      {
        id: 19,
        name: 'Beach Cover-ups',
        price: 39.99,
        description: 'Light beach cover-ups for summer',
        category: 'Beachwear',
        image: 'https://images.unsplash.com/photo-1517637382994-f02da38c6728',
        rating: 4.0,
        reviews: 13,
        badge: 'seasonal'
      }
    ]
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    products: [
      {
        id: 20,
        name: 'Statement Necklaces',
        price: 89.99,
        description: 'Bold statement necklaces for any outfit',
        category: 'Jewelry',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338',
        rating: 4.4,
        reviews: 23,
        badge: null
      },
      {
        id: 21,
        name: 'Designer Rings',
        price: 129.99,
        description: 'Elegant designer rings for special occasions',
        category: 'Jewelry',
        image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9',
        rating: 4.6,
        reviews: 27,
        badge: 'premium'
      }
    ]
  }
];

export default categories;
