export const SAVE_LAYERS = 'SAVE_LAYERS';

export const saveLayers = (layerName, layerExtent) => ({
  type: SAVE_LAYERS,
  layerName,
  layerExtent,
});
