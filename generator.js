module.exports = function(ast){
    return generate(ast)
}

var generators = {
    Program: node => generateAll(node.prog).join("\n\n"),
    JavaScriptBlock: node => `@${generate(node.body)}`,
    JavaScript: node => `{%${node.script}%}`,
    Ruleset: node => `${node.set} ->\n\t  ${generateAll(node.rules).join("\n\t| ")}`,
    Rule: node => `${generateAll(node.tokens).join(" ").trim()}${node.postprocess ? (" " + generate(node.postprocess)) : ""}`,
    RulesetRef: node => node.token,
    Literal: node => `"${node.literal}"`,
    Ebnf: node => `${generate(node.ebnf)}${node.modifier}`,
    CharClass: node => node.regex,
    Epsilon: node => ""
}

const generateAll = (nodes = []) => nodes.map(generate)

const generate = (node = {type: "Epsilon"}) => node.type in generators ? generators[node.type](node) : `Node of type "${JSON.stringify(node)}" not expected`