import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid, List, ListItem, ListItemText, ListItemButton} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';

import { useEffect, useState } from "react";

import TutorialDataService from "../services/TutorialService";

const TutorialsList = () => {
    const [tutorials, setTutorials] = useState([]);
    const [currentTutorial, setCurrentTutorial] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState('');

    const [selectedIndex, setSelectedIndex] = useState(1);

    useEffect(() => {
        retrieveTutorials();
    }, []);

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

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
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
        marginLeft: theme.spacing(1),
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

    return(
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>

                    <StyledInputBase 
                        placeholder="Search"
                        inputProps={{'aria-label': 'search'}}
                    />

                    <Button
                        size="small"
                        variant="outlined"
                        style={{marginRight: '1rem'}}
                    >
                        Search
                    </Button>
                </Search>
            </Grid>
            
            <Grid item xs={10}>
                <Box>
                    <List>
                        {
                            tutorials.map((tutorial, index) => (
                                <ListItemButton
                                    selected={selectedIndex === 0}
                                    onClick={(event) => handleListItemClick(event, 0)}
                                    key={index}
                                >
                                    <ListItemText primary={tutorial.title} />
                                </ListItemButton>
                            ))
                        }
                    </List>
                </Box>
            </Grid>

            <Grid item xs={2}>
                    <h1>teste</h1>
            </Grid>

            <Grid item xs={12}>
                    <h1>teste</h1>
            </Grid>
            
        </Grid>
    );
}

export default TutorialsList;