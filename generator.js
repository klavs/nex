module.exports = function(ast){
    return generate(ast)
}

var generators = {
    Program: node => generateAll(node.prog).join("\n\n"),
    JavaScriptBlock: node => `@${generate(node.body)}`,
    JavaScript: node => `{%${node.script}%}`,
    Ruleset: node => `${node.set} ->\n      ${generateAll(node.rules).join("\n    | ")}`,
    Rule: node => `${generateAll(node.tokens).join(" ")} ${generate(node.postprocess)}`
}

const generateAll = (nodes = []) => nodes.map(generate)

const generate = (node = {}) => node.type in generators ? generators[node.type](node) : `Node of type "${node.type}" not expected`