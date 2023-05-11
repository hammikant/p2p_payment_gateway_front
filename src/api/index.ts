import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

export const mockInstanceApi = new MockAdapter(axios, {
    delayResponse: 500
});

export const instanceApi = axios.create({});
