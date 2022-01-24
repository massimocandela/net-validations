# net-validations
Utility to validate network-related input fields

## Installation

```
npm install net-validations
```

## Example

This utility contains a series of functions raising errors in case their input is not valid.

```javascript

validateAS("onions");
// will throw Error("The Autonomous System number format is not valid. It must be an integer.")

validateASpath([2914, 3333, 1234]);

validateVRP({prefix: "192.0.2.0/24", maxLength: 28, asn: 65536});

```


### Available functions
* validatePrefix
* validateIP
* validateAS
* validateASpath
* validateVRP
