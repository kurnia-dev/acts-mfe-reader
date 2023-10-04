import FetchParams from '@/types/fetchParams.type';
import axios from 'axios';
import store from '@/store';

const user = JSON.parse(localStorage.getItem('user')!);
const API = ({ headers = {}, params = {} } = {}) => {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_ASSETS_API}`,
    headers: {
      Authorization: `Bearer ${user?.token}`,
      ...headers,
    },
    params,
  });
  return instance;
};

const loading = () => store.commit('LOADING', !store.state.loading);

export const getTagStock = async (params: FetchParams = {}) => {
  try {
    loading();
    return await API({ params }).get('/v2/_id');
  } catch (error) {
    console.log(error);
  } finally {
    loading();
  }
};

export const getTransactionHistory = async (params: FetchParams = {}) => {
  try {
    loading();
    return await API({ params }).get('/v2/_id');
  } catch (error) {
    console.log('Transaction History could not be loaded. ');
  } finally {
    loading();
  }
};

export const getAllData = async (endPoint: string) => {
  return await API().get(endPoint);
};

export const getStockDetail = async (id: string, params: FetchParams = {}) => {
  try {
    loading();
    return await API({ params }).get('/v2/_id/' + id);
  } catch (error) {
    console.log(error);
  } finally {
    loading();
  }
};

export const getTransactionHistoryDetail = async (
  id: string,
  params: FetchParams = {}
) => {
  try {
    loading();
    return await API({ params }).get('/v2/_id/' + id);
  } catch (error) {
    console.log('Transaction History detail could not be loaded. ');
  } finally {
    loading();
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
