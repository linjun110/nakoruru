var assert = require('assert'),
 should = require('should'),
 add = require('../src/add');

describe('framework',function () {
	it('1+1=2',function () {
		assert.equal(2,1+1);
		"2".should.eql(add(1));
		"0".should.eql(add());
	});
});