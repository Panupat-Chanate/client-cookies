// import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React from 'react'
import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, 
    Tooltip, Legend, BarChart, Bar, PieChart, 
    Pie, Cell, } from 'recharts';

    const styles = theme => ({
        appBarSpacer: theme.mixins.toolbar,
        title: {
          flexGrow: 1,
        },
        container: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          padding: theme.spacing(2),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        footer: {
          backgroundColor: theme.palette.background.paper,
          marginTop: theme.spacing.unit * 2,
        },
      });

class Cookies extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            _id: '',
            cookieId: '',
            typeId1: '',
            typeId2: '',
            typeId3: '',
            __v: '',
            createdAt: '',
            updatedAt: '',
            countData: '',
        
            }

        axios ({
            url: 'http://localhost:5000/backend/api/data/',
            method: 'GET',
            data: this.state
          }) 
          .then((response) => {
            console.log(response.data);
           this.setState({
                countData: response.data.length
           }) 
          });

          axios ({
            url: 'http://localhost:5000/backend/api/data/type/1',
            method: 'GET',
            data: this.state
          }) 
          .then((response) => {
            console.log(response.data);
           this.setState({
            typeId1: response.data.length
           }) 
          });

          axios ({
            url: 'http://localhost:5000/backend/api/data/type/2',
            method: 'GET',
            data: this.state
          }) 
          .then((response) => {
            console.log(response.data);
           this.setState({
            typeId2: response.data.length
           }) 
          });

          axios ({
            url: 'http://localhost:5000/backend/api/data/type/3',
            method: 'GET',
            data: this.state
          }) 
          .then((response) => {
            console.log(response.data);
           this.setState({
            typeId3: response.data.length
           }) 
          });
    }
    componentDidCatch() {
        this.allAPI();
    }

    
   

    render () {
    const { classes } = this.props;
    const data = [{name: 'Type 1', status: this.state.typeId1},
    {name: 'Type 2', status: this.state.typeId2},
    {name: 'Type 3', status: this.state.typeId3}];

    return (
        <div className={classes.root}>
        <CssBaseline />
       
        <div className={classes.appBarSpacer} />
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper }>
                <Typography>Total</Typography>
                <Typography variant="h3">{this.state.countData}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <Typography>Type 1</Typography>
                <Typography variant="h3">{this.state.typeId1}</Typography>
                
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <Typography>Type 2</Typography>
                <Typography variant="h3">{this.state.typeId2}</Typography>
               
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <Typography>Type 3</Typography>
                <Typography variant="h3">{this.state.typeId3}</Typography>
              
              </Paper>
            </Grid>
            {/* กราฟแท่ง */}
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <ResponsiveContainer width="100%" height={300}>
                <BarChart width={600} height={300} data={data}>
                    <XAxis dataKey="name" stroke="#000000" />
                    <YAxis />
                    <Tooltip/>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Bar dataKey="status" fill="#00C49F" barSize={40} />
                </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            {/* กราฟวงกลม */}
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart width={400} height={400}>
                      <Legend />
                      <Pie dataKey="status" isAnimationActive={true} data={data} outerRadius={100} label>
                        <Cell fill="#FFBB28" />
                        <Cell fill="#FF8042" />
                        <Cell fill="#0088FE" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
          </Grid>
        </Container>
      </div>
    )
    }
}

export default  withStyles(styles)(Cookies);