import { Grid, Box, Typography, TextField, FormControl, InputLabel, InputBase, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useEffect, useState, } from "react";
import { useParams } from "react-router-dom";
import tutorialDataService from '../services/TutorialService';

const Tutorial = () => {
    const initialTutorialState = {
        id: null,
        title: '',
        description: '',
        published: false
    };

    const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
    const [message, setMessage] = useState('');
    
    let { id } = useParams();

    useEffect(() => {
        getTutorial(id);
    }, []);

    const getTutorial = id => {
        tutorialDataService.get(id)
        .then(res => {
            setCurrentTutorial(res.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const  StyledInput = styled(InputBase)(({ theme }) => ({
        'label + &': {
          marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
          borderRadius: 4,
          position: 'relative',
          backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
          border: '1px solid #ced4da',
          fontSize: 16,
          width: '100%',
          padding: '10px 12px',
          transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
          ])
        },
      }));

    return(
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography sx={{ fontSize: 30 }} variant="h1">
                    Tutorial details:
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Box
                    component="form"
                    sx={{
                        width: '100%',
                        padding: '2rem',
                        backgroundColor: '#dceaf8'
                    }}
                >
                    <Grid
                        container 
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <FormControl variant="standard">
                                <InputLabel shrink htmlFor="title" style={{color: 'black'}}>
                                    Title
                                </InputLabel>
                                <StyledInput value={currentTutorial.title} id="title" />
                            </FormControl>
                        </Grid>
                    
                        <Grid item xs={12}>
                            <FormControl variant="standard" style={{width: '100%'}}>
                                <InputLabel shrink htmlFor="description" style={{color: 'black'}}>
                                    Description
                                </InputLabel>
                                <StyledInput value={currentTutorial.description} id="description" multiline/>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <div style={{display: 'flex', alignItems: 'baseline'}}>
                                <FormControl variant="standard">
                                    <InputLabel shrink htmlFor="status" style={{color: 'black'}}>
                                        Status
                                    </InputLabel>
                                    <StyledInput value={currentTutorial.published ? 'Published' : 'Pending'} id="status" />
                                </FormControl>

                                {currentTutorial.published ? (
                                    <Button
                                        variant="contained"
                                        style={{marginLeft: '.5rem'}}
                                    >
                                        Unpublish
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        style={{marginLeft: '.5rem'}}
                                    >
                                        Publish
                                    </Button>
                                )}
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div style={{display: 'flex', alignItems: 'baseline'}}>
                                <Button
                                    color="warning"
                                    variant="contained"
                                    style={{marginLeft: '.5rem'}}
                                >
                                    Update
                                </Button>

                                <Button
                                    color="error"
                                    variant="contained"
                                    style={{marginLeft: '.5rem'}}
                                >
                                    Delete
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Tutorial;