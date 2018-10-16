const calculateBucketKeyName = (value, bucketSize) => {
    if (value === 0){
        return '0ms';
    }
    if (!value){
        return '-';
    }
    const remainder = value % bucketSize;
    if (remainder === 0) {
        return `<${value}ms`;
    }
    const div = value / bucketSize;
    return `<${(Math.ceil(div) * bucketSize)}ms`;
};

// Sort
const sortObjKeysNumerically = (obj) => {
    const ordered = {};
    const compareNumbers = (a, b) => {
        // convert A and b to numbers
        const aN = parseInt(a.replace('<', '').replace('ms', ''));
        const bN = parseInt(b.replace('<', '').replace('ms', ''));
        return aN - bN;
    };
    Object.keys(obj).sort(compareNumbers).forEach(function (key) {
        ordered[key] = obj[key];
    });
    return ordered;
};


const calculateBucketKey = (value, bucketSize, bucketSize2) => {
    if (value > 100) {
        return calculateBucketKeyName(value, bucketSize2);
    } else {
        return calculateBucketKeyName(value, bucketSize);
    }
};

module.exports = {
    calculateBucketKeyName,
    sortObjKeysNumerically,
    calculateBucketKey
};
