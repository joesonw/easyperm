/*
* @Author: Qiaosen Huang
* @Date:   2016-10-28 11:23:15
* @Last Modified by:   Qiaosen Huang
* @Last Modified time: 2016-10-28 15:53:05
*/

'use strict';

const Rule = require('../src').Rule;
const assert = require('chai').assert;

const user =  {
    id: 1234,
    age: 30,
};

const resource = {
    userId: 1234,
    age20: 20,
    age30: 30,
};

describe('test logic operators', () => {
    it('should validate and-1', () => {
        assert.equal(new Rule().and(new Rule().if('id').eq(1234), new Rule().if('age').eq(30)).validate(user), true);
    });
    it('should validate and-2', () => {
        assert.equal(new Rule().if('id').eq(1234).and(new Rule().if('age').eq(30)).validate(user), true);
    });
    it('should validate and-3', () => {
        assert.equal(new Rule().if('id').eq(1234).and(new Rule().if('age').eq(30).and(new Rule().if('age').ne(31))).validate(user), true);
    });

    it('should not validate and-1', () => {
        assert.equal(new Rule().and(new Rule().if('id').eq(1234), new Rule().if('age').eq(31)).validate(user), false);
    });
    it('should not validate and-2', () => {
        assert.equal(new Rule().if('id').eq(1234).and(new Rule().if('age').eq(31)).validate(user), false);
    });
    it('should not validate and-3', () => {
        assert.equal(new Rule().if('id').eq(1234).and(new Rule().if('age').eq(30).and(new Rule().if('age').eq(31))).validate(user), false);
    });

    it('should validate or-1', () => {
        assert.equal(new Rule().or(new Rule().if('id').eq(1234), new Rule().if('age').eq(20)).validate(user), true);
    });
    it('should validate or-2', () => {
        assert.equal(new Rule().if('id').eq(123).or(new Rule().if('age').eq(30)).validate(user), true);
    });
    it('should validate or-3', () => {
        assert.equal(new Rule().if('id').eq(123).or(new Rule().if('age').eq(31).or(new Rule().if('age').eq(30))).validate(user), true);
    });
    it('should validate complex logic query-1', () => {
        assert.equal(new Rule().if('id').eq(1234).and(
                new Rule().if('age').eq(31).or(
                    new Rule().if('age').eq(30)
                )
            ).validate(user), true);
    });

    it('should work with references-1', () => {
        assert.equal(new Rule().and(
            new Rule().if('user.id').eqKey('resource.userId'),
            new Rule().if('user.age').eqKey('resource.age30')
        )
        .validateWith({ user: user, resource: resource }),
        true);
    });

    it('should work with references-2', () => {
        assert.equal(new Rule().if('user.age').eqKey('resource.userId').or(
            new Rule().if('user.id').eq(1234)
        )
        .validateWith({ user: user, resource: resource }),
        true);
    });

});