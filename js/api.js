const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const sendRequest = (onSuccess, onError, method, body) => {
  fetch(`${BASE_URL}${method === 'GET' ? '/data' : '/'}`, { method, body })
    .then((response) => {
      if (!response.ok){
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(onSuccess)
    .catch(onError);
};

export const loadData = (onSuccess, onError) => sendRequest(onSuccess, onError, 'GET');
export const uploadData = (onSuccess, onError, body) => sendRequest(onSuccess, onError, 'POST', body);
