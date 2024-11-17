import axios from 'axios';

// Fetch movie details by ID
const getMovieDetails = async (id) => {
  const options = {
    method: 'GET',
    url: `https://streaming-availability.p.rapidapi.com/shows/${id}`, // Adjust this based on your API
    params: {
        output_language: 'en',
        country: 'ca'
    },
        headers: {
        'x-rapidapi-key': '38ca06ba6fmshde7c1a23eb02c2ap1a39dfjsn21880c6ecf63',
        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export default getMovieDetails;
