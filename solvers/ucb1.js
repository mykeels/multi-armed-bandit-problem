const BanditProblem = require('../bandit-problem')
const Solver = require('./solver')

/**
 * 
 * @param {BanditProblem} problem 
 * @param {Number} initialProbability default to be 1.0; optimistic initialization
 */
function UCB1(problem, initialProbability = 1) {
    Solver.call(this, problem)

    this.t = 0
    this.estimates = new Array(problem.n).fill(initialProbability)

    this.estimatedProbabilities = () => this.estimates

    this.step = () => {
        this.t += 1

        const items = new Array(this.problem.n).fill(0).map(
            (x, i) => this.estimates[i] + Math.sqrt(2 * Math.log(this.t) / (1 + this.counts[i])))
        
        const i = items.indexOf(Math.max(...items))
        const r = this.problem.generateReward(i)

        this.estimates[i] += 1 / (this.counts[i] + 1) * (r - this.estimates[i])

        return i
    }
}

UCB1.prototype = Solver.prototype

module.exports = UCB1
module.exports.UCB1 = UCB1