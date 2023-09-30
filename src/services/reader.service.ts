import FetchParams from '@/types/fetchParams.type';
import axios from 'axios';
import store from '@/store';

export const fetchAPI = async (endpoin: string, params?: FetchParams) => {
  try {
    store.commit('LOADING', true);
    return await axios.get(endpoin, { params });
  } catch (error) {
    console.log(error);
  } finally {
    store.commit('LOADING', false);
  }
};

export const putQRStock = async (body: any) => {
  axios.defaults.baseURL = 'https://tagsamurai.free.beeceptor.com';
  try {
    await axios.put('/v2/1', body).then((res) => console.log(res));
  } catch {
    //
  }
};
