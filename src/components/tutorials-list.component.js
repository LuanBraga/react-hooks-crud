import { useEffect, useState } from "react";
import TutorialDataService from "../services/TutorialService";

const TutorialsList = () => {
    const [tutorials, setTutorials] = useState([]);
    const [currentTutorial, setCurrentTutorial] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState('');

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

    return(
        <ul>
            {
                tutorials.map((tutorial, index) => (
                    <li
                        key={index}
                    >
                        {tutorial.title}
                    </li>
                ))
            }
        </ul>
    );
}

export default TutorialsList;