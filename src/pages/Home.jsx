import React from 'react';

// Example components for each section (can be moved to separate files for better organization)
const Banner = () => (
  <section>
    <h2>Banner</h2>
    {/* Add banner content here */}
  </section>
);

const BestSellingItems = ({ items }) => (
  <section>
    <h2>Best Selling Items</h2>
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  </section>
);

const FeaturedItems = ({ items }) => (
  <section>
    <h2>New Featured Items</h2>
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  </section>
);

const Reviews = ({ reviews }) => (
  <section>
    <h2>Reviews</h2>
    <ul>
      {reviews.map((review, idx) => (
        <li key={idx}>{review}</li>
      ))}
    </ul>
  </section>
);

const OurServices = ({ services }) => (
  <section>
    <h2>Our Services</h2>
    <ul>
      {services.map((service, idx) => (
        <li key={idx}>{service}</li>
      ))}
    </ul>
  </section>
);

const Home = () => {
  // Dummy data for demonstration; replace with real data or fetch from API
  const bestSellingItems = [
    { id: 1, name: 'Organic Apple' },
    { id: 2, name: 'Fresh Banana' },
  ];
  const featuredItems = [
    { id: 3, name: 'Green Avocado' },
    { id: 4, name: 'Natural Honey' },
  ];
  const reviews = [
    'Great products!',
    'Fast delivery and fresh items.',
  ];
  const services = [
    'Free Shipping',
    '24/7 Support',
    'Money Back Guarantee',
  ];

  return (
    <div>
      <Banner />
      <BestSellingItems items={bestSellingItems} />
      <FeaturedItems items={featuredItems} />
      <Reviews reviews={reviews} />
      <OurServices services={services} />
    </div>
  );
};

export default Home;