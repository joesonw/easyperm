[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

#Intro

> easy permission and data validation tool.

#Install

`npm install easyperm -S`

#Example

```
const Rule = require('easyperm').Rule;
const user = {
  id: 1234,
  roles: ['admin', 'user'],
};
const order = {
  userId: 1234,
  dishes: [ ... ],
};

// say if you have a page that can only be accessed by admins.
new Rule().if('roles').contains('admin').validate(user); // true

// or you want a order can only be accessed by whom owns it or admin

new Rule().if('order.userId').eq('user.id').or(
  new Rule().if('user.roles').contains('admin')
).validate({ user, order }); // true

```

#API

##Rule

#### if(key: string): RuleCondition
> takes a key and return a RuleCondition object where conditions can be applied.

#### validate(item: Object): Boolean
> validate the item.

#### and(...rule: Array<Rule>): Rule
> takes one or more arguments, internal conditions is 'and', all queries must be true to return true;

#### or(...rule: Array<Rule>): Rule
> takes one or more arguments, internal conditions is 'or', one of the queries or the query applied before `or` statement should be true to return true;


#### not(...rule: Array<Rule>): Rule
> takes one or more arguments, internal conditions is 'and', all queries must be false to return true;
> 

##RuleCondition

> arithematic operators, methods that end with 'Key' means it compares to a referenced value instead the string being passed in.


```
eq                // equal
eqKey
ne                // not equal
neKey
gt                  // greater than
gtKey
gte                 // greater than or equal
gteKey
lt            // less than
ltKey
lte           // less than or equal
lteKey
contains        // contains the (right hand side) value in (left              hand side) array              
containsKey
in            // (left hand side) in (right hand side) array 
inKey
nin           // (left hand side) not in (right hand side)              array 
ninKey
```

[npm-image]: https://img.shields.io/npm/v/easyperm.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/easyperm
[travis-image]: https://img.shields.io/travis/joesonw/easyperm/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/joesonw/easyperm
[coveralls-image]: https://img.shields.io/coveralls/joesonw/easyperm/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/joesonw/easyperm?branch=master
