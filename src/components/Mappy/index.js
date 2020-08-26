import React, {
  useEffect,
} from 'react';
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
import GeoJSON from 'ol/format/GeoJSON';
import data from '../../../public/FT_Chambre_3857.geojson';

import MenuCreate from '../MenuCreate';
import ButtonEdit from '../ButtonEdit';
import SpeedDial from '../SpeedDial';

const Mappy = ({
  handleFeature,
}) => {
  const [edit, setEdit] = React.useState(false);
  const [create, setCreate] = React.useState(false)
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

    const map = new Map({
      layers: [raster, vector],
      target: 'map',
      view: new View({
        center: [300000, 5900000],
        zoom: 6.6,
        extent: [-1249198.2873332978, 5142345.212601059, 1849198.2873332978, 6657654.787398941]
      }),
    });
    map.getView().fit(source.getExtent()); // Permet de zoomer automatiquement sur la zone loadée
    // console.log(map.getView().calculateExtent());
    console.log(data);
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
            setCreate(false)
            return draw.finishDrawing();
          }
        };
        map.removeInteraction(draw);
        map.removeInteraction(snap);
        map.removeInteraction(modify);
        addInteractions();
      }
    };
  }, []);

  return (
    <>

      {/* <MenuCreate disabled={create} /> */}
      <SpeedDial disabledCreate={create} disabledEdit={edit} />
      {/* {edit
      && <ButtonEdit />} */}
      <div
        id="map"
        style={
      {
        width: '100%',
        height: '100vh',
      }
    }
      />
    </>

  );
};

export default Mappy;
