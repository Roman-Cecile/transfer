import React, {
  useEffect,
} from 'react';
import clsx from 'clsx';
// Import OpenLayer \\
import Map from 'ol/Map';
import View from 'ol/View';
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
} from 'ol/style';
import {
  Draw,
  Modify,
  Snap,
  DragBox,
  Select,
  DragAndDrop,
  defaults as defaultInteractions,
} from 'ol/interaction';
import {
  OSM,
  Vector as VectorSource,
} from 'ol/source';
import {
  Tile as TileLayer,
  Vector as VectorLayer,
} from 'ol/layer';
import {
  platformModifierKeyOnly,
} from 'ol/events/condition';
import {
  GeoJSON,
} from 'ol/format';
import * as olControl from 'ol/control';

// Import Material UI
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  CssBaseline,
  Divider,
  Fab,
  Badge,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  InsertDriveFileOutlined as InsertDriveFileOutlinedIcon,
} from '@material-ui/icons';
import {
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';

// Import Component
import SpeedDial from '../SpeedDial';
import Menu from '../Menu';



// Import data GEOJSON
import data from '../../../public/FT_Chambre_3857.geojson';
// Import Style
import './style.scss';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  AppBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    zIndex: 50,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  insertDriveIcon: {
    margin: '0.5em auto',
    cursor: 'pointer',

  }
}));

const Mappy = ({
  handleFeature,
  handleLayers,
  layersActive
}) => {
  const [edit, setEdit] = React.useState(false);
  const [create, setCreate] = React.useState(false);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    let draw;
    let snap;
    let modify;
    const raster = new TileLayer({
      source: new OSM(),
    });
    const source = new VectorSource({
      features: new GeoJSON().readFeatures(data),
    });
    const vector = new VectorLayer({
      source,
      name: 'FT_Chambre',
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });
    handleLayers(vector.get('name'));
    // Drag and drop file format
    const dragAndDropInteraction = new DragAndDrop({
      formatConstructors: [GeoJSON],
    });

    // Create map \\
    const map = new Map({
      interactions: defaultInteractions().extend([dragAndDropInteraction]),
      layers: [raster, vector],
      target: 'map',
      controls: olControl.defaults({ rotate: false }),
      view: new View({
        center: [300000, 5900000],
        zoom: 6.6,
        extent: [-1249198.2873332978, 5142345.212601059, 1849198.2873332978, 6657654.787398941],
      }),
    });

    // Event Drag and drop
    dragAndDropInteraction.on('addfeatures', (event) => {
      const vectorSource = new VectorSource({
        features: event.features,
      });
      map.addLayer(
        new VectorLayer({
          source: vectorSource,
          name: event.file.name,
          extent: event.projection.getExtent(),
          style: new Style({
            fill: new Fill({
              color: 'rgba(255, 255, 255, 0.2)',
            }),
            stroke: new Stroke({
              color: '#1d3557',
              width: 2,
            }),
            image: new CircleStyle({
              radius: 7,
              fill: new Fill({
                color: '#e63946',
              }),
            }),
          }),
        }),
      );
      console.log(event);
      const layerName = event.file.name;
      const layerExtent = event.projection.getExtent();
      handleLayers(layerName, layerExtent);

      map.getView().fit(vectorSource.getExtent());
    });

    // map.getView().fit(source.getExtent()); // Permet de zoomer automatiquement sur la zone loadée
    // console.log(map.getView().calculateExtent());
    const select = new Select();
    map.addInteraction(select);
    const selectedFeatures = select.getFeatures();
    const dragBox = new DragBox({
      source,
      condition: platformModifierKeyOnly,
    });
    map.addInteraction(dragBox);
    dragBox.on('boxend', () => {
      const extent = dragBox.getGeometry().getExtent();
      source.forEachFeatureIntersectingExtent(extent, (feature) => {
        feature.set('name', `feature n°${feature.ol_uid}`);
        feature.set('id', feature.ol_uid);
        // console.log(feature.getGeometry().getLinearRing().getCoordinates());
        selectedFeatures.push(feature);
      });
      // handleFeature(selectedFeatures.getArray().map((feature) => feature.get('name')));
      const featuresArr = [];
      selectedFeatures.forEach((feature) => {
        featuresArr.push(feature.get('name'));
      });
      handleFeature(featuresArr);
    });

    dragBox.on('boxstart', () => {
      selectedFeatures.clear();
    });

    window.onmessage = (event) => {
      if (event.data[0] === 'deleteOneFeature') {
        source.getFeatures().forEach((feature) => feature.get('name') === event.data[1] && source.removeFeature(feature));
      }
      else if (event.data[0] === 'deleteLayer') {
        // map.getFeatures().forEach((feature) => console.log(feature));
        // console.log(event.data[1]);
        map.getLayers().forEach((layer) => layer.get('name') === event.data[1] && map.removeLayer(layer));
      }
      else if (event.data[0] === 'deleteAllFeatures') {
        selectedFeatures.forEach((feature) => source.removeFeature(feature));
      }
      else if (event.data[0] === 'edit') {
        setCreate(true);
        modify = new Modify({
          source,
        });
        map.addInteraction(modify);
      }
      else if (event.data[0] === 'select' || event.data[0] === 'escape') {
        const typeSelect = event.data[1];
        const addInteractions = () => {
          draw = new Draw({
            source,
            type: typeSelect,

          });
          draw.on('drawend', () => {
            setEdit(true);
          });
          if (event.data[0] === 'select') {
            map.addInteraction(draw);
            snap = new Snap({
              source,
            });
            map.addInteraction(snap);
          }
          else if (event.data[0] === 'escape') {
            setCreate(false);
            return draw.finishDrawing();
          }
        };
        map.removeInteraction(draw);
        map.removeInteraction(snap);
        map.removeInteraction(modify);
        addInteractions();
      }
      else if (event.data[0] === 'showLayer') {
        map.getView().fit(source.getExtent(event.data[1]));
      }
    };
  }, []);

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Odyssée
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          {open
            ? (
              <List>
                <ListItem>
                  <Menu />
                </ListItem>
              </List>
            )
            : (
              <>
                <Badge color="secondary" overlap="circle" badgeContent={layersActive.length}>
                  <Fab color="primary" className={classes.insertDriveIcon} onClick={handleDrawerOpen} >
                    <InsertDriveFileOutlinedIcon />
                  </Fab>
                </Badge>
                <SpeedDial disabledCreate={create} disabledEdit={edit} drawerState={open} />
              </>
            )}
        </Drawer>
      </div>
      <div
        id="map"
        style={
      {
        width: '100%',
        height: '100vh',
        marginTop: '3em',
      }
    }
      />
    </>

  );
};

export default Mappy;
