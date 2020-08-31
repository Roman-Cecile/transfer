export const SAVE_LAYERS = 'SAVE_LAYERS';
export const SAVE_PROPERTIES = 'SAVE_PROPERTIES';

export const saveLayers = (layerName, layerExtent) => ({
  type: SAVE_LAYERS,
  layerName,
  layerExtent,
});

export const saveProperties = (properties, coordinates) => ({
  type: SAVE_PROPERTIES,
  properties,
  coordinates,
});
