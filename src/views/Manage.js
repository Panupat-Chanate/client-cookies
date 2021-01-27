import React,{Component} from "react";
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import {Card, CardBody,FormGroup,Input,Row,Col,Form} from "reactstrap";
import { Modal } from 'react-bootstrap';
import Switch from '@material-ui/core/Switch';

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
    this.timer = setInterval(
      () => this.increment(),
      10000
    )
  }
  increment() {
    const _ = require("lodash");
    axios.get("http://127.0.0.1:5000/cookies/api/data")
    .then((response) => {
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
  
  changeStatus=(e)=>{
    const Item = JSON.parse(e.target.id)
    if (Item.access === '1') { Item.access = '0'}
    else {Item.access = '1'}
    var value = {
        _id: Item._id,
        access: Item.access,
    }
    axios.post("http://127.0.0.1:5000/cookies/api/update", value)
    .then((response) => {
        this.increment();
        this.setState({
          access: Item.access
        })
    }).catch((error) => {});
  }
  modalClick = (e) => {
    const Item = JSON.parse(e.target.id)
    if (Item.path==='') { Item.path = "index" }
    axios.get("http://127.0.0.1:5000/cookies/api/agree/"+Item.cookieId+"")
    .then((response) => {
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
                        <Col className="pl-md-3" md="1">
                          <FormGroup>
                            <label className="txt1rem">TypeID</label>
                            {/* <Input className="txt1rem" defaultValue={this.state.typeId} type="text" disabled/> */}
                            <Input className="" type="button" value={this.state.typeId} onClick={()=>this.setState({inshow: true})}></Input>
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-3" md="1" >
                          <FormGroup>
                            <label className="txt1rem">Address</label>
                            <div className="my-address">
                              <a href={"https://www.google.com/maps/place/"+this.state.latlng} target="_blank" 
                              className={this.state.chkVal?"":"disabled"}>
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

        <Modal role="document" class="modal-dialog modal-sm"
            dialogClassName="modal-sm"
            aria-labelledby="example-custom-modal-styling-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title-sm">
              Type-ID
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col>
              <Card>
                <CardBody>
                  <Form>
                    <Row>
                      
                    </Row>
                    
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Modal.Body>
        </Modal>

        <Modal
          className="testmodal"
          show={this.state.inshow}
          onHide={() => this.setState({inshow: false})}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title-sm">
              Type-ID
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col>
              <Card>
                <CardBody>
                  <Form>
                  <p>THIS WEBSITE USES COOKIES</p>
                  <p>OSD CO.,LTD collects cookies to enble the proper functioning and security of our website, and help us offer you the best possible</p>
                  <p>user experience.By clicking on Agree, you consent to the use of please read the OSD CO.,LTD <a href="#">Cookie management policy.</a></p>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardBody>
                  <Form>
                    <p>SELECT YOUR CHOICE OF COOKIES ON OUR WEBSITE</p>
                    <p>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="all" value="option1" defaultChecked onClick={(e)=> this.setState({checked: e.target.value})}/>
                        <label class="form-check-label" for="all">
                          ALL COOKIES
                        </label>
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="analytical" value="option2" onClick={(e)=> this.setState({checked: e.target.value})}/>
                        <label class="form-check-label" for="analytical">
                          ANALYTICAL COOKIES
                        </label>
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="function" value="option3" onClick={(e)=> this.setState({checked: e.target.value})}/>
                        <label class="form-check-label" for="function">
                          FUNCTIONAL COOKIES
                        </label>
                      </div>
                    </p>
                    <p><i className="fas fa-check"></i> Functional Cookies</p>
                      <p>&nbsp;&nbsp;&nbsp;● Are necessary for the proper functioning of the websites</p>
                      <p>&nbsp;&nbsp;&nbsp;● Enable you to book a flight and access your account securely</p>
                      <p>&nbsp;&nbsp;&nbsp;● do not collect any personal information</p>
                      <div className="yel" hidden={this.state.checked==='option3'?false:true}>&nbsp;&nbsp;&nbsp; Please note: Disabling these cookies may impact your browsing experience onour website.</div>
                    <p><i className="fas fa-check"></i> Analytical Cookies</p>
                      <p>&nbsp;&nbsp;&nbsp;● Help us detect any bugs and improve our websites</p>
                      <p>&nbsp;&nbsp;&nbsp;● Collect anonymous information about your visits to our websites</p>
                      <p>&nbsp;&nbsp;&nbsp;● Are never used for marketing purposes</p>
                      <div className="yel" hidden={this.state.checked==='option2'?false:true}>&nbsp;&nbsp;&nbsp; Please note: Disabling these cookies may impact your browsing experience onour website.</div>
                    <p><i className="fas fa-check"></i> Marketing Cookies and Other Cookies</p>
                      <p>&nbsp;&nbsp;&nbsp;● Store your preferences based on previous visits to our websites</p>
                      <p>&nbsp;&nbsp;&nbsp;● Help us identify relevant e-mails, social media and banner ads for you</p>
                      <p>&nbsp;&nbsp;&nbsp;● Allow our partners display offers and advertisements that suit your interests</p>
                  </Form>
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