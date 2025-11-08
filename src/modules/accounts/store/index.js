import { createStore } from 'vuex';
import * as getters from './getters.js';
import * as mutations from './mutations.js';
import * as actions from './actions.js';
import StoreModel from '@/core/models/StoreModel.js';

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
