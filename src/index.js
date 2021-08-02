const ipUtils = require("ip-sub");

const index = function (vrp) {
    const prefix = vrp.prefix;
    const maxLength = vrp.maxLength;
    const ta = vrp.ta;

    validatePrefix(prefix);

    const cidr = ipUtils.getIpAndNetmask(prefix)[1];
    const maxCidr = ipUtils.getAddressFamily(prefix) === 4 ? 32 : 128;

    if (!Number.isInteger(maxLength) || cidr > maxLength || maxLength < 1 || maxLength > maxCidr) {
        throw new Error (`The maxLength format is not valid. It must be an integer between ${cidr} and ${maxCidr}.`);
    }

    if (typeof(ta) !== "string") {
        throw new Error ("The TA format is not valid. It must be a string.");
    }

};

const validatePrefix = function (prefix) {
    if (!ipUtils.isValidPrefix(prefix)) {
        throw new Error ("The prefix format is not valid");
    }
};

const validateIP = function (ip) {
    if (!ipUtils.isValidIP(ip)) {
        throw new Error ("The IP format is not valid");
    }
};

const validateAS = function (asn) {
    if (!Number.isInteger(asn) || asn < 0 || asn > 4294967295) {
        throw new Error (`The Autonomous System number format is not valid. It must be an integer.`);
    }
};

const validateASpath = function (aspath) {
    if (!Array.isArray(aspath)) {
        throw new Error (`The AS path format is not valid. It must be an array of ASes or an array of arrays.`);
    }

    aspath.forEach(asn => {
        if (Array.isArray(asn)) { // It's an AS-SET
            return validateASpath(asn);
        } else { // It's a single AS
            return validateAS(asn);
        }
    });
};

module.exports = {
    validateVRP: index,
    validatePrefix,
    validateIP,
    validateAS,
    validateASpath
};