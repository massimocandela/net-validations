# net-validations
Utility to validate network-related input fields

## Hot to install it

```
npm install net-validations
```

## How to use it

This utility contains a series of function raising errors in case the input is not valid.

```javascript

validateAS("onions") // will throw Error("The Autonomous System number format is not valid. It must be an integer.")

```
Example of usage:

```javascript
try {
  validateASpath([2914, 3333, 1234, "potato"]);
} catch (error) {
  console.log(error);
}
 
```


### Available functions
* validatePrefix
* validateIP
* validateAS
* validateASpath
* validateVRP
