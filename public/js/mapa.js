/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scr/js/mapa.js":
/*!************************!*\
  !*** ./scr/js/mapa.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\n\n    const lng = document.querySelector('#lng').value || -73.132978; \n    const lat = document.querySelector('#lat').value || 7.1183812; \n    const mapa = L.map('mapa').setView([lat, lng ], 15);\n    let marker;\n\n    // Utilizar provider y geocoder\n    const geocodeService = L.esri.Geocoding.geocodeService();\n    \n\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(mapa);\n\n\n    // El pin\n    marker = new L.marker([lat, lng], {\n        draggable: true,\n        autoPan: true\n    }).addTo(mapa);\n\n    marker.on('moveend', (e)=>{\n        marker = e.target;\n        const position = marker.getLatLng();\n\n        mapa.panTo(new L.LatLng(position.lat, position.lng));\n\n        // Obtener informacion de las calles al soltar el pin\n        geocodeService.reverse().latlng(position, 15).run(function(error, resultado){\n        \n        \n        marker.bindPopup(resultado.address.LongLabel);\n        \n        // Llenar los campos\n        document.querySelector('.calle').textContent = resultado?.address?.Address ?? ''\n        document.querySelector('#calle').value = resultado?.address?.Address ?? ''\n        document.querySelector('#lat').value = resultado?.latlng?.lat ?? ''\n        document.querySelector('#lng').value = resultado?.latlng?.lng ?? ''\n\n    });\n    });\n\n})()\n\n//# sourceURL=webpack://bienes-raices-mvc/./scr/js/mapa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./scr/js/mapa.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;