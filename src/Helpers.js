export function clickOnEnter(e) {
  if (e.key === "Enter") {
    e.target.click();
  }
}

export function group(collection, groupFunc) {
  return collection.reduce((acc, item) => ({
    ...acc,
    [groupFunc(item)]: [...(acc[groupFunc(item)] || []), item]
  }), {});
}

// TODO: Should this include the original item?
// TODO: Should this return only ids?
export function getDescendants(item, items) {
  if (!item.children.length) return [item];

  const children = item.children
    .map(childId => [item]
      .concat(getDescendants(items[childId], items)).flat()
    ).flat();

  return children;
}

export function getChildren(item, items) {
  return Object.values(items).filter(i => i.parent === item.id);
}

export function filterItems(items, setItems, shouldRetain) {
  // const forDeletion = items.filter(item => !shouldRetain(item));
  // const forDeletionIds = forDeletion.map(item => item.id);
  // const parentIdsWithDeleted = forDeletion.map(item => item.parent);

  setItems(items => Object.values(items)
    .reduce((acc, item) => {
      // // filter from parent if exists
      // const isParentOfDeleted = parentIdsWithDeleted.includes(item.id);
      
      // if (isParentOfDeleted) {
      //   return {
      //     ...acc,
      //     [item.id]: {
      //       ...item,
      //       children: item.children.filter(id => !forDeletionIds.includes(id))
      //     }
      //   }
      // }

      // retain valid items
      if (shouldRetain(item)) {
        return { ...acc, [item.id]: item }
      }

      // and skip invalid items
      return acc;
  }))
}

export function recurseClose(item, items, setItems) {
  const toClose = getDescendants(item, items)
    .map(descendant => descendant.id);

  setItems(items => Object.values(items)
    // .filter(item => item.value !== "") // we also need to remove as child of parent
    .reduce((acc, item) => ({
      ...acc,
      
      ...{[item.id]: {
        ...item, 
        isExpanded: !toClose.includes(item.id) 
          ? item.isExpanded 
          : false 
      }},
    }), {}))
}

export function buildItemTree(itemCollection) {
  return itemCollection.reduce((acc, item) => ({
    ...acc,

    [item.id]: item,


  }), {})
}

export function closeAllPanels(setItems) {    
  setItems(items => Object.values(items)
      .reduce((acc, item) => ({
          ...acc, 
          ...{[item.id]: {
              ...item, isExpanded: false
          }}
      }) ,{}));
}