import React from 'react'

import {
    IconButton
} from '@material-ui/core'

import { 
    Edit as EditIcon,
    DeleteForever as DeleteIcon,
    Add as AddIcon
} from '@material-ui/icons'
import {TEXT} from './ActionTableButton.const'

export const  AddButton = ({ onExecute, ...restProps }) =>  (
    <div style={{ textAlign: 'center' }}>
        <IconButton {...restProps} onClick={onExecute} name='action-header'><AddIcon color="primary"/></IconButton>
    </div>
);

export const  EditButton = ({ onExecute, ...restProps }) => (
    <IconButton 
        onClick={onExecute} 
        title="Update"
        name="edit-button"
        {...restProps}
    >
        <EditIcon color="primary"/>
    </IconButton>
);

export const  DeleteButton = (props) => {
    let { onExecute, isStatusCodeError, isStatusError, ...restProps } = props
    return (
        <IconButton
            onClick={onExecute}
            title="Delete"
            name="delete-button"
            {...restProps}
        >
            <DeleteIcon color="secondary"/>
        </IconButton>
    );
}

export const  CommitButton = ({ onExecute, ...restProps }) => {
    return(
    <IconButton 
        onClick={onExecute} 
        title="Save"
        name="commit-button"
        {...restProps}
    >
        <div style={{color:'#536DFE',fontSize: '14px'}}>
            {TEXT.button.save}
        </div>
    </IconButton>
)}

export const CancelButton = ({ onExecute,  ...restProps }) => (
    <IconButton 
        color="secondary" 
        onClick={onExecute} 
        title="Cancel"
        {...restProps}
    >
        <div style={{color:'#FF3737',fontSize: '14px'}}>
            {TEXT.button.cancel}
        </div>
    </IconButton>
);

export const commandComponents = {
    add: AddButton,
    edit: EditButton,
    delete: DeleteButton,
    commit: CommitButton,
    cancel: CancelButton,
}

const Command = ({ id, onExecute }) => {
    const CommandButton = commandComponents[id];
    return <CommandButton onExecute={onExecute}></CommandButton>;
};

export default Command
