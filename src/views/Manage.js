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
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  Dropdown, Badge,
  Form
} from "reactstrap";
import { Modal } from 'react-bootstrap';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.increment();
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
                // suggestedMax: 50,
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
      cookie: [],
      modal: false,
    };
  }
  componentDidMount(){
    // this.timer = setInterval(
    //   () => this.increment(),
    //   10000
    // )
  }
  increment() {
    const _ = require("lodash");
    axios.get("http://127.0.0.1:5000/cookies/api/data")
    .then((response) => {
      console.log(response.data)
      var test = [];
      for (var i=0; i<response.data.length; i++) {
        var cookieId = response.data[i].cookieId
        var date = response.data[i].createdAt.slice(0,10)
        var time =  response.data[i].createdAt.slice(11,16)
        var access =  response.data[i].access
        var _id =  response.data[i]._id
        var ip = response.data[i].data[0].ipAdress
        var type = response.data[i].data[1].diviceType
        var path = response.data[i].data[6].pathname.split("/")[1]
        var browser = response.data[i].data[9].browser
        var typeId = response.data[i].typeId
        
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

        test.push({cookieId,date,time,access,_id,ip,type,path,browser,typeId,latlng})
      }
      console.log(test)
      this.setState({
        // cookie: response.data,
        // access: access,
        dataTable: {
          columns: [
            {
              label: 'cookies-id',
              field: 'id',
              width: 150,
              attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'cookie-id',
                'text-align': 'center'
                
              },
            },
            {
              label: 'date',
              field: 'date',
              width: 270,
            },
            {
              label: 'time',
              field: 'time',
              width: 200,
            },
            {
              label: <div className="text-center">details</div>,
              field: 'detail',
              width: 500,
            },
          ],
          rows: [...test.map((item, index) => (
            {
              id: item.cookieId,
              date: item.date,
              time: item.time,
            //   status: <div className="text-center">{item.access==='1'
            //   ?<i className="fas fa-check-circle check" id={'{"_id":"'+item._id+'", "access":"'+item.access+'"}'} onClick={this.changeStatus}></i>
            //   :<i className="fas fa-times-circle noncheck" id={'{"_id":"'+item._id+'", "access":"'+item.access+'"}'} onClick={this.changeStatus}></i>}
            // </div>,
              detail: <div className="text-center">
                <i class="far fa-eye text-primary check" onClick={this.modalClick}
                  id={'{"cookieId":"'+item.cookieId+'", "date":"'+item.date+'", "time":"'+item.time+'", "access":"'+item.access+'", "_id":"'+item._id+'", "ip":"'+item.ip+'", "type":"'+item.type+'", "path":"'+item.path+'", "browser":"'+item.browser+'", "typeId":"'+item.typeId+'", "latlng":"'+item.latlng+'"}'}
                ></i>
              </div>
            }
          ))]
        },
      })
    })
  }
  
  changeStatus=(e)=>{
    const Item = JSON.parse(e.target.id)
    if (Item.access === '1') { var access = '0'}
    else {var access = '1'}
    var value = {
        _id: Item._id,
        access: access,
    }
    console.log(value)
    axios.post("http://127.0.0.1:5000/cookies/api/update", value)
    .then((response) => {
        console.log(response)
        this.increment();
    }).catch((error) => {
    console.log(error)
    });
  }
  modalClick = (e) => {
    const Item = JSON.parse(e.target.id)
    console.log(Item)
    if (Item.path==='') { Item.path = "index" }
    axios.get("http://127.0.0.1:5000/cookies/api/agree/"+Item.cookieId+"")
    .then((response) => {
      console.log(response.data)
      var rowVal = [];
      for (var i=0; i<response.data.length; i++) {
        var absolute1 = Math.abs(response.data[i].data[1].latitude);
        var degrees1 = Math.floor(absolute1);
        var minutesNotTruncated1 = (absolute1 - degrees1) * 60;
        var minutes1 = Math.floor(minutesNotTruncated1);
        var seconds1 = ((minutesNotTruncated1 - minutes1) * 60).toFixed(2);
        var absolute2 = Math.abs(response.data[i].data[2].longitude);
        var degrees2 = Math.floor(absolute2);
        var minutesNotTruncated2 = (absolute2 - degrees2) * 60;
        var minutes2 = Math.floor(minutesNotTruncated2);
        var seconds2 = ((minutesNotTruncated2 - minutes2) * 60).toFixed(2);

        var ip = response.data[i].data[0].ipAdress
        var path = response.data[i].data[5].pathname.split("/")[1]

        var latitudeCardinal = degrees1 >= 0 ? "N" : "S";
        var longitudeCardinal = degrees2 >= 0 ? "E" : "W";
        var latlng = degrees1+"°"+minutes1+"'"+seconds1+"''"+latitudeCardinal+"+"+degrees2+"°"+minutes2+"'"+seconds2+"''"+longitudeCardinal;
        var date = response.data[i].createdAt.slice(0,10)
        var time =  response.data[i].createdAt.slice(11,16)
        var chkVal = response.data[i].data[1].latitude
        rowVal.push({date,time,ip,path,latlng,chkVal})
      }
      console.log(rowVal)
      this.setState({
        modalTable: {
          columns: [
            {
              label: 'date/time',
              field: 'dt',
            },
            {
              label: 'ip',
              field: 'ip',
              width: 270,
            },
            {
              label: 'path',
              field: 'path',
              width: 200,
            },
            {
              label: <div className="text-center">address</div>,
              field: 'address',
              width: 500,
            },
          ],
          rows: [...rowVal.map((rowVal, index) => (
            {
              dt: rowVal.date+' / '+rowVal.time,
              ip: rowVal.ip,
              path: <div>{rowVal.path?rowVal.path:'index'}</div>,
              address: <div className="text-center">{rowVal.chkVal
                ?<a href={"https://www.google.com/maps/place/"+rowVal.latlng} target="_blank">
                  <i className="tim-icons icon-square-pin text-primary"/>
                </a>
                :'disallow'}
              
            </div>,
            }
          ))]
        },
        access: Item.access,
        browser: Item.browser,
        cookieId: Item.cookieId,
        date: Item.date,
        ip: Item.ip,
        path: Item.path,
        time: Item.time,
        type: Item.type,
        _id: Item._id,
        typeId: Item.typeId,
        latlng: Item.latlng,
        show: true,
      })
    })
  };
  
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="px-md-3" md="4">
                        <FormGroup>
                          <label>Date/Time</label>
                          <Input className="txt1rem"
                            defaultValue={this.state.date+' / '+this.state.time}
                            type="text" disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-3" md="4">
                        <FormGroup>
                          <label>Cookie-ID</label>
                          <Input className="txt1rem"
                            defaultValue={this.state.cookieId}
                            type="text" disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-3" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            IP
                          </label>
                          <Input className="txt1rem" type="text" disabled defaultValue={this.state.ip}/>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-3" md="4">
                        <FormGroup>
                          <label>Type</label>
                          <Input className="txt1rem" defaultValue={this.state.type} type="text" disabled />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-3" md="4">
                        <FormGroup>
                          <label>Path</label>
                          <Input className="txt1rem" defaultValue={this.state.path} type="text" disabled />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-3" md="4">
                        <FormGroup>
                          <label>Browser</label>
                          <Input className="txt1rem" defaultValue={this.state.browser} type="text" disabled />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-3" md="4">
                        <FormGroup className="txt1rem">
                          <label className="txt1rem">TypeID</label>
                          <Input className="txt1rem" defaultValue={this.state.typeId} type="text" disabled/>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-3" md="4">
                      <FormGroup className="txt1rem">
                      <label className="txt1rem">Address</label>
                      <div className="my-address">{this.state.latlng
                          ?<a href={"https://www.google.com/maps/place/"+this.state.latlng} target="_blank">
                            <i class="fas fa-map-marked-alt"></i>
                          </a>
                          :''}
                        </div>
                        </FormGroup>
                        
                      </Col>
                    </Row>
                    
                  </Form>
                </CardBody>
              </Card>
            </Col>
              
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
        <Modal role="document" class="modal-dialog modal-90w" 
            show={this.state.show}
            onHide={() => this.setState({show: false})}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Col>
                <Card>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="px-md-3" md="4">
                          <FormGroup>
                            <label>Date/Time</label>
                            <Input className="txt1rem"
                              defaultValue={this.state.date+' / '+this.state.time}
                              type="text" disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-md-3" md="4">
                          <FormGroup>
                            <label>Cookie-ID</label>
                            <Input className="txt1rem"
                              defaultValue={this.state.cookieId}
                              type="text" disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-3" md="4">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                              IP
                            </label>
                            <Input className="txt1rem" type="text" disabled defaultValue={this.state.ip}/>
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-3" md="4">
                          <FormGroup>
                            <label>Type</label>
                            <Input className="txt1rem" defaultValue={this.state.type} type="text" disabled />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-3" md="4">
                          <FormGroup>
                            <label>Path</label>
                            <Input className="txt1rem" defaultValue={this.state.path} type="text" disabled />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-3" md="4">
                          <FormGroup>
                            <label>Browser</label>
                            <Input className="txt1rem" defaultValue={this.state.browser} type="text" disabled />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-3" md="4">
                          <FormGroup className="txt1rem">
                            <label className="txt1rem">TypeID</label>
                            <Input className="txt1rem" defaultValue={this.state.typeId} type="text" disabled/>
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-3" md="1">
                        <FormGroup className="txt1rem">
                        <label className="txt1rem">Address</label>
                          <div className="my-address">{this.state.latlng
                            ?<a href={"https://www.google.com/maps/place/"+this.state.latlng} target="_blank">
                              <i class="fas fa-map-marked-alt"></i>
                            </a>
                            :''}
                          </div>
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-3" md="1">
                          <FormGroup className="txt1rem">
                            <label className="txt1rem">Status</label>
                            <div className="text-center">{this.state.access==='1'
                              ?<i className="fas fa-check-circle check" id={'{"_id":"'+''+'", "access":"'+''+'"}'} onClick={this.changeStatus}></i>
                              :<i className="fas fa-times-circle noncheck" id={'{"_id":"'+''+'", "access":"'+''+'"}'} onClick={this.changeStatus}></i>}
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card>
                  <CardBody>
                  <MDBDataTable
                    striped
                    small
                    data={this.state.modalTable}
                  />
                  </CardBody>
                </Card>
              </Col>
            </Modal.Body>
          </Modal>
      </>
    );
  }
}

export default Dashboard;