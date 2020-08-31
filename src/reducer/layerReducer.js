import {
  SAVE_LAYERS,
  SAVE_PROPERTIES,
  SAVE_IMPORTED_LAYERS,
} from '../action/saveLayersAction';
import { DELETE_LAYER } from '../action/deleteLayerAction';


export const initialState = {
  layers: [],
  importedLayers: [],
  properties: {},
  coordinates: [],
};

const LayerReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_LAYERS: {
      const layerInState = state.layers;
      const newLayer = { name: action.layerName, extent: action.layerExtent };
      layerInState.push(newLayer);
      return {
        ...state,
        layers: [...layerInState],
      };
    }
    case SAVE_IMPORTED_LAYERS: {
      const layerInState = state.importedLayers;
      const newLayer = { name: action.layerName, extent: action.layerExtent };
      layerInState.push(newLayer);
      return {
        ...state,
        importedLayers: [...layerInState],
      };
    }
    case DELETE_LAYER: {
      const { layers } = state;
      const index = layers.indexOf(action.layer);
      layers.splice(index, 1);
      return {
        ...state,
        layers: [...state.layers],
      };
    }
    case SAVE_PROPERTIES:
      return {
        ...state,
        properties: [action.properties],
        coordinates: [action.coordinates],
      };
    default:
      return state;
  }
};

export default LayerReducer;
