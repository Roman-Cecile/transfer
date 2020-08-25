import { connect } from 'react-redux';

import { saveFeatures } from '../../action/selectFeatureAction';
import Mappy from '../../components/Mappy';

const mapStateToProps = (state) => ({
  featuresTarget: state.featureReducer.features,
});

const mapDispatchToProps = (dispatch) => ({
  handleFeature: (features) => {
    // console.log('containers', features);
    dispatch(saveFeatures(features));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mappy);
