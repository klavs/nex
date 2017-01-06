@{%
	function SomeJavascipt(){}
%}

Math ->
      _ AddSub _ {% js in ruleset %}

AddSub ->
	  AddSub _ "+" _ float {% js in rule modification %}
	| AddSub _ "-" _ float
	| float


float -> 
	  int "." int
	| int

int -> 
	  [0-9]:+

_ -> 
	  [\s]:*

Exponent ->
      Parentheses _ "**" _ $Exponent {% js in rule %}