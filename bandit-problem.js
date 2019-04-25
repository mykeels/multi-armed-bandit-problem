
/**
 * 
 * @param {Number} n 
 * @param {Array} probabilities 
 */
function BanditProblem(n, probabilities) {
    if (typeof n !== 'number' || n <= 1) throw new Error('n should be a positive integer greater than 1')
    if (!Array.isArray(probabilities) || probabilities.length != n) {
        probabilities = new Array(n).fill(0).map((num, i) => Math.random())
    }
    this.n = n
    this.probabilities = probabilities
    this.bestProbability = Math.max(...probabilities)

    this.generateReward = i => {
        if (Math.random() < this.probabilities[i]) return 1
        else return 0
    }
}

module.exports = BanditProblem
module.exports.BanditProblem = BanditProblem