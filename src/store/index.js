import { createStore } from 'vuex';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';
import StoreModel from '@/models/StoreModel';

/**
 * @type {StoreModel}
 */
const state = new StoreModel();

export default createStore({
  state,
  getters,
  mutations,
  actions
});
