import React, {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt} from '@fortawesome/free-regular-svg-icons'
import { clickOnEnter, closeAllPanels, getDescendants } from '../Helpers';
import {ItemContext} from './../App';

export default function ItemRow({item, activeItemState}) {
    const context = useContext(ItemContext);
    const setActiveItem = activeItemState[1]; // TODO: Consider using context

    function openPanel() {
        closeAllPanels(context.setItems);

        context.setItems(items => ({
            ...items, 
            [item.id]: {
                ...item, 
                isExpanded: true
            }
        }));

        setActiveItem(item.id)
    }

    function handleDelete(e) {
        let shouldDelete = true;
        const descendants = getDescendants(item, context.items).map(d => d.id);

        // Descendannts currently include the original item
        // TODO: Consider changing this to exclude
        if (descendants.length > 1) {
            shouldDelete = window.confirm("This item has sub items. Do you wish to continue and delete all?");
        }

        if (!shouldDelete) return;

        const postDelete = Object.values(context.items)
            .reduce((acc, candidate) => filterDeleted(acc, candidate, descendants), {});

        context.setItems(postDelete);
    }

    function filterDeleted(acc, candidate, descendants) {
        // filter from parent if exists
        if (candidate.id === item.parent) {
            const updatedParent = {
                ...candidate,
                children: candidate.children.filter(id => id !== item.id)
            }

            return {...acc, [updatedParent.id]: updatedParent};
        }

        // include if not a descendant                         
        if (!descendants.includes(candidate.id)) {
            return {...acc, [candidate.id]: candidate};
        }

        // don't include if a descendant
        return acc;
    }

    return (
        <div className='item'>
            <span 
                tabIndex="0"
                className="item-content pointer"
                onClick={openPanel}
                onKeyDown={clickOnEnter}
            >
                <span className="item-prompt">
                    <small >
                        {item.prompt || ""}
                    </small>
                </span>
                
                <span>
                    {item.value}
                </span>
            </span>

            <span 
                className='item-delete pointer'
                onClick={handleDelete}
            >
                <FontAwesomeIcon icon={faTrashAlt} />
            </span>
        </ div>                  
    )
}