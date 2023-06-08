import React, {useContext} from 'react';
import ExpansionPanel from './ExpansionPanel';
import {ItemContext} from './../App';
import ItemRow from './ItemRow';

export default function Item({item, activeItemState}) {
    const activeItem = activeItemState[0];
    const context = useContext(ItemContext);

    const isExpanded = item.id === activeItem && item.isExpanded;
    const childrenForDisplay = item.children
        .map(id => context.items[id])
        .filter(c => c.value);
    
    return (
        <li 
            id={item.id}
            className="expansion-container"
        >
            {
                isExpanded
                    ? <ExpansionPanel item={item} />
                    : <ItemRow item={item} activeItemState={activeItemState}/>                 
            }

            <ul>
                {
                    childrenForDisplay.map(child => <Item 
                        key={child.id}
                        item={child}
                        activeItemState={activeItemState}
                    />)       
                }
            </ul>  
        </li>
    )
}