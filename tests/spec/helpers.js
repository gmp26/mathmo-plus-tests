describe('gcd', function() {
	var n, m;

	beforeEach(function() {
		n = randnz(3);
		m = randnz(3);
	});

	// the main idea being if someone refactors they make sure not to
	// divide by zero
	it('should behave when given 0', function() {
		var an = Math.abs(n);
		expect(gcd(n,0)).toEqual(an);
		expect(gcd(0,n)).toEqual(an);
		expect(gcd(0,0)).toEqual(0);
	});

	// ring-theoretic gcd is only defined up to associates, so let's formalise
	// our intention to always pick the positive one.
	it('should be positive', function() {
		expect(gcd(n,m)).toBeGreaterThan(0);
	});

	// you'd admittedly have to do something completely stupid to fail
	// these
	it('should have gcd(n,n) = n', function() {
		expect(gcd(n,n)).toEqual(Math.abs(n));
	});
	it('should divide both arguments', function() {
		var d = gcd(n,m);
		expect(n % d).toEqual(0);
		expect(m % d).toEqual(0);
	});
});
