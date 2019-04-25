// javascript shim for Python's built-in 'sum'
function sum(nums) {
    var accumulator = 0;
    for (var i = 0, l = nums.length; i < l; i++)
      accumulator += nums[i];
    return accumulator;
  }
  
  // In case you were wondering, the nice functional version is slower.
  // function sum_slow(nums) {
  //   return nums.reduce(function(a, b) { return a + b; }, 0);
  // }
  // var tenmil = _.range(1e7); sum(tenmil); sum_slow(tenmil);
  
  // like betavariate, but more like R's name
  function rbeta(alpha, beta) {
    var alpha_gamma = rgamma(alpha, 1);
    return alpha_gamma / (alpha_gamma + rgamma(beta, 1));
  }
  
  // From Python source, so I guess it's PSF Licensed
  var SG_MAGICCONST = 1 + Math.log(4.5);
  var LOG4 = Math.log(4.0);
  
  function rgamma(alpha, beta) {
    // does not check that alpha > 0 && beta > 0
    if (alpha > 1) {
      // Uses R.C.H. Cheng, "The generation of Gamma variables with non-integral
      // shape parameters", Applied Statistics, (1977), 26, No. 1, p71-74
      var ainv = Math.sqrt(2.0 * alpha - 1.0);
      var bbb = alpha - LOG4;
      var ccc = alpha + ainv;
  
      while (true) {
        var u1 = Math.random();
        if (!((1e-7 < u1) && (u1 < 0.9999999))) {
          continue;
        }
        var u2 = 1.0 - Math.random();
        v = Math.log(u1/(1.0-u1))/ainv;
        x = alpha*Math.exp(v);
        var z = u1*u1*u2;
        var r = bbb+ccc*v-x;
        if (r + SG_MAGICCONST - 4.5*z >= 0.0 || r >= Math.log(z)) {
          return x * beta;
        }
      }
    }
    else if (alpha == 1.0) {
      var u = Math.random();
      while (u <= 1e-7) {
        u = Math.random();
      }
      return -Math.log(u) * beta;
    }
    else { // 0 < alpha < 1
      // Uses ALGORITHM GS of Statistical Computing - Kennedy & Gentle
      while (true) {
        var u3 = Math.random();
        var b = (Math.E + alpha)/Math.E;
        var p = b*u3;
        if (p <= 1.0) {
          x = Math.pow(p, (1.0/alpha));
        }
        else {
          x = -Math.log((b-p)/alpha);
        }
        var u4 = Math.random();
        if (p > 1.0) {
          if (u4 <= Math.pow(x, (alpha - 1.0))) {
            break;
          }
        }
        else if (u4 <= Math.exp(-x)) {
          break;
        }
      }
      return x * beta;
    }
  }

  module.exports = rbeta
  module.exports.rbeta  = rbeta