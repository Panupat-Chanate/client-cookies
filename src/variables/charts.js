// // import React from "react";
// // const axios = require('axios');
// // const [dataArray, setDataArray] = React.useState('');
//   // const data = axios.get("https://ichater.com/cookies/api/data")
//   // .then((response) => {
//   //   // setDataArray(response.data)
//   //   console.log(response.data)
//   // }).catch((error) => {
//   //   console.log(error)
//   // });
// /*!

// =========================================================
// * Black Dashboard React v1.2.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/black-dashboard-react
// * Copyright 2020 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */

// const { Component } = require("react");

// // ##############################
// // // // Get Data
// // #############################
// const _ = require("lodash");
// var arrDate = [];
// var dPath = [];
// var mPath = [];
// var wPath = [];
// var valDay = '';
// var valMonth = '';
// var valWeek = '';
// var lenDay = '';
// fetch('http://127.0.0.1:5000/cookies/api/agree')
// .then(res => res.json())
// .then(dataArray => {
//   console.log('DataArray fetched', dataArray)
//   var dateNow = new Date();
//   var sliDateNow = dateNow.toISOString().slice(0, 10)

//   var first = dateNow.getDate() - dateNow.getDay();
//   var last = first + 6; // last day is the first day + 6
//   var firstday = new Date(dateNow.setDate(first)).toISOString();
//   var lastday = new Date(dateNow.setDate(last)).toISOString();
//   var fDay = firstday.slice(0, 10)
//   var lDay = lastday.slice(0, 10)
//   console.log(fDay)
//   console.log(lDay);

//   for (var i=0; i<dataArray.length; i++) {
//     var sliDateDB = dataArray[i]
//     if (sliDateNow === sliDateDB) {
//       var str = dataArray[i].data[5].pathname
//       if (strM!=undefined) {
//         // var splPath = str.split("/")[1]
//         if (str==="/") { dPath.push("index") }
//         else { dPath.push(str.split("/")[1]) }
//       }
//     }
//     var DateDB = new Date(dataArray[i].createdAt);
//     var dbMonth = DateDB.getMonth();
//     var getMonth = dateNow.getMonth();
//     if (getMonth===dbMonth) {
//       var strM = dataArray[i].data[5].pathname
//       if (strM!=undefined){
//         if (strM==='/') { mPath.push("index") }
//         else {mPath.push(strM.split("/")[1])}
//       }
//       // else {
//       //   // var splMPath = strM.split("/")[1]
//       //   mPath.push(strM)
//       // }
//     }
//     if (sliDateDB>=fDay && sliDateDB<=lDay && strM!=undefined) {
//       // console.log(strM)
//       if (strM==='/') { wPath.push("index") }
//       else {wPath.push(strM.split("/")[1])}
//       // wPath.push(strM)
//     }
//   }
//   var dayCnt = _.countBy(dPath); 
//   valDay = Object.values(dayCnt) 
//   var monthCnt = _.countBy(mPath); 
//   valMonth = Object.values(monthCnt)
//   var weekCnt = _.countBy(wPath); 
//   valWeek = Object.values(weekCnt) 
//   lenDay = dPath.length
//   console.log(valDay)
//   // console.log(Math.max(...valDay));
// });
// // ##############################
// // // // Chart variables
// // #############################

// // chartExample1 and chartExample2 options
// let optionsBar = {
//   maintainAspectRatio: false,
//   legend: {
//     display: false,
//   },
//   tooltips: {
//     backgroundColor: "#f5f5f5",
//     titleFontColor: "#333",
//     bodyFontColor: "#666",
//     bodySpacing: 4,
//     xPadding: 12,
//     mode: "nearest",
//     intersect: 0,
//     position: "nearest",
//   },
//   responsive: true,
//   scales: {
//     yAxes: [
//       {
//         gridLines: {
//           drawBorder: false,
//           color: "rgba(225,78,202,0.1)",
//           zeroLineColor: "transparent",
//         },
//         ticks: {
//           suggestedMin: 60,
//           suggestedMax: 120,
//           padding: 20,
//           fontColor: "#9e9e9e",
//         },
//       },
//     ],
//     xAxes: [
//       {
//         gridLines: {
//           drawBorder: false,
//           color: "rgba(225,78,202,0.1)",
//           zeroLineColor: "transparent",
//         },
//         ticks: {
//           padding: 20,
//           fontColor: "#9e9e9e",
//         },
//       },
//     ],
//   },
// }

// let chart1_2_options = {
//   maintainAspectRatio: false,
//   legend: {
//     display: false,
//   },
//   tooltips: {
//     backgroundColor: "#f5f5f5",
//     titleFontColor: "#333",
//     bodyFontColor: "#666",
//     bodySpacing: 4,
//     xPadding: 12,
//     mode: "nearest",
//     intersect: 0,
//     position: "nearest",
//   },
//   responsive: true,
//   scales: {
//     yAxes: [
//       {
//         barPercentage: 1.6,
//         gridLines: {
//           drawBorder: false,
//           color: "rgba(225,78,202,0.1)",
//           zeroLineColor: "transparent",
//         },
//         ticks: {
//           suggestedMin: 0,
//           suggestedMax: Math.max(...valDay),
//           padding: 20,
//           fontColor: "#9a9a9a",
//         },
//       },
//     ],
//     xAxes: [
//       {
//         barPercentage: 1.6,
//         gridLines: {
//           drawBorder: false,
//           // color: "rgba(29,140,248,0.1)",
//           color: "rgba(225,78,202,0.1)",
//           zeroLineColor: "transparent",
//         },
//         ticks: {
//           padding: 20,
//           fontColor: "#9a9a9a",
//         },
//       },
//     ],
//   },
// };

// // #########################################
// // // // used inside src/views/Dashboard.js
// // #########################################
// let chartExample1 = {
//   data1: (canvas) => {
//     let ctx = canvas.getContext("2d");

//     let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

//     gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
//     gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
//     gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
 
//     return {
//       labels: Array.from(new Set(dPath)),
//       datasets: [
//         {
//           label: "My First dataset",
//           fill: true,
//           backgroundColor: gradientStroke,
//           borderColor: "#1f8ef1",
//           borderWidth: 2,
//           borderDash: [],
//           borderDashOffset: 0.0,
//           pointBackgroundColor: "#1f8ef1",
//           pointBorderColor: "rgba(255,255,255,0)",
//           pointHoverBackgroundColor: "#1f8ef1",
//           pointBorderWidth: 20,
//           pointHoverRadius: 4,
//           pointHoverBorderWidth: 15,
//           pointRadius: 4,
//           data: valDay,
//         },
//       ],
//     };
//   },
//   data2: (canvas) => {
//     let ctx = canvas.getContext("2d");

//     let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

//     gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
//     gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
//     gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

//     return {
//       labels: Array.from(new Set(wPath)),
//       datasets: [
//         {
//           label: "My First dataset",
//           fill: true,
//           backgroundColor: gradientStroke,
//           borderColor: "#1f8ef1",
//           borderWidth: 2,
//           borderDash: [],
//           borderDashOffset: 0.0,
//           pointBackgroundColor: "#1f8ef1",
//           pointBorderColor: "rgba(255,255,255,0)",
//           pointHoverBackgroundColor: "#1f8ef1",
//           pointBorderWidth: 20,
//           pointHoverRadius: 4,
//           pointHoverBorderWidth: 15,
//           pointRadius: 4,
//           data: valWeek,
//         },
//       ],
//     };
//   },
//   data3: (canvas) => {
//     let ctx = canvas.getContext("2d");

//     let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

//     gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
//     gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
//     gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
    
//     return {
//       labels: Array.from(new Set(mPath)),
//       datasets: [
//         {
//           label: "My First dataset",
//           fill: true,
//           backgroundColor: gradientStroke,
//           borderColor: "#1f8ef1",
//           borderWidth: 2,
//           borderDash: [],
//           borderDashOffset: 0.0,
//           pointBackgroundColor: "#1f8ef1",
//           pointBorderColor: "rgba(255,255,255,0)",
//           pointHoverBackgroundColor: "#1f8ef1",
//           pointBorderWidth: 20,
//           pointHoverRadius: 4,
//           pointHoverBorderWidth: 15,
//           pointRadius: 4,
//           data: valMonth,
//         },
//       ],
//     };
//   },
//   options: chart1_2_options,
// };

// // #########################################
// // // // used inside src/views/Dashboard.js
// // #########################################
// let chartExample2 = {
//   data: (canvas) => {
//     let ctx = canvas.getContext("2d");

//     let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

//     gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
//     gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
//     gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

//     return {
//       labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
//       datasets: [
//         {
//           label: "Data",
//           fill: true,
//           backgroundColor: (0, "rgba(119,52,169,0)"),
//           borderColor: "#1f8ef1",
//           borderWidth: 2,
//           borderDash: [],
//           borderDashOffset: 0.0,
//           pointBackgroundColor: "#1f8ef1",
//           pointBorderColor: "rgba(255,255,255,0)",
//           pointHoverBackgroundColor: "#1f8ef1",
//           pointBorderWidth: 20,
//           pointHoverRadius: 4,
//           pointHoverBorderWidth: 15,
//           pointRadius: 4,
//           data: [1, 1, 1, 1, 2, 2],
//         },
//       ],
//     };
//   },
//   options: chart1_2_options,
// };

// // #########################################
// // // // used inside src/views/Dashboard.js
// // #########################################
// let chartExample3 = {
//   data: (canvas) => {
//     let ctx = canvas.getContext("2d");

//     let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

//     // gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
//     // gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
//     // gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

//     return {
//       labels: ["USA", "GER", "AUS", "UK", "RO", "BR"],
//       datasets: [
//         {
//           label: "Countries",
//           fill: true,
//           backgroundColor: (0, "rgba(119,52,169,0)"),
//           hoverBackgroundColor: (0, "rgba(119,52,169,0)"),
//           borderColor: "#d048b6",
//           borderWidth: 2,
//           borderDash: [],
//           borderDashOffset: 0.0,
//           data: [1, 2, 1, 2, 2, 2],
//         },
//       ],
//     };
//   },
//   options: {
//     maintainAspectRatio: false,
//     legend: {
//       display: false,
//     },
//     tooltips: {
//       backgroundColor: "#f5f5f5",
//       titleFontColor: "#333",
//       bodyFontColor: "#666",
//       bodySpacing: 4,
//       xPadding: 12,
//       mode: "nearest",
//       intersect: 0,
//       position: "nearest",
//     },
//     responsive: true,
//     scales: {
//       yAxes: [
//         {
//           gridLines: {
//             drawBorder: false,
//             color: "rgba(225,78,202,0.1)",
//             zeroLineColor: "transparent",
//           },
//           ticks: {
//             suggestedMin: 60,
//             suggestedMax: 120,
//             padding: 20,
//             fontColor: "#9e9e9e",
//           },
//         },
//       ],
//       xAxes: [
//         {
//           gridLines: {
//             drawBorder: false,
//             color: "rgba(225,78,202,0.1)",
//             zeroLineColor: "transparent",
//           },
//           ticks: {
//             padding: 20,
//             fontColor: "#9e9e9e",
//           },
//         },
//       ],
//     },
//   },
// };

// // #########################################
// // // // used inside src/views/Dashboard.js
// // #########################################
// const chartExample4 = {
//   data: (canvas) => {
//     let ctx = canvas.getContext("2d");

//     let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

//     gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
//     gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
//     gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

//     return {
//       labels: ["JUL", "AUG", "SEP", "OCT", "NOV"],
//       datasets: [
//         {
//           label: "My First dataset",
//           fill: true,
//           backgroundColor: gradientStroke,
//           borderColor: "#00d6b4",
//           borderWidth: 2,
//           borderDash: [],
//           borderDashOffset: 0.0,
//           pointBackgroundColor: "#00d6b4",
//           pointBorderColor: "rgba(255,255,255,0)",
//           pointHoverBackgroundColor: "#00d6b4",
//           pointBorderWidth: 20,
//           pointHoverRadius: 4,
//           pointHoverBorderWidth: 15,
//           pointRadius: 4,
//           data: [2, 2, 1, 2, 1],
//         },
//       ],
//     };
//   },
//   options: {
//     maintainAspectRatio: false,
//     legend: {
//       display: false,
//     },

//     tooltips: {
//       backgroundColor: "#f5f5f5",
//       titleFontColor: "#333",
//       bodyFontColor: "#666",
//       bodySpacing: 4,
//       xPadding: 12,
//       mode: "nearest",
//       intersect: 0,
//       position: "nearest",
//     },
//     responsive: true,
//     scales: {
//       yAxes: [
//         {
//           barPercentage: 1.6,
//           gridLines: {
//             drawBorder: false,
//             color: "rgba(29,140,248,0.0)",
//             zeroLineColor: "transparent",
//           },
//           ticks: {
//             suggestedMin: 50,
//             suggestedMax: 125,
//             padding: 20,
//             fontColor: "#9e9e9e",
//           },
//         },
//       ],

//       xAxes: [
//         {
//           barPercentage: 1.6,
//           gridLines: {
//             drawBorder: false,
//             color: "rgba(0,242,195,0.1)",
//             zeroLineColor: "transparent",
//           },
//           ticks: {
//             padding: 20,
//             fontColor: "#9e9e9e",
//           },
//         },
//       ],
//     },
//   },
// };

// module.exports = {
//   chartExample1, // in src/views/Dashboard.js
//   chartExample2, // in src/views/Dashboard.js
//   chartExample3, // in src/views/Dashboard.js
//   chartExample4, // in src/views/Dashboard.js
//   optionsBar,
// };
