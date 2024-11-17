import axios from 'axios';

const searchByTitle = async (title) => {
  const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/shows/search/title',
    params: {
      country: 'ca',
      title: title, // The search term will be passed in
      series_granularity: 'show',
      show_type: 'movie',
      output_language: 'en'
    },
    headers: {
      'x-rapidapi-key': '38ca06ba6fmshde7c1a23eb02c2ap1a39dfjsn21880c6ecf63',
      'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data[0]);
    return response.data; // Returning data to use in the UI
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
};

export default searchByTitle;
