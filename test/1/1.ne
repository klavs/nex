@{%
	function SomeJavascipt(){}
%}

Math ->
      _ AddSub _ {% js in ruleset %}

AddSub ->
	  float _ "+" _ float
	| float _ "-" _ float
	| float


float -> 
	  int "." int
	| int

int -> 
	  [0-9]:+

_ -> 
	  [\s]:*