import * as React from 'react';
import '../components/styles/globalStyle.scss'
import '../components/navbar/navbar.scss'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ChartOne from '../components/chart/ChartOne.jsx';
import ChartTwo from '../components/chart/ChartTwo.jsx';
import ChartThree from '../components/chart/ChartThree.jsx';
import ChartFour from '../components/chart/ChartFour.jsx';
import Footer from '../components/footer/Footer';
import Axios from '../services/caller.service';
import Historique from '../components/historique/Historique.jsx'

import { useNavigate } from 'react-router-dom';

import { StorageRounded, Logout } from '@mui/icons-material'
import CardHum from '../components/card/CardHum';
import CardFum from '../components/card/CardFum';
import CardTemp from '../components/card/CardTemp';
import CardPous from '../components/card/CardPous';


function Home() {

    const [dataTable, setDataTable] = React.useState([
        { id: 0, temperatureamb: 0, humiditeeamb: 0, niveaufumee: 0, poussiere: 0 },
        { id: 0, temperatureamb: 0, humiditeeamb: 0, niveaufumee: 0, poussiere: 0 },
        { id: 0, temperatureamb: 0, humiditeeamb: 0, niveaufumee: 0, poussiere: 0 },
        { id: 0, temperatureamb: 0, humiditeeamb: 0, niveaufumee: 0, poussiere: 0 },
        { id: 0, temperatureamb: 6, humiditeeamb: 0, niveaufumee: 0, poussiere: 0 },
        { id: 0, temperatureamb: 0, humiditeeamb: 0, niveaufumee: 0, poussiere: 0 },
        { id: 0, temperatureamb: 0, humiditeeamb: 0, niveaufumee: 0, poussiere: 0 },
        { id: 0, temperatureamb: 0, humiditeeamb: 5, niveaufumee: 0, poussiere: 0 },
        { id: 0, temperatureamb: 0, humiditeeamb: 0, niveaufumee: 0, poussiere: 0 },
        { id: 0, temperatureamb: 0, humiditeeamb: 0, niveaufumee: 0, poussiere: 0 },
        { id: 0, temperatureamb: 0, humiditeeamb: 0, niveaufumee: 0, poussiere: 0 },
        { id: 0, temperatureamb: 0, humiditeeamb: 0, niveaufumee: 0, poussiere: 0 },
        { id: 0, temperatureamb: 0, humiditeeamb: 0, niveaufumee: 0, poussiere: 0 },
    ])

    //for card default value
    const [lastValue, setLastValue] = React.useState({ temperatureamb: 0, humiditeeamb: 0, niveaufumee: 0, poussiere: 0 });
    const { temperatureamb, humiditeeamb, niveaufumee, poussiere } = lastValue;

    //handeling notification
    const [errorN, setErrorN] = React.useState(false);
    // const [msg1, setmsg1] = React.useState('')
    // const [msg2, setmsg2] = React.useState('')
    // const [msg3, setmsg3] = React.useState('')
    // const [msg4, setmsg4] = React.useState('')

    const [status, setStatus] = React.useState('')
    const [temp, setTemp] = React.useState(null)
    const [entryValue, setentryValue] = React.useState()

    const [open, setOpen] = React.useState(false);
    const [power, setPower] = React.useState(0);

    const navigate = useNavigate()

    const handleClose = () => {
        localStorage.clear();
        navigate("/")
    }
    const handleClick = () => {
        setOpen(true)
    }

    const startValue = localStorage.getItem('power')

    const handleToggleUpdate = () => {
        Axios.put('/command/status', { valueData: power })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleToggleGetStatus = () => {
        Axios.get('/command/status')
            .then(response => {
                console.log(response.data.data[0].statusfan)
                setStatus(response.data.data[0].statusfan)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleGetTemp = () => {
        Axios.get('/command/temp')
            .then(response => {
                console.log(response.data.data[0].temperature)
                setTemp(response.data.data[0].temperature)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleUpdateTemp = () => {
        Axios.put('/command/temp', { valueData: entryValue })
            .then(response => {
                console.log(response.data.data[0].statusfan)
                setStatus(response.data.data[0].statusfan)
            })
            .catch(error => {
                console.log(error)
            })
    }

    
    // if (temperatureamb > 20) {
    //     setErrorN(true)
    // }
    // else if (humiditeeamb > 20) {
    //     setmsg2('bbbbbb')
    //     setErrorN(true)
    // }
    // else if (niveaufumee > 0) {
    //     setmsg3('cccccc')
    //     setErrorN(true)
    // }
    // else if (poussiere > 5) {
    //     setmsg4('dddddd')
    //     setErrorN(true)
    // }

    console.log("Home page")

    React.useEffect(() => {

        setInterval(() => {
            Axios.get(`/server/getall`)
                .then(response => {

                    //for card default value
                    if (response.data.data.length > 1) setLastValue(response.data.data[response.data.data.length - 1]);
                    else setLastValue(current => ({ ...current }))
                    //for graphic default value
                    if (response.data.data.length > 11) setDataTable(response.data.data.slice(-10));
                    else setDataTable(current => ([...current]));
                })
                .catch(error => console.log(error))

        }, 1000);

    }, [])


    console.log('Home')
    return (
        <React.Fragment>

            {/* <NavBar /> */}
            <div className="nav_bar">
                <span className="logo"><StorageRounded />SALLE SERVEUR</span>
                <div className="menu">
                    <div className='dbValue'>
                        {temp && <span>T:{temp}</span>}

                        <span>Status: {status}</span>
                    </div>
                    <div className="form">
                        <input type="text" placeholder="24deg" value={entryValue} className='input' onChange={(e) => setentryValue(e.target.value)} />
                        <div className='btn' onClick={() => {
                            handleUpdateTemp();
                            setTemp(entryValue)
                        }}>
                            <span>Fixer température</span>
                        </div>
                    </div>
                    <div className="powerBtn">
                        <div className={status === 1 ? 'active' : 'left'} onClick={() => {
                            localStorage.setItem('power', 1);
                            setPower(1);
                            handleToggleUpdate()
                            handleToggleGetStatus()
                        }}>
                            <div>ON</div>
                        </div>
                        <div className={status === 0 ? 'active' : 'right'} onClick={() => {
                            localStorage.setItem('power', 0);
                            setPower(0);
                            handleToggleUpdate()
                            handleToggleGetStatus()
                        }}><div>OFF</div>
                        </div>
                    </div>
                    <span className='item' onClick={handleClick}>Historique </span>
                    {/* <span>Admin <SensorOccupied sx={{ ml: 1, mr: 3 }} /></span> */}
                    <span className='deconnect' onClick={handleClose}>Déconnexion<Logout className="icon" sx={{ ml: 1 }} /></span>
                </div>
            </div>

            <Box className='cardContainer' >
                <div className="box box1">
                    <CardHum humiditeeamb={humiditeeamb} />
                    {/* <Card type="humiditeSol" /> */}
                </div>
                <div className="box box1">
                    {/* <Card type="humiditeAmbiante" /> */}
                    <CardFum niveaufumee={niveaufumee} />
                </div>
                <div className="box box1">
                    {/* <Card type="temperatureAmbiante" /> */}
                    <CardTemp temperatureamb={temperatureamb} />

                </div>
                <div className="box box1">
                    {/* <Card type="niveauEau" /> */}
                    <CardPous poussiere={poussiere} />
                </div>

            </Box>

            <div className="chart2">

                <div className="box box1">
                    <div className="legend">
                        <span className="legendLabel">Humidité ambiante</span>
                        <span className="LegendDot"></span>
                    </div>
                    <ChartOne dataTable={dataTable} />
                </div>

                <div className="box box2">
                    <div className="legend">
                        <span className="legendLabel">Niveau fumée</span>
                        <span className="LegendDot"></span>
                    </div>
                    <ChartTwo dataTable={dataTable} />
                </div>

                <div className="box box3">
                    <div className="legend">
                        <span className="legendLabel">Température ambiante</span>
                        <span className="LegendDot"></span>
                    </div>
                    <ChartThree dataTable={dataTable} />
                </div>

                <div className="box box4">
                    <div className="legend">
                        <span className="legendLabel">Taux Poussière</span>
                        <span className="LegendDot"></span>
                    </div>
                    <ChartFour dataTable={dataTable} />
                </div>
            </div>

            <Historique open={open} setOpen={setOpen} />

            {errorN &&
                <Dialog open >
                    <DialogTitle>Notifications</DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '400px' }} >
                        <span className="warning">Le niveau de fumée est supérieur au seuil</span>
                        {/* <span className="warning">{msg2}</span>
                        <span className="warning">{msg3}</span>
                        <span className="warning">{msg4}</span> */}
                    </DialogContent>
                    <DialogActions>
                        <Button variant='text' onClick={() => setErrorN(false)} color='warning'>Ok</Button>
                    </DialogActions>
                </Dialog>
            }
            <Footer />


        </React.Fragment>
    );
}
export default Home;
