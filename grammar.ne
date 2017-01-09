# nearley grammar
@builtin "string.ne"

final -> whit? prog whit?  {% d => ({type: "Program", prog: d[1]}) %}

prog -> prod  {% function(d) { return [d[0]]; } %}
      | prod whit prog  {% function(d) { return [d[0]].concat(d[2]); } %}

prod -> word association expression+                                            {% function(d) { return { type: "Ruleset", set: d[0], rules: d[2]}; } %}
      | word expr_description association simpleexpression                      {% d => Object.assign({ type: "Rule", set: d[0]}, d[3], d[1]) %}
      | "modify" whit word expr_description (association simpleexpression):?    {% d => Object.assign({ type: "RuleModification", set:d[2]}, d[4] ? d[4][1] : {}, d[3]) %}
      | word "[" wordlist "]" association expression+                           {% function(d) {return {type: "MacroDefinition", macro: d[0], args: d[2], exprs: d[8]}} %}
      | "@" whit? js                                                            {% function(d) { return {type: "JavaScriptBlock", body: d[2]}; } %}
      | "@" word whit word                                                      {% function(d) { return {type: "Configuration", config: d[1], value: d[3]}; } %}
      | "@include"  whit? string                                                {% function(d) {return {type: "Include", include: d[2].literal}} %}
      | "@builtin"  whit? string                                                {% function(d) {return {type: "Builtin", include: d[2].literal}} %}

association ->
      whit? ("-"|"="):+ ">" whit?

expression+ -> completeexpression
             | expression+ whit? "|" whit? completeexpression  {% function(d) { return d[0].concat([d[4]]); } %}

expressionlist -> completeexpression
             | expressionlist whit? "," whit? completeexpression {% function(d) { return d[0].concat([d[4]]); } %}

wordlist -> word
            | wordlist whit? "," whit? word {% function(d) { return d[0].concat([d[4]]); } %}

completeexpression -> expr whit expr_description {% d => Object.assign({type: "Rule", tokens: d[0]}, d[2]) %}
                    | expr whit expr_description whit? js {% d => Object.assign({type: "Rule", tokens: d[0], postprocess: d[4]}, d[2]) %}

simpleexpression -> expr:?  {% function(d) { return {tokens: d[0]}; } %}
                  | expr:? whit? js  {% function(d) { return {tokens: d[0], postprocess: d[2]}; } %}

expr_description ->
      ":" word tiedef:? {% d => ({name: d[1], ties: d[2] }) %}

tiedef -> 
      "(" tielist ")" {% d => d[1] %}

tielist ->
      tielink
    | tielist whit? "," whit? tielink {% d => d[0].concat([d[4]]) %}

tielink ->
      word whit? "=" whit? word {% d => ({type:"Tie", tie: d[0], link: d[4]}) %}

expr_member ->
      word {% id %}
    | "$" word {% function(d) {return { type: "Mixin", mixin: d[1]}} %}
    | word "[" expressionlist "]" {% function(d) {return {type:"MacroCall", macrocall: d[0], args: d[2]}} %} 
    | string {% id %}
    | "%" word {% function(d) {return { type:"Token", token: d[1]}} %}
    | charclass {% id %}
    | "(" whit? expression+ whit? ")" {% function(d) {return {  type:"SubExpression", 'subexpression': d[2]} ;} %}
    | expr_member whit? ebnf_modifier {% function(d) {return {  type:"Ebnf", 'ebnf': d[0], 'modifier': d[2]}; } %}

ebnf_modifier -> ":+" {% id %} | ":*" {% id %} | ":?" {% id %}

expr -> expr_member
      | expr whit expr_member  {% function(d){ return d[0].concat([d[2]]); } %}

word -> [\w\?\+]  {% function(d){ return d[0]; } %}
      | word [\w\?\+]  {% function(d){ return d[0]+d[1]; } %}

string -> dqstring {% function(d) {return { type:"Literal", literal: d[0] }; } %}
#string -> "\"" charset "\""  {% function(d) { return { literal: d[1].join("") }; } %}
#
#charset -> null
#         | charset char  {% function(d) { return d[0].concat([d[1]]); } %}
#
#char -> [^\\"]  {% function(d) { return d[0]; } %}
#      | "\\" .  {% function(d) { return JSON.parse("\""+"\\"+d[1]+"\""); } %}

charclass -> "."  {% function(d) { return { type:"CharClass", regex: "."}; } %}
           | "[" charclassmembers "]"  {% function(d) { return { type:"CharClass", regex: "[" + d[1].join('') + "]" }; } %}

charclassmembers -> null
                  | charclassmembers charclassmember  {% function(d) { return d[0].concat([d[1]]); } %}

charclassmember -> [^\\\]]  {% function(d) { return d[0]; } %}
                 | "\\" .  {% function(d) { return d[0] + d[1]; } %}

js -> "{" "%" jscode "%" "}"  {% function(d) { return {type:"JavaScript", script: d[2]}; } %}

jscode -> null  {% function() {return "";} %}
        | jscode [^%]  {% function(d) {return d[0] + d[1];} %}
        | jscode "%" [^}] {% function(d) {return d[0] + d[1] + d[2]; } %}

# Whitespace with a comment
whit -> whitraw
      | whitraw? comment whit?

# Optional whitespace with a comment
whit? -> null
       | whit

# Literally a string of whitespace
whitraw -> [\s]
         | whitraw [\s]

# A string of whitespace OR the empty string
whitraw? -> null
          | whitraw

comment -> "#" commentchars "\n"
commentchars -> null
              | commentchars [^\n]