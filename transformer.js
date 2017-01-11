module.exports = function (ast) {
    return transform(ast);
}

const transform = (ast) => {

    nex = ast[0];
    const rulesetMap = nex.prog.reduce((acc, prod) => {
        if (prod.type == "Ruleset") {
            acc[prod.set] = prod;
        }
        return acc;
    }, {})


    nex.prog.filter(prod => prod.type === "Rule").forEach(rule => {
        if (!(rule.set in rulesetMap)) {
            var ruleset = {
                set: rule.set,
                type: "Ruleset",
                rules: []
            };
            rulesetMap[rule.set] = ruleset;
            nex.prog.push(ruleset);
        }
        rulesetMap[rule.set].rules.push(rule);
        rule._markedForDeletion = true;
    })

    nex.prog.filter(prod => prod.type === "RuleModification").forEach(mod => {
        var modRule = rulesetMap[mod.set].rules.find(r => r.name === mod.name)
        modRule.ties.forEach(
            tie => {
                let newTie = mod.ties.find(t => t.tie == tie.tie)
                if (newTie) { tie.link = newTie.link }
            })
        mod.postprocess && (modRule.postprocess = mod.postprocess);
        mod._markedForDeletion = true;
    })

    nex.prog.filter(prod => prod.type === "Ruleset")
        .forEach(set => set.rules.forEach(rule => {
            if (!rule.ties) return;
            let replacements = rule.ties.reduce((acc, tie) => Object.assign(acc, { [tie.tie]: {
                                type: "RulesetRef",
                                token: tie.link
                            }}), {})
            rule.tokens = rule.tokens.map(token => {
                if (token.mixin) {
                    return replacements[token.mixin]
                }
                return token;
            })
            delete rule.ties;
            delete rule.name;
        }))

    nex.prog = nex.prog.filter(prod => !prod._markedForDeletion)

    nex.prog.filter(prod => prod.type === "Ruleset")
        .forEach(set => set.rules.forEach(rule => {
            delete rule.ties;
            delete rule.name;
            delete rule._markedForDeletion;
        }))


    return [nex];

}
