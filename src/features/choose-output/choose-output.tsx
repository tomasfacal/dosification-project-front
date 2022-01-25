import { Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import React, {useState, Fragment} from 'react';
import { setConstantValue } from 'typescript';
import styles from './choose-output.module.scss';


const ChooseOutput = (props: any) => { 
    const [chooseOutput, setChooseOutput] = useState('')

    const handleChange = (event: any) => {
        setChooseOutput(event.target.value);
        props.setValue(event.target.value)
      };
    
    return (
        <Fragment>
            <h1 className={styles.Title} >Output</h1>
            <Box sx={{ minWidth: 70 }}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Output</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={chooseOutput}
                    label="Output"
                    onChange={handleChange}
                >
                    {props.outputs.map((output: string) => (
                        <MenuItem value={output}>{output}</MenuItem>
                    ))}
                </Select>
                </FormControl>
            </Box>
        </Fragment>
    );
}

export default ChooseOutput;
