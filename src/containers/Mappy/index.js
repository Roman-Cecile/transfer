import { connect } from 'react-redux';

import { saveFeatures } from '../../action/selectFeatureAction';
import { saveLayers, saveProperties } from '../../action/saveLayersAction';
import Mappy from '../../components/Mappy';

const mapStateToProps = (state) => ({
  featuresTarget: state.featureReducer.features,
  layersActive: state.layerReducer.layers,
  coordinates: state.layerReducer.coordinates,
  properties: state.layerReducer.properties,
});

const mapDispatchToProps = (dispatch) => ({
  handleFeature: (features) => {
    // console.log('containers', features);
    dispatch(saveFeatures(features));
  },
  handleLayers: (layerName, layerExtent) => {
    dispatch(saveLayers(layerName, layerExtent));
  },
  handleProperties: (properties, coordinates) => {
    dispatch(saveProperties(properties, coordinates));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mappy);
