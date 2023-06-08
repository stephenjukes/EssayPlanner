import React, {useContext, useRef} from 'react';
import Input from './Input'
import { ItemContext } from '../App';

export default function ExpansionInput({inputItem}) {
    const context = useContext(ItemContext);
    const parent = context.items[inputItem.parent];

    function expandPanel(e, input) {
        e.preventDefault();
        if (!input) return;

        context.setItems(items => ({
            ...items,
            ...{
                [inputItem.id]: {
                    ...inputItem,
                    isExpanded: true
                }
            }
        }))
    }

    function storeValue(e, input) {
        e.preventDefault();
        if (!input) return;
        
        context.setItems(items => ({
            ...items,

            // Make Helper methods for addition and deletion so we don't have 
            // to remember to add/delete an item as well as adding/deleting to parent
            [inputItem.id]: {   // add item
                ...inputItem,
                value: input
            },

            [parent.id]: {  // add child to parent
                ...parent,
                children: [...new Set([
                    ...items[parent.id].children,
                    inputItem.id
                ])]
            }
        }))
    }

    const formParams = {
        form: {
            onSubmit: storeValue
        },
        input: {
            value: inputItem.value,
            placeholder: inputItem.prompt,
            onBlur: e => storeValue(e, e.target.value),
            itemId: inputItem.id, // TODO: Make this more generic as an array
        },
        submit: {
            label: 'add'
        }
    }

    return (
        <article id={inputItem.id} className='expansion-input'>
            <Input formParams={formParams} />

            <button
                onClick={e => expandPanel(e, inputItem.value)}
            >
                Expand
            </button>
        </article>
    )
}