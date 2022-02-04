import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid, List, ListItem, ListItemText, ListItemButton, Card, CardActions, CardContent, Typography } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';

import { useEffect, useState } from "react";

import TutorialDataService from "../services/TutorialService";

const TutorialsList = () => {
    const [tutorials, setTutorials] = useState([]);
    const [currentTutorial, setCurrentTutorial] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrieveTutorials();
    }, []);

    const setActiveTutorial = (tutorial, index) => {
        setCurrentTutorial(tutorial);
        setCurrentIndex(index);
    }

    const handleChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }

    const retrieveTutorials = () => {
        TutorialDataService.getAll()
          .then(response => {
            setTutorials(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    };

    const findByTitle = () => {
        TutorialDataService.findByTitle(searchTitle)
            .then(res => {
                setTutorials(res.data);
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    // borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(0),
        width: 'auto',
    },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
              width: '20ch',
            },
          },
        },
    }));

    const StyledCard = styled(Card)(({ theme }) => ({
        backgroundColor: '#dae9f8',
        borderRadius: '0',
    }));

    return(
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>

                    <StyledInputBase
                        value={searchTitle}
                        onChange={handleChangeSearchTitle}
                        placeholder="Search by title"
                        inputProps={{'aria-label': 'search'}}
                        autoFocus={true}
                    />

                    <Button
                        size="small"
                        variant="outlined"
                        style={{marginRight: '1rem'}}
                        onClick={findByTitle}
                        type="button"
                    >
                        Search
                    </Button>
                </Search>
            </Grid>
            
            <Grid item xs={7}>
                <Box>
                    <List>
                        <Typography sx={{ fontSize: 20 }} variant="h1" color="black">
                            Tutorials List:
                        </Typography>
                        {   tutorials &&
                            tutorials.map((tutorial, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton
                                        selected={currentIndex === index}
                                        onClick={() => setActiveTutorial(tutorial, index)}
                                    >
                                        <ListItemText primary={tutorial.title} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>
            </Grid>

            <Grid item xs={5}>
                {currentTutorial ? (
                    <StyledCard>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
                                Tutorial info
                            </Typography>

                            <Typography sx={{ fontSize: 14 }} variant="h1" color="black" component="div">
                                <strong>Title:</strong> {currentTutorial.title}
                            </Typography>

                            <Typography sx={{ mb: 1.5, mt: 1.5}} color="black" align='justify'>
                                <strong>Description:</strong> {currentTutorial.description}
                            </Typography>

                            <Typography color="black" variant="body2">
                                <strong>Status:</strong> {currentTutorial.published ? 'Published' : 'Pending'}
                            </Typography>
                        </CardContent>
                        
                        <CardActions>
                            <Button size="small">Edit</Button>
                        </CardActions>
                    </StyledCard>
                ): (
                    <StyledCard>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
                            Please, Click on a Tutorial...
                        </Typography>
                    </CardContent>
                </StyledCard>
                )}
            </Grid>

            <Grid item xs={12}>
                    <h1>teste</h1>
            </Grid>
            
        </Grid>
    );
}

export default TutorialsList;