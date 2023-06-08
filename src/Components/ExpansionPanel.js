import React, {useContext} from 'react'
import ExpansionInputGroup from './ExpansionInputGroup'
import { ItemContext } from '../App';
import { recurseClose } from '../Helpers';
import { ItemDescriptor } from '../Classes';
import { v4 as uuidv4 } from 'uuid';

export default function ExpansionPanel({item}) {
    const context = useContext(ItemContext);

    const inputGroups = createInputGroups();
    function createInputGroups() {
        // hardcoded for now
        const prompts = ["why", "custom"];
         
        const children = item.children
            .map(childId => context.items[childId])

        const childrenByPrompt = children
            .reduce((acc, child) => ({
                ...acc, 
                [child.prompt]: child.prompt in acc 
                    ? [...acc[child.prompt], child]
                    : [child]
            }), {});
        
        return prompts
            .map(prompt => ({
                prompt: prompt,
                items: childrenByPrompt[prompt] 
                    || [new ItemDescriptor(uuidv4(), "", prompt, item.id)]
            })) 
    }

    // This will currently be only one nested child, but provides 
    // opportunity for more that one child to open if desired.
    const childrenForExpansion = item.children
        .map(childId => context.items[childId])
        .filter(child => child.isExpanded);

    function close() {
        recurseClose(item, context.items, context.setItems);
    }

    return(
        <div id={item.id} className='expansion-panel'>
            <header 
                className='pointer'
                onClick={close}
            >
                <h3>{item.value}</h3>
                
                <button >
                    X
                </button>
            </header>

            <section className={childrenForExpansion.length ? 'expansion-container' : 'prompts'}>
                {
                    childrenForExpansion.length
                        ? childrenForExpansion.map(child => <ExpansionPanel 
                                key={child.id}
                                item={child} />)

                        : inputGroups.map(group => <ExpansionInputGroup 
                                key={group.id}
                                prompt={group.prompt}
                                parent={item}
                                items={group.items}
                        />)
                }
            </section>
        </div>
    )
}