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
  <li>JQuery</li>
</ol>

### Quick Start
To implement the software to a specific area you will need to
1. Acquire the [data](https://nhd.usgs.gov/data.html) from the [U.S. Geological Survey](https://nhd.usgs.gov/)
2. Extract the FlowLine file out of the data product (they are all free but are referred to as products)
3. Convert FlowLine into geoJSON, using either the [ogr2ogr web client](https://ogre.adc4gis.com/) or [org2ogr command line tools
