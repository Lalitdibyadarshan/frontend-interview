const htmlToJSON = (node) => {
    const result = {};
    if (node.children) {
        result.children = Array.from(node.children).map(htmlToJSON);
    } else {
        result.children = node.innerText;
    }

    result.attributes = node.getAttributeNames().map((attr) => ({name: attr, value: node.getAttribute(attr)}));
    result.name = node.tagName.toLowerCase();

    return result;
}