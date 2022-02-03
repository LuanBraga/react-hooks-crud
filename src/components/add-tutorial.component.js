import { useState } from "react";

const AddTutorial = () => {

    const initialTutorialState =  {
        id: null,
        title: '',
        description: '',
        published: false
    };

    const [tutorial, setTutorial] = useState(initialTutorialState);

    return(
        <h1>Add Tutorial Component</h1>
    );
}

export default AddTutorial;