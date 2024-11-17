import axios from 'axios';

const searchByGenre = async (genres) => {
    const options = {
        method: 'GET',
        url: 'https://streaming-availability.p.rapidapi.com/shows/search/filters',
        params: {
            country: 'ca',
            series_granularity: 'show',
            genres: genres,
            order_direction: 'asc',
            order_by: 'original_title',
            genres_relation: 'and',
            output_language: 'en',
            show_type: 'movie'
        },
        headers: {
            'x-rapidapi-key': '38ca06ba6fmshde7c1a23eb02c2ap1a39dfjsn21880c6ecf63',
            'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data.shows)
        return response.data.shows;
    } catch (error) {
        console.error('Error fetching movies by genre:', error);
        return null;
    }
};

export default searchByGenre;
