function getWeight() {
    return 1;
}

function getDuplicateWeight(dupes) {
    return 1 / Math.max(1, dupes);
}

export { getWeight, getDuplicateWeight };
