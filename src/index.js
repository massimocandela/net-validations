const ipUtils = require("ip-sub");

const validateVRP = function (vrp) {
    const prefix = vrp.prefix;
    const maxLength = vrp.maxLength;
    const ta = vrp.ta;
    const expires = vrp.expires;
    const asn = vrp.asn;

    validatePrefix(prefix);
    validateAS(asn);

    const cidr = ipUtils.getIpAndCidr(prefix)[1];
    const maxCidr = ipUtils.getAddressFamily(prefix) === 4 ? 32 : 128;

    if (!Number.isInteger(maxLength) || cidr > maxLength || maxLength < 1 || maxLength > maxCidr) {
        throw new Error (`The maxLength format is not valid. It must be an integer between ${cidr} and ${maxCidr}.`);
    }

    if (typeof(ta) !== "string") {
        throw new Error ("The TA format is not valid. It must be a string.");
    }

    if (expires && !Number.isInteger(expires)) {
        throw new Error (`The expires format is not valid. It must be a UNIX timestamp.`);
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
    validateVRP,
    validatePrefix,
    validateIP,
    validateAS,
    validateASpath
};