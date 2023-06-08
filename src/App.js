// BUG:
  // populate prompt, add another prompt, expand the populated prompt.


import React, {useState, createContext} from 'react';
import './App.css';
import Item from './Components/Item';
import {ItemDescriptor} from './Classes';
import Input from './Components/Input';
import { v4 as uuidv4 } from 'uuid';

export const ItemContext = createContext();

export default function App() {
  const [items, setItems] = useState({});
  const activeItemState = useState();

  // setItems(items => )
  
  function addToList(e, input) {
    e.preventDefault();
    if (!input) return;

    const item = new ItemDescriptor(uuidv4(), input);
    setItems(items => ({...items, [item.id]: item}));
  }

  const formParams = {
    form: { 
      onSubmit: addToList,
      resetAfterSubmit: true
    },
    submit: { label: 'Add' }
  }

  return(
    <div id="container">
      <Input formParams={formParams} />

      <ItemContext.Provider value={{
          items: items,
          setItems: setItems
        }}
      >
        
        <section className="list">
          <ul>
            {
              Object.values(items)
                .filter(item => !item.parent)
                .map(item => 
                  <Item 
                    key={item.id} 
                    item={item} 
                    activeItemState={activeItemState}
                  />)
            }
          </ul>
        </section>

      </ItemContext.Provider>
    </div>
  );
}
