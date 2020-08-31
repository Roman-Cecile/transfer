import { connect } from 'react-redux';

import ImportedLayers from '../../components/ImportedLayer';

const mapStateToProps = (state) => ({
  importedLayers: state.layerReducer.importedLayers,
});

const mapDispatchToProps = (dispatch) => ({
 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImportedLayers);
