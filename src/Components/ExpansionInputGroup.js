import React, {useRef, useContext} from 'react';
import ExpansionInput from './ExpansionInput';
import { ItemDescriptor } from '../Classes';
import { v4 as uuidv4 } from 'uuid';
import { ItemContext } from '../App';

// consider useContext instead of passsing parameters down
export default function({prompt, parent, items}) {
    const inputRef = useRef({});
    const context = useContext(ItemContext);

    function addInput(e) {
        const hasEmptyInput = items.some(item => !item.value);
        if (hasEmptyInput) return;

        const newInput = new ItemDescriptor(
            uuidv4(), "", prompt, parent.id);

        context.setItems(items => ({
            ...items,

            // Make Helper methods for addition and deletion so we don't have 
            // to remember to add/delete an item as well as adding/deleting to parent
            [newInput.id]: newInput,   // add item

            [parent.id]: {  // add child to parent
                ...parent,
                children: [...new Set([
                    ...items[parent.id].children,
                    newInput.id
                ])]
            }
        }))  
    }

    return (
        <div className="expansion-input-group">
            <button onClick={addInput}>
                +
            </button>

            <div>
                {
                    items.map(item => 
                        <ExpansionInput 
                            key={item.id}
                            inputItem={item}
                        /> )
                }
            </div>
        </div>
    )
}