const BanditProblem = require('../bandit-problem')
const Solver = require('./solver')

/**
 * 
 * @param {BanditProblem} problem 
 * @param {Number} eps the probability to explore at each time step
 * @param {Number} initialProbability default to be 1.0; optimistic initialization
 */
function EGreedy(problem, eps, initialProbability = 1) {
    Solver.call(this, problem)

    if (!(0 <= eps && eps <= 1)) throw new Error('eps must satisfy 0 <= eps <= 1')

    this.eps = eps
    this.estimates = new Array(problem.n).fill(initialProbability)

    this.estimatedProbabilities = () => this.estimates

    this.step = () => {
        let i
        if (Math.random() < this.eps) {
            // let's do random exploration
            i = Math.floor(Math.random() * this.problem.n)
        }
        else {
            // pick the best one
            i = this.estimates.indexOf(Math.max(...this.estimates))
        }
        const r = this.problem.generateReward(i)
        this.estimates[i] += 1 / (this.counts[i] + 1) * (r - this.estimates[i])

        return i
    }
}

EGreedy.prototype = Solver.prototype

module.exports = EGreedy
module.exports.EGreedy = EGreedy