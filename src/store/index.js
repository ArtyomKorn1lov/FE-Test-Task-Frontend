import { createStore } from 'vuex';
import * as getters from './getters';
import * as mutations from './mutations';
import StoreModel from '@/models/StoreModel';

const state = new StoreModel();

export default createStore({
  state,
  getters,
  mutations
});
