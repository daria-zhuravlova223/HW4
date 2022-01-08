import {Input} from "../../common/Input";
import {Button} from "../../common/Button";
import Card from "@mui/material/Card";
import { useState } from "react";


export const ContactItem = ({ contact, onDelete, onUpdate, onComleted }) => {
    const [value, setValue] = useState(contact.number);
    const [isEditable, setIsEditable] = useState(false)

    const handleVlaue = (e) => setValue(e.target.value)


    const onUpdateItem = () => {
        onUpdate(contact.id, value);
        setIsEditable(false)
    }

    const onCancel = () => {
        setValue(contact.number);
        setIsEditable(false)
    }

    return(
        <Card sx={{ margin: 3, padding: 2, }}>

                    {
                        isEditable ? 
                        <Input value={value} handleChange={handleVlaue} /> 
                        : <p style={{ textDecoration:  contact.completed ? 'line-through': 'none' }}>{value}</p>
                    }

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5}}>
                   

                    {
                        isEditable ? 
                        <Button lable="Update" onClick={onUpdateItem} /> 
                        :   <Button lable="Edit" onClick={()=> setIsEditable(!isEditable)}/> 
                    }

                    { isEditable &&  <Button lable="Cancel" onClick={onCancel} />  }

                    <Button lable="Delete" onClick={()=> onDelete(contact.id)} /> 
                </div>
                
            </Card>
    )
}
