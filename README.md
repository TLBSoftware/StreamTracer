# Stream Tracer
### Reason for software
Tool to enhance Spill Response Teams efforts against spills.
With the ability to trace downstream you can:
  <ul>
    <li>Foresee where a spill will flow through a network of streams</li>
    <li>Retrieve the streams and coordinates of the full course of the trace</li>
  </ul>
With the ability to trace upstream you can:
  <ul>
    <li>Dignify areas of importance and expose an entire upstream network that flows to them</li>
    <li>Simulate coverage of chokepoints in order to plan emergency response stations and measures</li>
  </ul>
  
### Tools used in development
The application is written in 3 languages:
<ol>
  <li>JavaScript (ES6 standards)</li>
  <li>HTML5</li>
  <li>CSS3</li>
</ol>

And uses a few technologies to make it work:
<ol>
  <li>Leaflet</li>
  <li>Nodejs</li>
  <li>JQuery (Not necessary but helps)</li>
</ol>

### Terms and their Meanings
<ul>
  <li>
  <h4>Node</h4>
  <p>Represents the end of a stream and the start of another, these nodes are what is used in order to find the relations between the stream segments, also is the command line command for using nodejs which allows you to execute custom scripts found in this repo</p>
  </li>
  
  <li>
  <h4>Streams</h4>
  <p>Flow line</p>
  </li>
  <li>
  </li>
  <li>
  </li>
  <li>
  </li>
</ul>

### Quick Start
To implement the software to a specific area you will need to
1. Acquire the [data](https://nhd.usgs.gov/data.html) from the [U.S. Geological Survey](https://nhd.usgs.gov/)
2. Extract the FlowLine file out of the data product (they are all free but are referred to as products)
3. Convert FlowLine into geoJSON, using either the [ogr2ogr web client](https://ogre.adc4gis.com/) or [org2ogr command line tools](http://www.gdal.org/ogr2ogr.html)
4. Now with the geoJSON file use nodejs/parcestreamfilewithoutnode.js in order to create the indexed stream file and node file ex.
```bash
%PROJECTFOLDER%\nodejs> $ node parcestreamfilewithoutnode [flow_line_geojson_file]
```
5. You will now need to create a custom leaflet map which contains an instance of the StreamNodeHierarchy class globally. This will hold the streams and allow tracing in several other methods.
6. Load both of the parsed stream and node files into the LoadData() method of the StreamNodeHierarchy instance
```javascript
//global variables
const streamer = new StreamNodeHierarchy();
var map,
  streamlayer;

function initmap(){
//CREATE MAP FIRST
  let YourElementID = //place your divs id here;
  let center = //place lat and long 2d array for starting place of map
  let zoom = //place zoom level, higher number is close to earth
  map = L.map(YourElementID).setView(center, zoom);
  
  let streampath = //place path to parsed stream file
  let nodepath = //place path to parsed node file
//load stream data
  $.getJSON(streampath, function(streams){
    console.log(streams, "data loaded from getJSON call");
    
    
    //load node data
    $.getJSON(nodepath, function(node){
      //load these json objects into the streamer now
      streamer.LoadData(streams, node);
    })
    
    //Create Layer from the stream in the global scope to allow it to be removed and added
    streamlayer = L.geoJSON(streams).addTo(map);
  })
}
```
7. You should now have a map that displays the streams layer. If we assign a click event to each feature of the layer we can allow tracing, we should also look into styling the streams to indicate what type they are visually. To do that we need to pass an object as the second parameter to the L.geoJSON method. This object contains options for your layer. Consult the leaflet docs for info on the options. Here we will be using the **onEachFeature** and **style** options, we will be supplying function objects that we will create in the next step.
```javascript

var streamlayer = L.geoJSON(streams, {
    onEachFeature: function(feature, layer){
      //we only need the layer to be bounded to the click
      layer.on('click', CustomClickFunction);
    },
    style: CustomStyleFunction
  }); //end of geoJSON

```
8. This wont work just yet, we need to now assign the functionality we desire by implementing the **CustomClickFunction** and **CustomStyleFunction**

```javascript
//will recieve the feature itself to analyze for styling
  function CustomStyleFunction(feature){
  //colors for streams
    let red = "#ff0000",
        blue = "#0000ff",
        green = "#00ff00";
      
    switch(feature.properties.FCode){
    //fcodes for underground conduits
        case 42001: return {color: red};
        case 42002: return {color: red};
    //fcodes for streams
        case 46006: return {color: green};
        case 46003: return {color: green};
    //fcodes for rivers and larger streams
        case 55800: return {color: blue};
    }
    return {color: red};
  }

//requires event parameter which layer will pass to it
  function CustomClickFunction(event){
    //event contains a lot of information, including button presses in combination with the clicks
    //this is nice because we can assign advanced functionality to desktops/laptops
    //here we will only do a downstream trace, same process is used for the UpstreamTrace() method
    
    let feature = event.target.feature; //feature that was clicked on
    let downstreamGeojson = streamer.DownstreamTrace(feature);
    
    //remove old layer then create and add this trace
    
    map.removeLayer(streamlayer);
    L.geoJSON(downstreamGeojson).addTo(map);
  }
```

9. Now we have a map that when clicked can display the downstream trace from that point. For more advanced map functionality you should look into LayerControls, which allow you to toggle layers easily. As well as creating custom controls.
