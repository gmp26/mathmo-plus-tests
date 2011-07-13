beforeEach(function() {
	this.addMatchers({
		equals: function(other) {
			return this.actual.equals(other)
		}
	});
});

describe("frac", function() {
	var a;

	beforeEach(function() {
		a = randfrac(20);
	});

	it("should be in lowest terms", function() {
		expect(gcd(a.top, a.bot)).toEqual(1);
	});

	it("should equal itself", function() {
		expect(a).equals(a);
	});

	it("should equal its clone", function() {
		expect(a).equals(a.clone());
	});

	it("should not equal its clone plus 1", function() {
		expect(a).not.equals(a.clone().add(1,1))
	});
});

describe("fmatrix", function() {
	var one, zero;
	var eye;
	var a, b;

	beforeEach(function () {
		one = new frac(1,1);
		zero = new frac(0,1);
		eye = new fmatrix(3);
		a = new fmatrix(3);
		b = new fmatrix(3);
		eye.set(one,zero,zero,zero,one,zero,zero,zero,one);
		a.setrand(4);
		b.setrand(4);
	});

	describe("identity matrix", function() {
		it("should have trace = dim", function() {
			var df = new frac(eye.dim);
			expect(eye.tr()).equals(df);
		});

		it("should have det = 1", function() {
			expect(eye.det()).equals(one);
		});
	});

	describe("determinant", function() {
		it("should be a homomorphism", function() {
			var c = b.times(a);
			expect(c.det()).equals(b.det().prod(a.det()));
		});
	});

	describe("transpose", function() {
		var t;

		beforeEach(function () {
			t = a.T();
		});

		it("should have the same det+trace", function() {
			expect(t.det()).equals(a.det());
			expect(t.tr()).equals(a.tr());
		});
	});
});
