import { connect } from 'react-redux';


import App from '../../components/App';
import { deleteFeature } from '../../action/deleteFeatureAction';

const mapStateToProps = (state) => ({
  featuresSelected: state.featureReducer.features,
});

const mapDispatchToProps = (dispatch) => ({
  deleteFeature: (event, feature) => {
    dispatch(deleteFeature(feature));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
