const apiKey = 'PXjG2k4gTiQT1uLnemaLCDAX3RDa7jRbL69WIROx';
const today = new Date();
const preparingStartDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
const startDate = preparingStartDate.toISOString().slice(0, 10);
const endDay = today.toISOString().slice(0, 10);

const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDay}&api_key=${apiKey}`;

export const getNeos = () => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
};
