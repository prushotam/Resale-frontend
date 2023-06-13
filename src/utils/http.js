import axios from 'axios';

class AxiosWrapper {
  constructor() {
    this.client = axios.create();
    this.cache = {};
    this.addAuthToken();
    this.addCustomHeaders();
    this.addGlobalErrorHandling();
  }

  get(url, config) {
    // Check if response is in cache
    if (this.cache[url]) {
      console.log(`Getting data from cache for ${url}`);
      return Promise.resolve(this.cache[url]);
    }

    // If not in cache, make the request and cache the response
    return this.client.get(url, config)
      .then(response => {
        console.log(`Adding data to cache for ${url}`);
        this.cache[url] = response;
        return response;
      });
  }

  post(url, data, config) {
    return this.client.post(url, data, config);
  }

  put(url, data, config) {
    return this.client.put(url, data, config);
  }

  delete(url, config) {
    return this.client.delete(url, config);
  }

  addAuthToken() {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }
  }

  addCustomHeaders() {
   // this.client.defaults.headers.common['Custom-Header-2'] = 'Header Value 2';
  }

  addGlobalErrorHandling() {
    this.client.interceptors.response.use(
      response => response,
      error => {
        // Handle error globally
        console.error('Error occurred:', error);
        return Promise.reject(error);
      }
    );
  }
}

export default new AxiosWrapper();