import React,{Component} from 'react';
import axios from 'axios';
import {Card, InputGroup, Button, FormControl, Table} from 'react-bootstrap';

export default class TableCookies extends Component{
  constructor(props) {
    super(props);
    this.state={
      cookieId: '',
      typeId: '',
      arrayData: [],
      currentPage: 1,
      dataPage: 5
    }
    axios ({
      url: 'http://localhost:5000/backend/api/data/',
      method: 'GET',
      data: this.state
    }) 
    .then((response) => {
    //   console.log(response.data);
      var concatData = this.state.arrayData.concat(response.data);
     this.setState({
          // countData: response.data.length,
          arrayData: concatData
     }) 
    });
  }

    Firstpage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }
    };

    Prevpage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    };

    Lastpage = () => {
        if(this.state.currentPage < Math.ceil(this.state.arrayData.length / this.state.dataPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.arrayData.length / this.state.dataPage)
            });
        }
    };
    Nextpage = () => {
        if(this.state.currentPage < Math.ceil(this.state.arrayData.length / this.state.dataPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

  render(){ 

    const {arrayData, currentPage, dataPage} = this.state;
    const lastindex = currentPage * dataPage;
    const firstindex = lastindex - dataPage;
    const currentData = arrayData.slice(firstindex, lastindex);
    const totalPage = arrayData.length / dataPage;

    const pageNum = {
        width: "60px",
        border: "1px solid #000000",
        color: "ffffff",
        textAlign: "center",
        fontWeight: "bold",
        variant:"outline-secondary"
    };

    return(
        <div>
            <Card>
                <Card.Header>
                  Report Cookies
                </Card.Header>
                <Card.Body >
                  <Table bordered hover>
                {/* <table size="sm" class="table table-bordered"> */}
                    <thead>
                        <tr>
                        <th width="10%">IP Address</th>
                        <th width="10%">Cookies ID</th>
                        <th width="10%" >TypeID</th>
                        <th width="10%">Divice type</th>
                        <th width="10%">Latitude</th>
                        <th width="10%">Longitude</th>
                        <th width="10%">Hostname</th>
                        <th width="10%">Browser</th>
                        {/* <th width="10%">Browser version</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    {currentData.map((item,index) => (
                        <tr key={index}>
                        <td>{item.data[0].ipAdress}</td> 
                        <td>{item.cookieId}</td>
                        <td style={{textAlign: 'center'}}>{item.typeId}</td>  
                        <td>{item.data[1].diviceType}</td>  
                        <td>{item.data[2].latitude}</td>  
                        <td>{item.data[3].longitude}</td>  
                        <td>{item.data[7].href}</td>  
                        <td>{item.data[9].browser}</td>  
                        {/* <td>{item.data[8].browserVersion}</td>   */}
                        </tr>
                        ))}
                    </tbody>
                {/* </table> */}
                </Table>
                </Card.Body>
                <Card.Footer>
                    <div style={{"float":"right"}}>
                        <InputGroup size="sm">
                            <InputGroup.Prepend>
                                <Button type="button" variant="secondary" disabled={currentPage === 1 ? true:false} onClick={this.Firstpage}>

                                <i class="fas fa-angle-double-left"></i>&nbsp;&nbsp;First
                                </Button>
                                <Button type="button" variant="secondary"  disabled={currentPage === 1 ? true:false} onClick={this.Prevpage}>

                                <i class="fas fa-angle-left"></i>&nbsp;&nbsp;Prev
                                </Button>
                            </InputGroup.Prepend>
                            <FormControl style={pageNum} value={currentPage} disabled></FormControl>
                            <InputGroup.Append>
                                <Button  type="button" variant="secondary"  disabled={currentPage === totalPage ? true:false} onClick={this.Nextpage}>

                                <i class="fas fa-angle-right"></i>&nbsp;&nbsp;Next
                                </Button>
                                <Button  type="button" variant="secondary"  disabled={currentPage === totalPage ? true:false} onClick={this.Lastpage}>

                                <i class="fas fa-angle-double-right"></i>&nbsp;&nbsp;Last
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </Card.Footer>
            </Card>
        </div>
    )
  }
}