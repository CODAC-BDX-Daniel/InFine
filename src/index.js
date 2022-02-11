// import(/* webpackChunkName: "mapsjs" */ '@here/maps-api-for-javascript').then(
//     ({ default: H }) => {
//         let platform = new H.service.Platform({
//             'apikey': process.env.HERE_APIKEY
//         });
//
//         // Obtain the default map types from the platform object
//         let maptypes = platform.createDefaultLayers();
//
//         // Instantiate (and display) a map object:
//         let map = new H.Map(
//             document.getElementById('mapContainer'),
//             maptypes.vector.normal.map,
//             {
//                 zoom: 10,
//                 center: { lng: 13.4, lat: 52.51 }
//             });
//     }
// ).catch(error => console.log(error));
