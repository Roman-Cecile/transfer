import { connect } from 'react-redux';

import { saveFeatures } from '../../action/selectFeatureAction';
import { saveLayers } from '../../action/saveLayersAction';
import Mappy from '../../components/Mappy';

const mapStateToProps = (state) => ({
  featuresTarget: state.featureReducer.features,
  layersActive: state.layerReducer.layers,
});

const mapDispatchToProps = (dispatch) => ({
  handleFeature: (features) => {
    // console.log('containers', features);
    dispatch(saveFeatures(features));
  },
  handleLayers: (layers) => {
    dispatch(saveLayers(layers));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mappy);
