import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Visibility as VisibilityIcon,
  Clear as ClearIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  liStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(1),
  },
  title: {
    margin: theme.spacing(1),
    color: 'grey',
    fontStyle: 'italic',
    fontSize: '0.9em',
  },
  eyes: {
    color: '#3f51b5',
  },
}));

const ImportedLayer = ({ importedLayers }) => {
  const classes = useStyles();
  return (
    <>
      <p className={classes.title}>
        Calques importées ({importedLayers.length})
      </p>
      <ul>
        {importedLayers
          ? importedLayers.map((layer) => (
            <li
              className={classes.liStyle}
              onClick={() => window.postMessage(['showLayer', layer.extent])}
            >
              <span style={{ cursor: 'pointer' }}>{layer.name}</span>
              <div>
                <VisibilityIcon style={{ cursor: 'pointer' }} />
                <ClearIcon color="secondary" style={{ cursor: 'pointer' }} />
              </div>
            </li>
          ))
          : console.log('non')}
      </ul>

    </>
  );
};

export default ImportedLayer;
