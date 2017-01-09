// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

function nth(n) {
    return function(d) {
        return d[n];
    };
}


function $(o) {
    return function(d) {
        var ret = {};
        Object.keys(o).forEach(function(k) {
            ret[k] = d[o[k]];
        });
        return ret;
    };
}
var grammar = {
    ParserRules: [
    {"name": "dqstring$ebnf$1", "symbols": []},
    {"name": "dqstring$ebnf$1", "symbols": ["dstrchar", "dqstring$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "dqstring", "symbols": [{"literal":"\""}, "dqstring$ebnf$1", {"literal":"\""}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "sqstring$ebnf$1", "symbols": []},
    {"name": "sqstring$ebnf$1", "symbols": ["sstrchar", "sqstring$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "sqstring", "symbols": [{"literal":"'"}, "sqstring$ebnf$1", {"literal":"'"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "btstring$ebnf$1", "symbols": []},
    {"name": "btstring$ebnf$1", "symbols": [/[^`]/, "btstring$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "btstring", "symbols": [{"literal":"`"}, "btstring$ebnf$1", {"literal":"`"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "dstrchar", "symbols": [/[^\\"\n]/], "postprocess": id},
    {"name": "dstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": 
        function(d) {
            return JSON.parse("\""+d.join("")+"\"");
        }
        },
    {"name": "sstrchar", "symbols": [/[^\\'\n]/], "postprocess": id},
    {"name": "sstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": 
        function(d) {
            return JSON.parse("\""+d.join("")+"\"");
        }
        },
    {"name": "strescape", "symbols": [/["'\\/bfnrt]/], "postprocess": id},
    {"name": "strescape", "symbols": [{"literal":"u"}, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/], "postprocess": 
        function(d) {
            return d.join("");
        }
        },
    {"name": "final", "symbols": ["whit?", "prog", "whit?"], "postprocess": d => ({type: "Program", prog: d[1]})},
    {"name": "prog", "symbols": ["prod"], "postprocess": function(d) { return [d[0]]; }},
    {"name": "prog", "symbols": ["prod", "whit", "prog"], "postprocess": function(d) { return [d[0]].concat(d[2]); }},
    {"name": "prod", "symbols": ["word", "association", "expression+"], "postprocess": function(d) { return { type: "Ruleset", set: d[0], rules: d[2]}; }},
    {"name": "prod", "symbols": ["word", "expr_description", "association", "simpleexpression"], "postprocess": d => Object.assign({ type: "Rule", set: d[0]}, d[3], d[1])},
    {"name": "prod$string$1", "symbols": [{"literal":"m"}, {"literal":"o"}, {"literal":"d"}, {"literal":"i"}, {"literal":"f"}, {"literal":"y"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "prod$ebnf$1$subexpression$1", "symbols": ["association", "simpleexpression"]},
    {"name": "prod$ebnf$1", "symbols": ["prod$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "prod$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "prod", "symbols": ["prod$string$1", "whit", "word", "expr_description", "prod$ebnf$1"], "postprocess": d => Object.assign({ type: "RuleModification", set:d[2]}, d[4] ? d[4][1] : {}, d[3])},
    {"name": "prod", "symbols": ["word", {"literal":"["}, "wordlist", {"literal":"]"}, "association", "expression+"], "postprocess": function(d) {return {type: "MacroDefinition", macro: d[0], args: d[2], exprs: d[8]}}},
    {"name": "prod", "symbols": [{"literal":"@"}, "whit?", "js"], "postprocess": function(d) { return {type: "JavaScriptBlock", body: d[2]}; }},
    {"name": "prod", "symbols": [{"literal":"@"}, "word", "whit", "word"], "postprocess": function(d) { return {type: "Configuration", config: d[1], value: d[3]}; }},
    {"name": "prod$string$2", "symbols": [{"literal":"@"}, {"literal":"i"}, {"literal":"n"}, {"literal":"c"}, {"literal":"l"}, {"literal":"u"}, {"literal":"d"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "prod", "symbols": ["prod$string$2", "whit?", "string"], "postprocess": function(d) {return {type: "Include", include: d[2].literal}}},
    {"name": "prod$string$3", "symbols": [{"literal":"@"}, {"literal":"b"}, {"literal":"u"}, {"literal":"i"}, {"literal":"l"}, {"literal":"t"}, {"literal":"i"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "prod", "symbols": ["prod$string$3", "whit?", "string"], "postprocess": function(d) {return {type: "Builtin", include: d[2].literal}}},
    {"name": "association$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "association$ebnf$1$subexpression$1", "symbols": [{"literal":"="}]},
    {"name": "association$ebnf$1", "symbols": ["association$ebnf$1$subexpression$1"]},
    {"name": "association$ebnf$1$subexpression$2", "symbols": [{"literal":"-"}]},
    {"name": "association$ebnf$1$subexpression$2", "symbols": [{"literal":"="}]},
    {"name": "association$ebnf$1", "symbols": ["association$ebnf$1$subexpression$2", "association$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "association", "symbols": ["whit?", "association$ebnf$1", {"literal":">"}, "whit?"]},
    {"name": "expression+", "symbols": ["completeexpression"]},
    {"name": "expression+", "symbols": ["expression+", "whit?", {"literal":"|"}, "whit?", "completeexpression"], "postprocess": function(d) { return d[0].concat([d[4]]); }},
    {"name": "expressionlist", "symbols": ["completeexpression"]},
    {"name": "expressionlist", "symbols": ["expressionlist", "whit?", {"literal":","}, "whit?", "completeexpression"], "postprocess": function(d) { return d[0].concat([d[4]]); }},
    {"name": "wordlist", "symbols": ["word"]},
    {"name": "wordlist", "symbols": ["wordlist", "whit?", {"literal":","}, "whit?", "word"], "postprocess": function(d) { return d[0].concat([d[4]]); }},
    {"name": "completeexpression", "symbols": ["expr", "whit", "expr_description"], "postprocess": d => Object.assign({type: "Rule", tokens: d[0]}, d[2])},
    {"name": "completeexpression", "symbols": ["expr", "whit", "expr_description", "whit?", "js"], "postprocess": d => Object.assign({type: "Rule", tokens: d[0], postprocess: d[4]}, d[2])},
    {"name": "simpleexpression$ebnf$1", "symbols": ["expr"], "postprocess": id},
    {"name": "simpleexpression$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "simpleexpression", "symbols": ["simpleexpression$ebnf$1"], "postprocess": function(d) { return {tokens: d[0]}; }},
    {"name": "simpleexpression$ebnf$2", "symbols": ["expr"], "postprocess": id},
    {"name": "simpleexpression$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "simpleexpression", "symbols": ["simpleexpression$ebnf$2", "whit?", "js"], "postprocess": function(d) { return {tokens: d[0], postprocess: d[2]}; }},
    {"name": "expr_description$ebnf$1", "symbols": ["tiedef"], "postprocess": id},
    {"name": "expr_description$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "expr_description", "symbols": [{"literal":":"}, "word", "expr_description$ebnf$1"], "postprocess": d => ({name: d[1], ties: d[2] })},
    {"name": "tiedef", "symbols": [{"literal":"("}, "tielist", {"literal":")"}], "postprocess": d => d[1]},
    {"name": "tielist", "symbols": ["tielink"]},
    {"name": "tielist", "symbols": ["tielist", "whit?", {"literal":","}, "whit?", "tielink"], "postprocess": d => d[0].concat([d[4]])},
    {"name": "tielink", "symbols": ["word", "whit?", {"literal":"="}, "whit?", "word"], "postprocess": d => ({type:"Tie", tie: d[0], link: d[4]})},
    {"name": "expr_member", "symbols": ["word"], "postprocess": id},
    {"name": "expr_member", "symbols": [{"literal":"$"}, "word"], "postprocess": function(d) {return { type: "Mixin", mixin: d[1]}}},
    {"name": "expr_member", "symbols": ["word", {"literal":"["}, "expressionlist", {"literal":"]"}], "postprocess": function(d) {return {type:"MacroCall", macrocall: d[0], args: d[2]}}},
    {"name": "expr_member", "symbols": ["string"], "postprocess": id},
    {"name": "expr_member", "symbols": [{"literal":"%"}, "word"], "postprocess": function(d) {return { type:"Token", token: d[1]}}},
    {"name": "expr_member", "symbols": ["charclass"], "postprocess": id},
    {"name": "expr_member", "symbols": [{"literal":"("}, "whit?", "expression+", "whit?", {"literal":")"}], "postprocess": function(d) {return {  type:"SubExpression", 'subexpression': d[2]} ;}},
    {"name": "expr_member", "symbols": ["expr_member", "whit?", "ebnf_modifier"], "postprocess": function(d) {return {  type:"Ebnf", 'ebnf': d[0], 'modifier': d[2]}; }},
    {"name": "ebnf_modifier$string$1", "symbols": [{"literal":":"}, {"literal":"+"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ebnf_modifier", "symbols": ["ebnf_modifier$string$1"], "postprocess": id},
    {"name": "ebnf_modifier$string$2", "symbols": [{"literal":":"}, {"literal":"*"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ebnf_modifier", "symbols": ["ebnf_modifier$string$2"], "postprocess": id},
    {"name": "ebnf_modifier$string$3", "symbols": [{"literal":":"}, {"literal":"?"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ebnf_modifier", "symbols": ["ebnf_modifier$string$3"], "postprocess": id},
    {"name": "expr", "symbols": ["expr_member"]},
    {"name": "expr", "symbols": ["expr", "whit", "expr_member"], "postprocess": function(d){ return d[0].concat([d[2]]); }},
    {"name": "word", "symbols": [/[\w\?\+]/], "postprocess": function(d){ return d[0]; }},
    {"name": "word", "symbols": ["word", /[\w\?\+]/], "postprocess": function(d){ return d[0]+d[1]; }},
    {"name": "string", "symbols": ["dqstring"], "postprocess": function(d) {return { type:"Literal", literal: d[0] }; }},
    {"name": "charclass", "symbols": [{"literal":"."}], "postprocess": function(d) { return { type:"CharClass", regex: "."}; }},
    {"name": "charclass", "symbols": [{"literal":"["}, "charclassmembers", {"literal":"]"}], "postprocess": function(d) { return { type:"CharClass", regex: "[" + d[1].join('') + "]" }; }},
    {"name": "charclassmembers", "symbols": []},
    {"name": "charclassmembers", "symbols": ["charclassmembers", "charclassmember"], "postprocess": function(d) { return d[0].concat([d[1]]); }},
    {"name": "charclassmember", "symbols": [/[^\\\]]/], "postprocess": function(d) { return d[0]; }},
    {"name": "charclassmember", "symbols": [{"literal":"\\"}, /./], "postprocess": function(d) { return d[0] + d[1]; }},
    {"name": "js", "symbols": [{"literal":"{"}, {"literal":"%"}, "jscode", {"literal":"%"}, {"literal":"}"}], "postprocess": function(d) { return {type:"JavaScript", script: d[2]}; }},
    {"name": "jscode", "symbols": [], "postprocess": function() {return "";}},
    {"name": "jscode", "symbols": ["jscode", /[^%]/], "postprocess": function(d) {return d[0] + d[1];}},
    {"name": "jscode", "symbols": ["jscode", {"literal":"%"}, /[^}]/], "postprocess": function(d) {return d[0] + d[1] + d[2]; }},
    {"name": "whit", "symbols": ["whitraw"]},
    {"name": "whit", "symbols": ["whitraw?", "comment", "whit?"]},
    {"name": "whit?", "symbols": []},
    {"name": "whit?", "symbols": ["whit"]},
    {"name": "whitraw", "symbols": [/[\s]/]},
    {"name": "whitraw", "symbols": ["whitraw", /[\s]/]},
    {"name": "whitraw?", "symbols": []},
    {"name": "whitraw?", "symbols": ["whitraw"]},
    {"name": "comment", "symbols": [{"literal":"#"}, "commentchars", {"literal":"\n"}]},
    {"name": "commentchars", "symbols": []},
    {"name": "commentchars", "symbols": ["commentchars", /[^\n]/]}
]
  , ParserStart: "final"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
