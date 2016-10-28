/*
* @Author: Qiaosen Huang
* @Date:   2016-10-28 11:34:46
* @Last Modified by:   Qiaosen Huang
* @Last Modified time: 2016-10-28 15:51:04
*/

'use strict';
const _ = require('lodash');

const RuleConditionMethods = [
    'gt',
    'gte',
    'lt',
    'lte',
    'eq',
    'ne',

    'gtKey',
    'gteKey',
    'ltKey',
    'lteKey',
    'eqKey',
    'neKey',

    'in',
    'nin',
    'inKey',
    'ninKey',
];

const RuleConditionLogicMethods = [
    'or',
    'and',
];

function Rule() {
    this._query = [];

    for (const method of RuleConditionLogicMethods) {
        this[method] = function() {
            const query  = [];
            for (let i = 0; i < arguments.length; i++) {
                query.push(arguments[i]._query);
            }
            const r = new Rule();
            this._query.push({
                key: '',
                logic: true,
                operator: method,
                value: query,
            });
            return this;
        }
    }
}
module.exports = Rule;

Rule.prototype.if = function (key) {
    return new RuleCondition(key, this._query);
}

Rule.prototype._validate = function _validate(lhs, operator, rhs) {
    switch (operator) {
        case 'eq':
            return lhs === rhs;
        case 'ne':
            return lhs !== rhs;
        case 'gt':
            return lhs > rhs;
        case 'gte':
            return lhs >= rhs;
        case 'lt':
            return lhs < rhs;
        case 'lte':
            return  lhs <= rhs;
        case 'in':
            return rhs.indexOf(lhs) !== -1;
        case 'nin':
            return rhs.indexOf(lhs) === -1;
    }
}

Rule.prototype._recursiveParse = function (rule, parse) {
    const result = rule.value.map(rule => parse(rule));
    switch (rule.operator) {
        case 'and':
            return result.length === result.filter(bool => bool).length;
        case 'or':
            return result.filter(bool => bool).length > 0;
    }
}

Rule.prototype.validate = function (item) {
    const parse = (query) => {
        const normalQuery = query.filter(q => !q.logic);
        const logicQuery = query.filter(q => q.logic);
        let flag = true;
        for (const rule of normalQuery) {
            const lhs = _.get(item, rule.key);
            if (rule.operator.substr(-3) === 'Key') {
                if (!this._validate(lhs, rule.operator.substr(0, rule.operator.length - 3), _.get(item, rule.value))) {
                    flag = false;
                }
            } else {
                if (!this._validate(lhs, rule.operator, rule.value)) {
                    flag = false;
                }
            }
        }
        for (const rule of logicQuery) {
            const result = this._recursiveParse(rule, parse);
            switch (rule.operator) {
                case 'or':
                    return flag || result;
                case 'and':
                    return flag && result;
            }
        }
        return flag;
    }

    
    return parse(this._query);
}

Rule.prototype.validateWith = function (items) {
    const parse = (query) => {
        let flag = true;
        const normalQuery = query.filter(q => !q.logic);
        const logicQuery = query.filter(q => q.logic);
        
        for (const rule of normalQuery) {
            const lhs = _.get(items, rule.key);
            if (rule.operator.substr(-3) === 'Key') {
                if (!this._validate(lhs, rule.operator.substr(0, rule.operator.length - 3), _.get(items, rule.value))) {
                    flag = false;
                }
            } else {
                if (!this._validate(lhs, rule.operator, rule.value)) {
                    flag = false;
                }
            }
        }
        for (const rule of logicQuery) {
            const result = this._recursiveParse(rule, parse);
            switch (rule.operator) {
                case 'or':
                    return flag || result;
                case 'and':
                    return flag && result;
            }
        }
        return flag;
    }
    return parse(this._query);
}

function RuleCondition(key, query) {
    this._key = key;
    this._query = query;

    for (const method of RuleConditionMethods) {
        this[method] = function(value) {
            const r = new Rule();
            this._query.push({ key: this._key, operator: method, value: value });
            r._query = this._query;
            return r;
        }
    }
}

