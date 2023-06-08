export class ItemDescriptor {
    constructor(id, value, prompt = null, parent = null, isExpanded = false) {
        this.id = id;
        this.prompt = prompt;
        this.value = value;
        this.parent = parent;
        this.children = [];
        this.isExpanded = isExpanded;
    }
}