import axios from 'axios';

const getGenres = async () => {
    const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/genres',
    params: {
        output_language: 'en'
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
        console.error('Error fetching List of genres:', error);
        return null
    }
}

export default getGenres;
