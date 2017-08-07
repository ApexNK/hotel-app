/**
 * Created by cm on 2016/12/22.
 */
var exec = require('cordova/exec');
module.exports = {
  start : function(output, success, error) {
    exec(success, error, "YbUpdate", "start", output);
  }
};
