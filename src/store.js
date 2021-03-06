import Vue from 'vue'
import Vuex from 'vuex'
import uniqid from 'uniqid';
import types from './types';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filter: [{
      id: uniqid(),
      title: 'Filter',
      color: '#75B3EF',
      regExp: '',
      icon: 'filter_list',
      orORand: 1
    }],
    fileUrl: ''
  },
  getters: {
    filter: (state, getters) => {
      return state.filter;
    },
    fileUrl: (state, getters) => {
      return state.fileUrl;
    } 
  },
  mutations: {
    [types.ADD_FILTER] (state, payload) {
      state.filter.push({
        id: uniqid(),
        title: payload.title,
        color: payload.color,
        regExp: payload.regExp
      });
    },
    [types.UPDATE_FILTER] (state, payload) {
      state.filter = state.filter.filter(item => {
        return item.id.toString() !== payload.id.toString();
      });
      state.filter.push(payload);
    },
    [types.DELETE_FILTER] (state, id) {
      let delCount = state.filter.map((f) => {return f.id}).indexOf(id);
      state.filter.splice(delCount , 1)
    },
    [types.SET_FILE_URL] (state, fileUrl) {
      state.fileUrl = fileUrl;
    }
  },
  actions: {

  }
})
