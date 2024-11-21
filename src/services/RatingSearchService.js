import axios from 'axios';

// Service to fetch shows by rating
const fetchShowsByRating = async (ratingMin, ratingMax, keyWordTitle) => {
  const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/shows/search/filters',
    params: {
        country: 'ca',
        series_granularity: 'show',
        order_direction: 'asc',
        order_by: 'original_title',
        keyword: keyWordTitle,
        genres_relation: 'and',
        output_language: 'en',
        rating_max: ratingMax,
        rating_min: ratingMin
    },
    headers: {
      'x-rapidapi-key': '38ca06ba6fmshde7c1a23eb02c2ap1a39dfjsn21880c6ecf63',
      'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
    }
  };

  console.log('fetching by rating 2')

  try {
    const response = await axios.request(options);
    console.log(response.data)
    return response.data; // Return the data for use in the UI
  } catch (error) {
    console.error('Error fetching data by rating: ', error);
    return null; // Return null to handle errors gracefully
  }
};

export default fetchShowsByRating;