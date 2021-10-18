function filterByTerm(inputArr, searchTerm) {
    return inputArr.filter(function(element) {
        return element.url.match(searchTerm);
    })
}

module.exports = filterByTerm;