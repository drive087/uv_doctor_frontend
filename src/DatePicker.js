import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 170,
  },
}));

export default function DatePickers(props) {
  const classes = useStyles();
  return (
      <TextField
        id={props.id}
        name = {props.name}
        variant="outlined"
        required
        label={props.label}
        type={props.type}
        value = {props.value}
        defaultValue = {props.defaultValue}
        onChange = {props.onChange}
        className={classes.textField}
        color = 'primary'  
        size = 'normal'      
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={props.inputProps}
        inputRef={props.inputRef}
      />
  );
}