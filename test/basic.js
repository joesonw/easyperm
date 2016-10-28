/*
* @Author: Qiaosen Huang
* @Date:   2016-10-28 11:23:15
* @Last Modified by:   Qiaosen Huang
* @Last Modified time: 2016-10-28 16:17:05
*/

'use strict';

const Rule = require('../src').Rule;
const assert = require('chai').assert;

const user =  {
    id: 1234,
    roles: ['admin', 'user'],
    info: {
        age: 30,
    }
};

describe('test basic if statement', () => {
    it('should validate eq', () => {
        assert.equal(new Rule().if('id').eq(1234).validate(user), true);
        assert.equal(new Rule().if('id').eqKey('id').validate(user), true);
    });
    it('should validate ne', () => {
        assert.equal(new Rule().if('info.age').ne(29).validate(user), true);
    });
    it('should not validate ne', () => {
        assert.equal(new Rule().if('info.age').ne(30).validate(user), false);
    });
    it('should validate gt', () => {
        assert.equal(new Rule().if('info.age').gt(29).validate(user), true);
    });
    it('should validate gte', () => {
        assert.equal(new Rule().if('info.age').gte(30).validate(user), true);
    });
    it('should validate lt', () => {
        assert.equal(new Rule().if('info.age').lt(31).validate(user), true);
    });
    it('should validate lte', () => {
        assert.equal(new Rule().if('info.age').lte(30).validate(user), true);
    });
    it('should validate in', () => {
        assert.equal(new Rule().if('id').in([1, 2, 3, 1234]).validate(user), true);
    });
    it('should validate nin', () => {
        assert.equal(new Rule().if('id').nin([1, 2, 3, 4]).validate(user), true);
    });
    it('should validate contains', () => {
        assert.equal(new Rule().if('roles').contains('admin').validate(user), true);
    });
});