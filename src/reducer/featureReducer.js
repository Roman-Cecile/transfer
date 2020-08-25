import { SAVE_FEATURES } from 'src/action/selectFeatureAction';
import { DELETE_FEATURE } from 'src/action/deleteFeatureAction';

export const initialState = {
  features: [],
};

const featureReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_FEATURES:
      // console.log('reducer', action.features);
      action.features.map((feature) => {
        if (state.features.includes(feature)) {
          return { ...state };
        }
      });
      return {
        ...state,
        features: action.features,
      };
    case DELETE_FEATURE: {
      const index = state.features.indexOf(action.feature);
      state.features.splice(index, 1);
      return {
        ...state,
        features: [...state.features],
      };
    }
    default:
      return state;
  }
};

export default featureReducer;
