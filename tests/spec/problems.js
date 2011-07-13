beforeEach(function() {
	this.addMatchers({
		syntaxCorrect: function() {
			var pieces = this.actual.split('$$');

			// check the LaTeX is properly terminated
			if((pieces.length % 2) != 1)
				return false;

			// in each LaTeX piece, check curly braces match
			for(var i = 1; i < pieces.length; i += 2)
			{
				var s = pieces[i];
				var nesting = 0;

				for(var j = 0; j < s.length; j++)
				{
					switch(s.charAt(j))
					{
						case '{':
							nesting += 1;
							break;
						case '}':
							nesting -= 1;
							if(nesting < 0)
								return false;
							break;
						default:
							break;
					}
				}

				if(nesting != 0)
					return false;
			}

			return true;
		}
	});
});

var makers = [
	'makePartial',
	'makeBinomial2',
	'makePolyInt',
	'makeTrigInt',
	'makeVector',
	'makeLines',
	'makeIneq',
	'makeAP',
	'makeFactor',
	'makeQuadratic',
	'makeComplete',
	'makeBinExp',
	'makeLog',
	'makeStationary',
	'makeTriangle',
	'makeCircle',
	'makeSolvingTrig',
	'makeVectorEq',
	'makeImplicit',
	'makeChainRule',
	'makeProductRule',
	'makeQuotientRule',
	'makeGP',
	'makeModulus',
	'makeTransformation',
	'makeComposition',
	'makeParametric',
	'makeImplicitFunction',
	'makeIntegration',
	'makeDE',
	'makePowers',
	'makeCArithmetic',
	'makeCPolar',
	'makeDETwoHard',
	'makeMatrix2',
	'makeTaylor',
	'makePolarSketch',
	'makeMatrix3',
	'makeFurtherVector',
	'makeNewtonRaphson',
	'makeFurtherIneq',
	'makeSubstInt',
	'makeRevolution',
	'makeMatXforms',
	'makeDiscreteDistn',
	'makeContinDistn',
	'makeHypTest',
	'makeConfidInt',
	'makeChiSquare',
	'makeProductMoment'
];

for(k = 0; k < makers.length; k++)
{
	describe(makers[k], function() {
		var qa;
		var i = k; // bypass call-by-name

		beforeEach(function() {
			qa = window[makers[i]]();
		});

		it("should produce correct LaTeX", function() {
			expect(qa[0]).syntaxCorrect();
			expect(qa[1]).syntaxCorrect();
		});
	});
}
