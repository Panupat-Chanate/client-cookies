import React,{useState} from "react"
import { makeStyles } from "@material-ui/core/styles"
import InputAdornment from "@material-ui/core/InputAdornment"
import Icon from "@material-ui/core/Icon"
import People from "@material-ui/icons/People"
import GridContainer from "imcomponents/Grid/GridContainer.js"
import GridItem from "imcomponents/Grid/GridItem.js"
import Button from "imcomponents/CustomButtons/Button.js"
import Card from "imcomponents/Card/Card.js"
import CardBody from "imcomponents/Card/CardBody.js"
import CardFooter from "imcomponents/Card/CardFooter.js"
import CustomInput from "imcomponents/CustomInput/CustomInput.js"
import styles from "assets/jss/material-kit-react/views/loginPage.js"
import Lottile from "imcomponents/lottie/index"
import image from "assets/img/bg004.jfif"
import axios from "axios"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(styles)

export default function LoginContainer({ _login, _input, loading}) {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  let history = useHistory();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden")
  setTimeout(function () {
    setCardAnimation("")
  }, 700)
  const classes = useStyles()


  const handleUsername = event =>{
    setUsername(event.target.value)
  }

  const handlePassword = events =>{
    setPassword(events.target.value)
  }

  const clearToken = () => {
    localStorage.removeItem('tokenId')
    window.location.reload()
  }

  const historyPage =()=>{
    history.goBack()
    window.location.reload();
  }

  _login = (e) => {
    e.preventDefault()
    const form = {
      username: e.target.username.value,
      password: e.target.pass.value

    }
    console.log(form)
    axios ({
      url: 'http://127.0.0.1:5000/cookies/api/users/checklogin',
      method: 'POST',
      data: form
    })
    .then((res) => {
      console.log(res.data)
      const {statusLogin} = res.data.data
      const {token} = res.data
      localStorage.setItem(`tokenId`,token)
      if (statusLogin === true) {
        return history.push('/admin')
      }
      alert('ชื่อหรือรหัสผ่านผิด')
    })
    .catch((error) => {
      console.log(error);
    });

  }
  const tokenId = localStorage.getItem("tokenId")
  if(!tokenId){
    return (
      <div>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={6}>
                <Lottile height={400} width={400} animationData="loginpage" />
              </GridItem>
              {/* <GridItem xs={6} justify="center" alignItems="center"> */}
              <GridItem xs={6}>
                <Card className={classes[cardAnimaton]}>
                  <form className={classes.form} onSubmit={_login}>
                    {/* <h5 className={classes.divider} style={{fontWeight:700}}>LOGIN
                    </h5> */}
                    <CardBody>
                      <CustomInput
                        labelText="USERNAME"
                        id="username"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                        onChange={handleUsername}
                      />
                      <CustomInput
                        labelText="PASSWORD"
                        id="pass"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <i className="fas fa-lock"></i>
                            </InputAdornment>
                          ),
                          autoComplete: "off",
                        }}
                        onChange={handlePassword}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button color="primary" type="submit">
                        LOGIN
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    )
  }else{
    return clearToken()
    // return historyPage()
  }
}