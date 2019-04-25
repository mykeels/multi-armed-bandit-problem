const graph = require('matplotnode')
const Solver = require('./solvers/solver')

/**
 * Plot the results by multi-armed bandit solvers.
 * @param {Solver} solver 
 * @param {String} title
 */
function plotGraph(solver, title) {
    graph.title(title)
    graph.plot(
        new Array(solver.counts.length).fill(0).map((x, i) => i), 
        solver.counts,
        'ls=steps',
        'lw=2'
    )
    graph.xlabel('Actions')
    graph.ylabel('# trials')
    graph.show()
}

module.exports = plotGraph