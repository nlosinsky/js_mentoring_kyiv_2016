require.context(
  "./imgs", // context folder
  true, // include subdirectories
  /\.(svg|png|jpe?g|gif)(\?\S*)?$/ // RegExp
);

require('normalize.css/normalize.css');
require('font-awesome/css/font-awesome.css');
require('./css/styles.css');

let add = require('./add');
document.write("1 + 2 = " + add(1, 2));