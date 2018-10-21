/*
 * Copyright 2003-2006, 2009, 2017, United States Government, as represented by the Administrator of the
 * National Aeronautics and Space Administration. All rights reserved.
 *
 * The NASAWorldWind/WebWorldWind platform is licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Illustrates how to consume imagery from a Web Map Service (WMS).
 */
requirejs(['./WorldWindShim',
        './LayerManager'],
    function (WorldWind,
              LayerManager) {
        "use strict";

        // Tell WorldWind to log only warnings and errors.
        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        // Create the WorldWindow.
        var wwd = new WorldWind.WorldWindow("canvasOne");

        // Create and add layers to the WorldWindow.
        var layers = [
            // Imagery layers.
            {layer: new WorldWind.BMNGLayer(), enabled: true},
            {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
            {layer: new WorldWind.BingAerialLayer(null), enabled: false},
            {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: false},
            {layer: new WorldWind.BingRoadsLayer(null), enabled: false},
            // Add atmosphere layer on top of all base layers.
            {layer: new WorldWind.AtmosphereLayer(), enabled: true},
            // WorldWindow UI layers.
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }


        // Web Map Service information from NASA's Near Earth Observations WMS
        var serviceAddress = "https://neo.sci.gsfc.nasa.gov/wms/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";
        // Named layer displaying Average Temperature data
        var layerName = "MOD11C1_E_LSTNI";
        // SCSIE_W - pokrywa śniegu i zasięg czap lodowych - N
        //MWOI_SST_W - sea temperature
        // NISE_D -Sea Ice Concentration and Snow Extent, Global (1 day - SSM/I / DMSP)
        var IceConcLayer="NISE_D";
        function sleep(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e12; i++) {
              if ((new Date().getTime() - start) > milliseconds){
                break;
              }
            }
          }
        //for (var i = 1;i<13;i++)
        //{
            var month = i.toString().padStart(2,'0');
            var time = '2017-'.concat(month).concat('-01');
        // Called asynchronously to parse and create the WMS layer
        var createMeanTempLayer = function (xmlDom) {
            // Create a WmsCapabilities object from the XML DOM
            var wms = new WorldWind.WmsCapabilities(xmlDom);
            // Retrieve a WmsLayerCapabilities object by the desired layer name
            var wmsLayerCapabilities = wms.getNamedLayer(layerName);
            // Form a configuration object from the WmsLayerCapability object
            var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
            // Modify the configuration objects title property to a more user friendly title
            wmsConfig.title = "temperatura powierzchni";
            // Create the WMS Layer from the configuration object
            var wmsLayer = new WorldWind.WmsLayer(wmsConfig,time);

            // Add the layers to WorldWind and update the layer manager
            wwd.addLayer(wmsLayer);
            layerManager.synchronizeLayerList();
        };

        var createIceLayer =  function (xmlDom) {
            // Create a WmsCapabilities object from the XML DOM
            var wms = new WorldWind.WmsCapabilities(xmlDom);
            // Retrieve a WmsLayerCapabilities object by the desired layer name
            var wmsLayerCapabilities = wms.getNamedLayer(IceConcLayer);
            // Form a configuration object from the WmsLayerCapability object
            var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
            // Modify the configuration objects title property to a more user friendly title
            wmsConfig.title = "Koncentracja lodu i zasięg śniegu";
            // Create the WMS Layer from the configuration object
            var wmsLayer = new WorldWind.WmsLayer(wmsConfig,time);

            // Add the layers to WorldWind and update the layer manager
            wwd.addLayer(wmsLayer);
            layerManager.synchronizeLayerList();
        };

        // Called if an error occurs during WMS Capabilities document retrieval
        var logError = function (jqXhr, text, exception) {
            console.log("There was a failure retrieving the capabilities document: " + text + " exception: " + exception);
        };
        console.log(wwd.layers);
        wwd.removeLayer(wwd.layers[-1]);
        wwd.removeLayer(wwd.layers[-2]);
        $.get(serviceAddress).done(createMeanTempLayer).fail(logError);
        $.get(serviceAddress).done(createIceLayer).fail(logError);
        
        // Create a layer manager for controlling layer visibility.
        

        //sleep(10000);
    //}
    var layerManager = new LayerManager(wwd);

    });