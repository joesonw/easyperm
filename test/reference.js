/*
* @Author: Qiaosen Huang
* @Date:   2016-10-28 11:23:15
* @Last Modified by:   Qiaosen Huang
* @Last Modified time: 2016-10-28 15:27:09
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
    userIds: [1 ,2 , 3, 1234],
};


describe('test with referenced keys', () => {
    it('should validate eq', () => {
        assert.equal(new Rule().if('user.id').eqKey('resource.userId')
            .validateWith({ user: user, resource: resource }), true);
    });
    it('should not validate ne', () => {
        assert.equal(new Rule().if('user.id').eqKey('resource.age20')
            .validateWith({ user: user, resource: resource }), false);
    });
    it('should validate ne', () => {
        assert.equal(new Rule().if('user.id').neKey('resource.userId')
            .validateWith({ user: user, resource: resource }), false);
    });
    it('should validate gt', () => {
       assert.equal(new Rule().if('user.age').gtKey('resource.age20')
            .validateWith({ user: user, resource: resource }), true);
    });
    it('should validate gte', () => {
        assert.equal(new Rule().if('user.age').gteKey('resource.age30')
            .validateWith({ user: user, resource: resource }), true);
    });
    it('should validate lt', () => {
        assert.equal(new Rule().if('user.age').ltKey('resource.age30')
            .validateWith({ user: user, resource: resource }), false);
    });
    it('should validate lte', () => {
        assert.equal(new Rule().if('user.age').lteKey('resource.age30')
            .validateWith({ user: user, resource: resource }), true);
    });
    it('should validate in', () => {
        assert.equal(new Rule().if('user.id').inKey('resource.userIds')
            .validateWith({ user: user, resource: resource }), true);
    });
    it('should validate nin', () => {
        assert.equal(new Rule().if('user.id').ninKey('resource.userIds')
            .validateWith({ user: user, resource: resource }), false);
    });
    it('should validate non-reference value', () => {
        assert.equal(new Rule().if('user.id').eq(1234)
            .validateWith({ user: user, resource: resource }), true);
    });
});