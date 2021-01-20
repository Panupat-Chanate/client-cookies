import React,{Component} from "react";
import classNames from "classnames";
import { Line, Bar } from "react-chartjs-2";
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import { MDBDataTable } from 'mdbreact';
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.getAgree();
    this.getData();
    this.state = {
      name: 'data1',
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(78,152,255,0.2)",
                zeroLineColor: "transparent",
              },
              ticks: {
                suggestedMin: 0,
                // suggestedMax: 20,
                padding: 20,
                fontColor: "#9e9e9e",
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(78,152,255,0.2)",
                zeroLineColor: "transparent",
              },
              ticks: {
                padding: 20,
                fontColor: "#9e9e9e",
              },
            },
          ],
        },
      },
      dataCharts: {
        labels: '',
        datasets: ''
      },
      dataChart1: {
        labels: '',
        datasets: ''
      },
      dataTable: {}
    };
  }
  componentDidMount(){
    // this.timer = setInterval(() => 
    // this.getAgree(),10000
    // )
  }

  getAgree() {
    const _ = require("lodash");
    var dPath = [];
    var mPath = [];
    var wPath = [];
    var dPeople = [];
    var wPeople = [];
    var mPeople = [];
    var m1 = [];
    var m2 = [];
    var m3 = [];
    var m4 = [];
    var m5 = [];
    var m6 = [];
    var m7 = [];
    var m8 = [];
    var m9 = [];
    var m10 = [];
    var m11 = [];
    var m12 = [];
    axios.get("http://127.0.0.1:5000/cookies/api/agree")
    .then((response) => {
      console.log(response.data)
      var dateNow = new Date();
      var sliDateNow = dateNow.toISOString().slice(0, 10)

      var first = dateNow.getDate() - dateNow.getDay();
      var last = first + 6;
      var firstday = new Date(dateNow.setDate(first)).toISOString();
      var lastday = new Date(dateNow.setDate(last)).toISOString();
      var fDay = firstday.slice(0, 10)
      var lDay = lastday.slice(0, 10)

      for (var i=0; i<response.data.length; i++) {
        var sliDateDB = response.data[i].createdAt.slice(0, 10)
        var strPath = response.data[i].data[5].pathname
        var strPeople = response.data[i].cookieId
        var DateDB = new Date(response.data[i].createdAt);
        var dbMonth = DateDB.getMonth();
        var getMonth = dateNow.getMonth();
        
        if (sliDateNow===sliDateDB) {
          if (strPath!=undefined) {
            if (strPath==="/") { dPath.push("index") }
            else { dPath.push(strPath.split("/")[1]) }
            dPeople.push(strPeople)
          }
        }
        if (getMonth===dbMonth) {
          if (strPath!=undefined){
            if (strPath==='/') { mPath.push("index") }
            else { mPath.push(strPath.split("/")[1]) }
            mPeople.push(strPeople)
          }
        }
        if (sliDateDB>=fDay && sliDateDB<=lDay && strPath!=undefined) {
          if (strPath==='/') { wPath.push("index") }
          else { wPath.push(strPath.split("/")[1]) }
          wPeople.push(strPeople)
        }

        if (dbMonth===0) {
          var strM = response.data[i].data[5].pathname
          if (strM!=undefined){
            if (strM==='/') { m1.push("index") }
            else {m1.push(strM.split("/")[1])}
          }
        } else if (dbMonth===1) {
          var strM = response.data[i].data[5].pathname
          if (strM!=undefined){
            if (strM==='/') { m2.push("index") }
            else {m2.push(strM.split("/")[1])}
          }
        } else if (dbMonth===2) {
          var strM = response.data[i].data[5].pathname
          if (strM!=undefined){
            if (strM==='/') { m3.push("index") }
            else {m3.push(strM.split("/")[1])}
          }
        } else if (dbMonth===3) {
          var strM = response.data[i].data[5].pathname
          if (strM!=undefined){
            if (strM==='/') { m4.push("index") }
            else {m4.push(strM.split("/")[1])}
          }
        } else if (dbMonth===4) {
          var strM = response.data[i].data[5].pathname
          if (strM!=undefined){
            if (strM==='/') { m5.push("index") }
            else {m5.push(strM.split("/")[1])}
          }
        } else if (dbMonth===5) {
          var strM = response.data[i].data[5].pathname
          if (strM!=undefined){
            if (strM==='/') { m6.push("index") }
            else {m6.push(strM.split("/")[1])}
          }
        } else if (dbMonth===6) {
          var strM = response.data[i].data[5].pathname
          if (strM!=undefined){
            if (strM==='/') { m7.push("index") }
            else {m7.push(strM.split("/")[1])}
          }
        } else if (dbMonth===7) {
          var strM = response.data[i].data[5].pathname
          if (strM!=undefined){
            if (strM==='/') { m8.push("index") }
            else {m8.push(strM.split("/")[1])}
          }
        } else if (dbMonth===8) {
          var strM = response.data[i].data[5].pathname
          if (strM!=undefined){
            if (strM==='/') { m9.push("index") }
            else {m9.push(strM.split("/")[1])}
          }
        } else if (dbMonth===9) {
          var strM = response.data[i].data[5].pathname
          if (strM!=undefined){
            if (strM==='/') { m10.push("index") }
            else {m10.push(strM.split("/")[1])}
          }
        } else if (dbMonth===10) {
          var strM = response.data[i].data[5].pathname
          if (strM!=undefined){
            if (strM==='/') { m11.push("index") }
            else {m11.push(strM.split("/")[1])}
          }
        } else if (dbMonth===11) {
          var strM = response.data[i].data[5].pathname
          if (strM!=undefined){
            if (strM==='/') { m12.push("index") }
            else {m12.push(strM.split("/")[1])}
          }
        }
      }
      var dayCnt = _.countBy(dPath); 
      var valDay = Object.values(dayCnt) 
      var monthCnt = _.countBy(mPath); 
      var valMonth = Object.values(monthCnt)
      var weekCnt = _.countBy(wPath); 
      var valWeek = Object.values(weekCnt)
      var cntPD = _.countBy(dPeople);
      var cntPW = _.countBy(wPeople);
      var cntPM= _.countBy(mPeople);
      var cntPDD = Object.values(cntPD)
      var cntPWW = Object.values(cntPW) 
      var cntPMM = Object.values(cntPM) 
      var mLen = [m1.length,m2.length,m3.length,m4.length,m5.length,m6.length,m7.length,m8.length,m9.length,m10.length,m11.length,m12.length];
      this.setState({
        lenDay: dPath.length,
        lenWeek: wPath.length,
        lenMonth: mPath.length,
        labDay: Array.from(new Set(dPath)),
        labWeek: Array.from(new Set(wPath)),
        labMonth: Array.from(new Set(mPath)),
        valDay: valDay,
        valWeek: valWeek,
        valMonth: valMonth,
        valAll: Object.values(mLen),
        cntPDD: cntPDD.length,
        cntPWW: cntPWW.length,
        cntPMM: cntPMM.length,
      })
      var Month12 = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      var Cnt12 = [];
      var Val12 = [];
      var sumVal = [];
      for (var i=0; i<getMonth+1; i++) {
        Cnt12.push(Month12[i])
        Val12.push(mLen[i])
        sumVal = sumVal + mLen[i]
      }
      this.setState({
        sumVal: sumVal,
        dataChart1: {
          labels: Cnt12,
          datasets: [
            {
              label: "Countries",
              fill: true,
              backgroundColor: (0, "rgba(119,52,169,0)"),
              hoverBackgroundColor: (0, "rgba(119,52,169,0)"),
              borderColor: "#d048b6",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: Val12,
            },
          ],
        },
      })
      if(this.state.name === "data1"){
        this.setState({
          dataCharts: {
            labels: Array.from(new Set(dPath)),
            datasets: [
              {
                label: "Count ",
                fill: true,
                backgroundColor: "rgba(255,255,255,0)",
                borderColor: "#1f8ef1",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: "#1f8ef1",
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: "#1f8ef1",
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: valDay,
              },
            ],
          }
        })
      } else if (this.state.name === "data2") {
        this.setState({
          dataCharts: {
            labels: Array.from(new Set(wPath)),
            datasets: [
              {
                label: "Count ",
                fill: true,
                backgroundColor: "rgba(255,255,255,0)",
                borderColor: "#1f8ef1",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: "#1f8ef1",
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: "#1f8ef1",
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: valWeek,
              },
            ],
          }
        })
      } else if (this.state.name === "data3") {
        this.setState({
          dataCharts: {
            labels: Array.from(new Set(mPath)),
            datasets: [
              {
                label: "Count ",
                fill: true,
                backgroundColor: "rgba(255,255,255,0)",
                borderColor: "#1f8ef1",
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: "#1f8ef1",
                pointBorderColor: "rgba(255,255,255,0)",
                pointHoverBackgroundColor: "#1f8ef1",
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: valMonth,
              },
            ],
          }
        })
      }
    });
  }
  getData() {
    axios.get("http://127.0.0.1:5000/cookies/api/data")
    .then((response) => {
      console.log(response.data)
      var rowVal = [];
      for (var i=0; i<response.data.length; i++) {
        var absolute1 = Math.abs(response.data[i].data[2].latitude);
        var degrees1 = Math.floor(absolute1);
        var minutesNotTruncated1 = (absolute1 - degrees1) * 60;
        var minutes1 = Math.floor(minutesNotTruncated1);
        var seconds1 = ((minutesNotTruncated1 - minutes1) * 60).toFixed(2);
        var absolute2 = Math.abs(response.data[i].data[3].longitude);
        var degrees2 = Math.floor(absolute2);
        var minutesNotTruncated2 = (absolute2 - degrees2) * 60;
        var minutes2 = Math.floor(minutesNotTruncated2);
        var seconds2 = ((minutesNotTruncated2 - minutes2) * 60).toFixed(2);

        var latitudeCardinal = degrees1 >= 0 ? "N" : "S";
        var longitudeCardinal = degrees2 >= 0 ? "E" : "W";
        var latlng = degrees1+"°"+minutes1+"'"+seconds1+"''"+latitudeCardinal+"+"+degrees2+"°"+minutes2+"'"+seconds2+"''"+longitudeCardinal;
        var cookieId = response.data[i].cookieId
        var date = response.data[i].createdAt.slice(0,10)
        var time =  response.data[i].createdAt.slice(11,16)
        var chkVal = response.data[i].data[2].latitude
        rowVal.push({cookieId,date,time,latlng,chkVal})
      }
      this.setState({
        dataTable: {
          columns: [
            {
              label: 'date',
              field: 'dt',
              width: 150,
              attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'cookie-id',
              },
            },
            {
              label: 'cookie-id',
              field: 'id',
              width: 270,
            },
            // {
            //   label: 'time',
            //   field: 'time',
            //   width: 200,
            // },
            {
              label: <div className="text-center">address</div>,
              field: 'address',
              width: 500,
            },
          ],
          rows: [...rowVal.map((item, index) => (
            {
              dt: item.date+' / '+item.time,
              id: item.cookieId,
              address: <div className="text-center">{item.chkVal
                ?<a href={"https://www.google.com/maps/place/"+item.latlng} target="_blank">
                  <i className="tim-icons icon-square-pin text-primary"/>
                </a>
                :'disallow'}
              </div>,
            }
          ))]
        }
      })
    })
  }
  handleClick1=()=>{
    // console.log(this.state.valDay)
    // console.log(this.state.valWeek)
    // console.log(this.state.valMonth)
    const datasetsCopy = this.state.dataCharts.datasets.slice(0);
    const dataCopy = datasetsCopy[0].data.slice(0);

    if (this.state.valDay.length != '0') {
      for (var i=0; i<this.state.valDay.length; i++) {
        dataCopy[i] = this.state.valDay[i];
      }
      datasetsCopy[0].data = dataCopy;
    } else {
      datasetsCopy[0].data = [];
    }
    this.setState(prevState => ({
      ...prevState,
      dataCharts: {
          ...prevState.dataCharts,
          labels: this.state.labDay
      }
    }))
    this.setState({
        data: Object.assign({}, this.state.dataCharts, {
            datasets: datasetsCopy
        }),name: "data1"
    });
  }
  handleClick2=()=>{
    // console.log(this.state.valDay)
    // console.log(this.state.valWeek.length)
    // console.log(this.state.valMonth)
    const datasetsCopy = this.state.dataCharts.datasets.slice(0);
    const dataCopy = datasetsCopy[0].data.slice(0);
    if (this.state.valWeek.length != '0') {
      for (var i=0; i<this.state.valWeek.length; i++) {
        dataCopy[i] = this.state.valWeek[i];
      }
      datasetsCopy[0].data = dataCopy;
    } else {
      datasetsCopy[0].data = [];
    }
    this.setState(prevState => ({
      ...prevState,
      dataCharts: {
          ...prevState.dataCharts,
          labels: this.state.labWeek
      }
    }))
    this.setState({
        data: Object.assign({}, this.state.dataCharts, {
            datasets: datasetsCopy
        }),name: "data2"
    });
  }
  handleClick3=()=>{
    // console.log('3',this.state.valDay)
    // console.log('3',this.state.valWeek)
    // console.log('3',this.state.valMonth)
    const datasetsCopy = this.state.dataCharts.datasets.slice(0);
    const dataCopy = datasetsCopy[0].data.slice(0);
    if (this.state.valMonth.length != '0') {
      for (var i=0; i<this.state.valMonth.length; i++) {
        dataCopy[i] = this.state.valMonth[i];
      }
      datasetsCopy[0].data = dataCopy;
    } else {
      datasetsCopy[0].data = [];
    }
    this.setState(prevState => ({
      ...prevState,
      dataCharts: {
          ...prevState.dataCharts,
          labels: this.state.labMonth
      }
    }))
    this.setState({
        data: Object.assign({}, this.state.dataCharts, {
            datasets: datasetsCopy
        }),name: "data3"
    });
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Day</h5>
                  <CardTitle tag="h4">
                    <i className="tim-icons icon-bell-55 text-info" /> {this.state.lenDay} time
                  </CardTitle>
                  <CardTitle tag="h4">
                    <i className="far fa-user text-info"></i> {this.state.cntPDD} people
                  </CardTitle>
                </CardHeader>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Week</h5>
                  <CardTitle tag="h4">
                    <i className="tim-icons icon-bell-55 text-info" /> {this.state.lenWeek} time
                  </CardTitle>
                  <CardTitle tag="h4">
                    <i className="far fa-user text-info"></i> {this.state.cntPWW} people
                  </CardTitle>
                </CardHeader>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Month</h5>
                  <CardTitle tag="h4">
                    <i className="tim-icons icon-bell-55 text-info" /> {this.state.lenMonth} time
                  </CardTitle>
                  <CardTitle tag="h4">
                    <i className="far fa-user text-info" /> {this.state.cntPMM} people
                  </CardTitle>
                </CardHeader>
              </Card>
            </Col>
            <Col lg="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Total</h5>
                      <CardTitle tag="h2">Performance</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.name === "data1",
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={this.handleClick1}
                        >
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Day
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.name === "data2",
                          })}
                          onClick={this.handleClick2}
                        >
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Week
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.name === "data3",
                          })}
                          onClick={this.handleClick3}
                        >
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Month
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={this.state.dataCharts}
                      options={this.state.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          
          <Row>
            <Col lg="12">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Total</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-bell-55 text-info" /> {this.state.sumVal} time
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={this.state.dataChart1}
                      options={this.state.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        
          <Row>
            <Col lg="12" md="12">
              <Card>
                <CardBody>
                <MDBDataTable
                  striped
                  small
                  data={this.state.dataTable}
                />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;