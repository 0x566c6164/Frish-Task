import axios from 'axios';

// Could use .env instead
const API_KEY = '9Iaq5lP41La1PWe8XMRdRTQNTZCypPJ6NbdjHxy9';

export default {
  getData,
};

async function getData() {
  try {
    const res = await axios.get(
      'https://cors-anywhere.herokuapp.com/https://i3gy725noe.execute-api.us-east-1.amazonaws.com/default/VisualizatorApi',
      {
        headers: {
          'x-api-key': API_KEY,
          mode: 'no-cors',
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error.response);
  }
}
