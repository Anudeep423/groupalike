import React, {useState, useRef,useEffect} from 'react';
import {Container, Card, CardContent, makeStyles, Grid, TextField, Button} from '@material-ui/core';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
const axios = require('axios')



function App() { 
  const [text, setText] = useState('');
  const [offerNum,setOfferNum] = useState("");
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const classes = useStyles();
  const qrRef = useRef(null);
  const [allUsers,setAllUsers] = useState("")
  const [offerArray,setOfferArray] = useState([0,0,0,0])
  const [num,setNum] = useState("")
  const [disableButtons,setDisableButtons] = useState({first : false, second : false ,  third : false , fourth : false})

  const {first,second,third,fourth} = disableButtons

  useEffect(() => { fetch("http://localhost:8080/api/getAllUsers").
  then(res => { return  res.json()   } ).
  then(res => { setAllUsers(res) } ).
  catch(err => {console.log(err)}  )   } , []  )


  const generateQrCode = async (num) => {
    setNum(num)

    if(text){
      setOfferNum(num)
    try {
          const response = await QRCode.toDataURL("" + num);
          setImageUrl(response);
          

    }catch (error) {
      console.log(error);
    }
    }
  }
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
    if(num === 1){
      let temp = [...offerArray];
      temp[0] = temp[0] + 1
      callApi(temp , num);
      console.log("Temp",temp);
            setOfferArray(temp)
      console.log("TESTING",offerArray)
      setDisableButtons({...disableButtons, first : true})
    }
    if(num === 2){
     let temp = [...offerArray];
     temp[1] = temp[1] + 1
     callApi(temp, num);
     console.log("Temp",temp);
     setOfferArray(temp)
     console.log("TESTING",offerArray)
     setDisableButtons({...disableButtons, second : true})
      }
      if(num === 3){
       let temp = [...offerArray];
       temp[2] = temp[2] + 1
       callApi(temp, num);
       console.log("Temp",temp);
       setOfferArray(temp)
       setDisableButtons({...disableButtons, third : true})
        }
        if(num === 4){
         let temp = [...offerArray];
         temp[3] = temp[3] + 1
         callApi(temp, num);
         console.log("Temp",temp);
         setOfferArray(temp)
         setDisableButtons({...disableButtons, fourth : true})
     
          }
      if (result) {     
          setScanResultFile(result);

          // setTimeout( () => {
          //   axios.post("http://localhost:8080/api/create/user" , {
          //     name : text,
          //     offers : offerArray
          //   } ).then(function (response) {
          //     console.log("Response from the backend",response.data);
          //   })
          // } , 3000 )
       
      }
      function callApi(temp, no){
        axios.post("http://localhost:8080/api/create/user" , {
          name : text,
          offers : temp
        } ).then(function (response) {
          console.log("Response from the backend",response.data);
        })
      }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }

  return (
    <Container className={classes.conatiner}>
          <Card>
              <h2 className={classes.title}>Enter your name and click on avail offer download Qr code and scan it to avail offers</h2>
              <CardContent>
                  <Grid container spacing={2}>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <h3>Enter your name here to avail offers</h3>
                          <TextField label="Enter Your Name" onChange={(e) => setText(e.target.value)}/>
                          <br></br>
                          <br></br>
                          <Button disabled= {first}  className={classes.btn} variant="contained" 
                            color="primary" onClick={() => { 
                              if(!text){
                                alert("Enter Name to user Offers")
                              }
                              generateQrCode(1)} } >Avail offer 1</Button>
                            <br></br>
                                    <Button disabled= {second} className={classes.btn} variant="contained" 
                            color="primary" onClick={() => { 
                              if(!text){
                                alert("Enter Name to user Offers")
                              }
                              generateQrCode(2) }}>Avail offer 2</Button>
                             <br></br>
                             <Button disabled= {third} className={classes.btn} variant="contained" 
                            color="primary" onClick={() =>  {
                              if(!text){
                                alert("Enter Name to user Offers")
                              }
                              generateQrCode(3) }}>Avail offer 3</Button>
                             <br></br>
                                    <Button disabled= {fourth} className={classes.btn} variant="contained" 
                            color="primary" onClick={() => {
                              if(!text){
                                alert("Enter Name to user Offers")
                              }
                              generateQrCode(4)}}>Avail offer 4</Button>
                           {JSON.stringify(offerArray)}
                            {imageUrl ? (
                              <>
                              
                             
                              <h1>Qr code for offer {offerNum} </h1>
                              <a   href={imageUrl} download>
                                  <img src={imageUrl} alt="img"/>
                              </a>
                            <p>Click on Qr Code to download it</p>
                              </> ) : ""}
                      </Grid>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <Button style={{textAlign : "center"}} className={classes.btn} variant="contained" color="secondary" onClick={onScanFile}>Scan Qr Code</Button>
                        <QrReader
                          ref={qrRef}
                          delay={300}
                          style={{width: '100%'}}
                          onError={handleErrorFile}
                          onScan={handleScanFile}
                          legacyMode
                        />
                        <h3 style={{textAlign : "center"}}   > {scanResultFile ? `Offer ${offerNum} used By ${text}` : ""}   </h3>
                      </Grid>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>      
                        <h3 style={{textAlign : "center"}} >Admin Dashboard {scanResultFile}</h3>
                        <h4 style ={{textAlign : "center"}}>Offers used by users</h4>
                        <br></br>
                        <div  style ={{textAlign : "center"}} >
                           { allUsers ?   allUsers.map( (user,index) => {
                            return (
                              <>
                              <p>  <span style={{ fontWeight : "bold" }} > {index + 1}. </span> Name : {user.name}</p> 
                              <p>No of time offer used</p>
                              <p>First offer  : {user.offers[0]} </p>
                              <p>Second offer  : {user.offers[1]} </p>
                              <p>Third offer  : {user.offers[2]} </p>
                              <p>Fourth offer  : {user.offers[3]} </p>
                              <br></br>
                              </>
                              )
                          }  ) : "" }
                        
                        </div>
                      </Grid>
                  
                  </Grid>
              </CardContent>
          </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
    conatiner: {
      marginTop: 10,
      height : "50%"
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems:  'center',
      background: '#3f51b5',
      color: '#fff',
      padding: 20
    },
    btn : {
      marginTop: 5,
      marginBottom: 10
    }
}));
export default App;
