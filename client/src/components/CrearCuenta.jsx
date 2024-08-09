import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import Register from './Stepper/Register';
import TopicAndMP from './Stepper/TopicAndMP';
import { registerRequest } from '../auth/axiosAPI';
import { useState } from 'react';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center" className='pb-2'>
            {'Copyright © '}
            <Link color="inherit" href="https://matesito.netlify.app/">
                Matesito
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function CrearCuenta() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [registerData, setRegisterData] = useState({});
    const [selectedTopic, setSelectedTopic] = useState('');

    const navigate = useNavigate()

    const handleNext = () => {
        if (activeStep === 0 && !selectedTopic) {
            alert('Por favor selecciona un tópico antes de continuar.');
            return;
        }
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleTopicSelect = (topic) => {
        setSelectedTopic(topic);
    };

    const handleRegister = (data) => {
        setRegisterData(data);
    };

    const handleValidation = () => {
        if (!registerData.user || !registerData.email || !registerData.password) {
            alert('Por favor, completa todos los campos.');
            return false;
        }
        if (registerData.user.length < 3 || registerData.email.length < 8 || registerData.password.length < 8) {
            alert('Por favor, los datos necesitan más caracteres.');
            return false;
        }
        return true;
    };    

    const handleFinish = async () => {
        const data = { ...registerData, topic: selectedTopic };
        if (!handleValidation()) {
            return;
        }
        try {
            const res = await registerRequest(data);
            if (res.data)
                return navigate(`/perfil/${registerData.user}`)
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    };

    const steps = ['Tópico', 'Formulario'];

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <TopicAndMP onTopicSelect={handleTopicSelect} />;
            case 1:
                return <Register onRegister={handleRegister} registerData={registerData} setRegisterData={setRegisterData} />;
            default:
                throw new Error('Unknown step');
        }
    }


    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Matesito
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ my: 2, }}>
                <Paper variant="outlined" sx={{ p: 4 }}>
                    <Typography component="h1" variant="h4" align="center">
                        Creá tu cuenta!
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed your order
                                confirmation, and will send you an update when your order has
                                shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep, handleTopicSelect, handleRegister)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                {activeStep !== steps.length - 1 ? (
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Next
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        onClick={handleFinish}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Finish
                                    </Button>
                                )}
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
            <Copyright />
        </React.Fragment>
    );
}