import type { LocationObjectCoords } from 'expo-location';

const YELP_API_KEY = 'CYDVTNDLG3fX6kHXvFufpbbDFCmDhcF5OaXZS5SJ0-DwCcqpgW8UozGlGXWqjs7nIelVb8Y07UJVvZt4x1tYqUTtoyrEKv5OI75T-TEektg-FdkWWv45zjzZMABgaHYx'; 

export const getNearbyRestaurants = async (coords: LocationObjectCoords) => {
  const { latitude, longitude } = coords;

  try {
    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${latitude}&longitude=${longitude}&radius=3000&limit=20`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error('Yelp API Error:', data.error);
      return [];
    }

    return data.businesses.map((biz: any) => ({
      id: biz.id,
      name: biz.name,
      image: biz.image_url,
      rating: biz.rating,
      price: biz.price || 'N/A',
      location: biz.location.address1,
      categories: biz.categories.map((cat: any) => cat.title).join(', '),
    }));
  } catch (error) {
    console.error('Error fetching from Yelp:', error);
    return [];
  }
};
