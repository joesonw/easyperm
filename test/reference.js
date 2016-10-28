/*
* @Author: Qiaosen Huang
* @Date:   2016-10-28 11:23:15
* @Last Modified by:   Qiaosen Huang
* @Last Modified time: 2016-10-28 16:27:51
*/

'use strict';

const Rule = require('../src').Rule;
const assert = require('chai').assert;

const user =  {
    id: 1234,
    age: 30,
    roles: ['admin', 'user'],
};

const resource = {
    userId: 1234,
    age20: 20,
    age30: 30,
    userIds: [1 ,2 , 3, 1234],
};


describe('test with referenced keys', () => {
    it('should validate eqKey', () => {
        assert.equal(new Rule().if('user.id').eqKey('resource.userId')
            .validate({ user: user, resource: resource }), true);
    });
    it('should not validate ne', () => {
        assert.equal(new Rule().if('user.id').eqKey('resource.age20')
            .validate({ user: user, resource: resource }), false);
    });
    it('should validate neKey', () => {
        assert.equal(new Rule().if('user.id').neKey('resource.userId')
            .validate({ user: user, resource: resource }), false);
    });
    it('should validate gtKey', () => {
       assert.equal(new Rule().if('user.age').gtKey('resource.age20')
            .validate({ user: user, resource: resource }), true);
    });
    it('should validate gteKey', () => {
        assert.equal(new Rule().if('user.age').gteKey('resource.age30')
            .validate({ user: user, resource: resource }), true);
    });
    it('should validate ltKey', () => {
        assert.equal(new Rule().if('user.age').ltKey('resource.age30')
            .validate({ user: user, resource: resource }), false);
    });
    it('should validate lteKey', () => {
        assert.equal(new Rule().if('user.age').lteKey('resource.age30')
            .validate({ user: user, resource: resource }), true);
    });
    it('should validate inKey', () => {
        assert.equal(new Rule().if('user.id').inKey('resource.userIds')
            .validate({ user: user, resource: resource }), true);
    });
    it('should validate ninKey', () => {
        assert.equal(new Rule().if('user.id').ninKey('resource.userIds')
            .validate({ user: user, resource: resource }), false);
    });
    it('should validate containsKey', () => {
        assert.equal(new Rule().if('resource.userIds').containsKey('user.id')
            .validate({ user: user, resource: resource }), true);
    })
    it('should validate nonKey-reference value', () => {
        assert.equal(new Rule().if('user.id').eq(1234)
            .validate({ user: user, resource: resource }), true);
    });
});