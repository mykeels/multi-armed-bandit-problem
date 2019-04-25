const BanditProblem = require('../bandit-problem')
const Solver = require('./solver')
const PD = require('probability-distributions')
const rbeta = require('../utils/rbeta')

/**
 * 
 * @param {BanditProblem} problem 
 * @param {Number} initialProbability default to be 1.0; optimistic initialization
 */
function ThompsonSampling(problem, initA = 1, initB = 1) {
    Solver.call(this, problem)

    this.aS = new Array(problem.n).fill(initA)
    this.bS = new Array(problem.n).fill(initB)

    this.estimatedProbabilities = () => new Array(this.problem.n).fill(0).map((x, i) => {
        return this.aS[i] / (this.aS[i] + this.bS[i])
    })

    this.step = () => {
        const samples = new Array(this.problem.n).fill(0).map((i, x) => rbeta(this.aS[x], this.bS[x]))
        const i = samples.indexOf(Math.max(...samples))
        const r = this.problem.generateReward(i)

        this.aS[i] += r
        this.bS[i] += (1 - r)

        return i
    }
}

ThompsonSampling.prototype = Solver.prototype

module.exports = ThompsonSampling
module.exports.ThompsonSampling = ThompsonSampling