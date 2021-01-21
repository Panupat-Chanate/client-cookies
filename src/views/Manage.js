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
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { DatePicker, Space } from 'antd';

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
      txtcookieId: '',
      txtBrowser: '',
      txtIp: '',
      txtType: '',
      txtdate: ''
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
        var datetime = new Date(response.data[i].createdAt).toLocaleString();
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
        var chkVal = response.data[i].data[2].latitude
        test.push({cookieId,datetime,access,_id,ip,type,path,browser,typeId,latlng,chkVal})
      }
      console.log(test)
      this.setState({
        // cookie: response.data,
        // access: access,
        dataTable: {
          columns: [
            {
              label: 'date (MM/DD/YYYY)',
              field: 'dt',
              width: 150,
              attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'cookie-id',
                'text-align': 'center'
                
              },
            },
            {
              label: 'cookies-id',
              field: 'id',
              width: 270,
            },
            {
              label: 'ip',
              field: 'ip',
              width: 200,
            },
            {
              label: 'type',
              field: 'type',
              width: 200,
            },
            {
              label: 'browser',
              field: 'browser',
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
              dt: item.datetime,
              id: item.cookieId,
              ip: item.ip,
              type: item.type,
              browser: item.browser,
            //   status: <div className="text-center">{item.access==='1'
            //   ?<i className="fas fa-check-circle check" id={'{"_id":"'+item._id+'", "access":"'+item.access+'"}'} onClick={this.changeStatus}></i>
            //   :<i className="fas fa-times-circle noncheck" id={'{"_id":"'+item._id+'", "access":"'+item.access+'"}'} onClick={this.changeStatus}></i>}
            // </div>,
              detail: <div className="text-center">
                <i className={item.access==='1'?"far fa-eye text-primary check":"far fa-eye check"} onClick={this.modalClick}
                  id={'{"cookieId":"'+item.cookieId+'", "datetime":"'+item.datetime+'", "access":"'+item.access+'", "_id":"'+item._id+'", "ip":"'+item.ip+'", "type":"'+item.type+'", "path":"'+item.path+'", "browser":"'+item.browser+'", "typeId":"'+item.typeId+'", "latlng":"'+item.latlng+'", "chkVal":"'+item.chkVal+'"}'}
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
    if (Item.access === '1') { Item.access = '0'}
    else {Item.access = '1'}
    var value = {
        _id: Item._id,
        access: Item.access,
    }
    console.log(value)
    axios.post("http://127.0.0.1:5000/cookies/api/update", value)
    .then((response) => {
        console.log(response)
        this.increment();
        this.setState({
          access: Item.access
        })
    }).catch((error) => {
    console.log(error)
    });
  }
  modalClick = (e) => {
    const Item = JSON.parse(e.target.id)
    console.log(Item._id)
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
        var datetime = new Date(response.data[i].createdAt).toLocaleString();
        var chkVal = response.data[i].data[1].latitude
        rowVal.push({datetime,ip,path,latlng,chkVal})
      }
      console.log(rowVal)
      this.setState({
        modalTable: {
          columns: [
            {
              label: 'date (MM/DD/YYYY)',
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
              dt: rowVal.datetime,
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
        datetime: Item.datetime,
        ip: Item.ip,
        path: Item.path,
        type: Item.type,
        _id: Item._id,
        typeId: Item.typeId,
        latlng: Item.latlng,
        chkVal: Item.chkVal,
        show: true,
      })
    })
  };
  handleChanage = (e) => {
    console.log(e.target.value)
    this.setState({[e.target.id] : e.target.value})
  }
  handleSearch= (e) => {
    e.preventDefault();
    var value = {
      cookieid: this.state.txtcookieId,
      date: this.state.txtdate,
      ip: this.state.txtIp,
      type: this.state.txtType,
      browser: this.state.txtBrowser,
    }
    axios.post("http://127.0.0.1:5000/cookies/api/data/search", value)
    .then((response) => {
      console.log(response)
      var test = [];
      for (var i=0; i<response.data.length; i++) {
        var cookieId = response.data[i].cookieId
        var datetime = new Date(response.data[i].createdAt).toLocaleString();
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
        var chkVal = response.data[i].data[2].latitude
        test.push({cookieId,datetime,access,_id,ip,type,path,browser,typeId,latlng,chkVal})
      }
      console.log(test)
      this.setState({
        dataTable: {
          columns: [
            {
              label: 'date (MM/DD/YYYY)',
              field: 'dt',
              width: 150,
              attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'cookie-id',
                'text-align': 'center'
                
              },
            },
            {
              label: 'cookies-id',
              field: 'id',
              width: 270,
            },
            {
              label: 'ip',
              field: 'ip',
              width: 200,
            },
            {
              label: 'type',
              field: 'type',
              width: 200,
            },
            {
              label: 'browser',
              field: 'browser',
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
              dt: item.datetime,
              id: item.cookieId,
              ip: item.ip,
              type: item.type,
              browser: item.browser,
            //   status: <div className="text-center">{item.access==='1'
            //   ?<i className="fas fa-check-circle check" id={'{"_id":"'+item._id+'", "access":"'+item.access+'"}'} onClick={this.changeStatus}></i>
            //   :<i className="fas fa-times-circle noncheck" id={'{"_id":"'+item._id+'", "access":"'+item.access+'"}'} onClick={this.changeStatus}></i>}
            // </div>,
              detail: <div className="text-center">
                <i className={item.access==='1'?"far fa-eye text-primary check":"far fa-eye check"} onClick={this.modalClick}
                  id={'{"cookieId":"'+item.cookieId+'", "datetime":"'+item.datetime+'", "access":"'+item.access+'", "_id":"'+item._id+'", "ip":"'+item.ip+'", "type":"'+item.type+'", "path":"'+item.path+'", "browser":"'+item.browser+'", "typeId":"'+item.typeId+'", "latlng":"'+item.latlng+'", "chkVal":"'+item.chkVal+'"}'}
                ></i>
              </div>
            }
          ))]
        },
      })
    })
  }
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
                          <label>Date</label>
                          <Input className="txt1rem"
                            id="txtdate"
                            defaultValue={this.state.txtdate}
                            onChange={this.handleChanage}
                            type="date"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-3" md="4">
                        <FormGroup>
                          <label>Cookie-ID</label>
                          <Input className="txt1rem"
                            id="txtcookieId"
                            defaultValue={this.state.txtcookieId}
                            onChange={this.handleChanage}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-3" md="4">
                        <FormGroup>
                          <label>IP</label>
                          <Input className="txt1rem"
                            id="txtIp"
                            defaultValue={this.state.txtIp}
                            onChange={this.handleChanage}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-3" md="4">
                        <FormGroup>
                          <label>Type</label>
                          <Input className="txt1rem"
                            id="txtType"
                            defaultValue={this.state.txtType}
                            onChange={this.handleChanage}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-3" md="4">
                        <FormGroup>
                          <label>Browser</label>
                          <Input className="txt1rem"
                            id="txtBrowser"
                            defaultValue={this.state.txtBrowser}
                            onChange={this.handleChanage}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-3" md="2">
                        <FormGroup className="txt1rem">
                          <label></label>
                          <Input className="" type="submit" value="Search" onClick={this.handleSearch}></Input>
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
                            <label>Date (MM/DD/YYYY)</label>
                            <Input className="txt1rem"
                              defaultValue={this.state.datetime}
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
                          <FormGroup>
                            <label className="txt1rem">TypeID</label>
                            <Input className="txt1rem" defaultValue={this.state.typeId} type="text" disabled/>
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-3" md="1">
                          <FormGroup>
                            <label className="txt1rem">Address</label>
                            <div className="my-address">
                              <a href={"https://www.google.com/maps/place/"+this.state.latlng} target="_blank" 
                              className={this.state.chkVal?"":"disabled"} onClick={()=>console.log(this.state.chkVal)}>
                                <i className="fas fa-map-marked-alt"></i>
                              </a>
                            </div>
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-3" md="1">
                          <FormGroup>
                            <label className="txt1rem">Status</label>
                            {/* <div >{this.state.access==='1'
                              ?<i className="fas fa-check-circle check" id={'{"_id":"'+''+'", "access":"'+''+'"}'} onClick={this.changeStatus}></i>
                              :<i className="fas fa-times-circle noncheck" id={'{"_id":"'+''+'", "access":"'+''+'"}'} onClick={this.changeStatus}></i>}
                            </div> */}
                            <Switch
                              checked={this.state.access==='1'?true:false}
                              onChange={this.changeStatus}
                              color="primary"
                              name="checkedB"
                              id={'{"_id":"'+this.state._id+'", "access":"'+this.state.access+'"}'}
                              inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
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