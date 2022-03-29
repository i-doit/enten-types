# Enten Types

Enten Types is a library to create type-safe guards to check the shape of unknown data

## Installation

```bash
npm install @i-doit/enten-types
```

## Guards

You can define the shape of the expected data using the type guards.

The following guards are available:

### isString, isNumber, isBoolean

These guards check if an argument has a specific type.

For example,

```typescript
const data = await fetch('/api/data').then(a => a.json());

if (isNumber(data)) {
  // data is a number
}
```

### isObject

`isObject` checks if an argument is an object.

`isObjectWithShape` checks if it's an object with predefined shape. It receives key-value pairs with guards for each field.

`isMapOf` checks if it's an associative array with all values matching the passed guard.

For example,

```typescript
const isApiEntry = isObjectWithShape({
  id: isString,
  order: isNumber,
  active: isBoolean,
});

const data = await fetch('/api/data').then(a => a.json());

if (isApiEntry(data)) {
  // data has type 
  // {
  //   id: string;
  //   order: number;
  //   active: bool;
  // }
}

if (isMapOf(isApiEntry)(data)) {
  // data has a type Record<string, ApiEntry>
}
```

### isArray

`isArray` checks if an argument is an array.

`isArrayOf` checks if an argument is an array and every element of the array matches the passed guard.

For example,

```typescript
const data = await fetch('/api/data').then(a => a.json());

if (isArrayOf(isApiEntry)(data)) {
  // data has type ApiEntry[]
}
```

### Optional

Optional guard allows you to create a guard that allows undefined.

For example,

```typescript
const isApiEntry = isObjectWithShape({
  id: isString,
  title: optional(isString),
})

// isApiEntry checks if an argument has the shape:
// {
//   id: string;
//   title?: string; 
// }
```

### isExact

isExact checks if the value has exactly the same value as expected.

This can be useful to create the discriminator maps.

```typescript
const isEqFilter = isObjectWithShape({
  operation: isExact<'eq'>('eq'),
  value: isString,
  field: isString
});
// EqFilter has type 
// {
//   operation: 'eq';
//   value: string;
//   field: string;
// }
```

### Extracting the type of the Guard

To retrieve the type that supports guard, you can use `GetType` type:

For example,

```typescript
const isApiEntry = isObjectWithShape({
  id: isString,
  title: isString,
  name: optional(isString),
});

type ApiEntryType = GetType<typeof isApiEntry>;
// ApiEntryType is 
// {
//    id: string;
//    title: string;
//    name: string | undefined;
// }
```

This way you can define your type using the guards.

### OrX and AndX

You can combine guards together using andX or orX:

```typescript
const isIdentifiable = isObjectWithShape({
  id: isString
});
const isUser = andX(isIdentifiable, isObjectWithShape({
  username: string
}));
```

### Composition

You can combine your guards to create new ones:

```typescript
const isApiResponse = isObjectWithShape({
  offset: isNumber,
  total: isNumber,
});
const isUserApiResponse = andX(isApiResponse, isObjectWithShape({
  results: isArrayOf(isUser)
}))

type UserApiResponse = GetType<typeof isUserApiResponse>;
```

### NPM scripts

 - `npm t`: Run test suite
 - `npm start`: Run `npm run build` in watch mode
 - `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
 - `npm run test:prod`: Run linting and generate coverage
 - `npm run build`: Generate bundles and typings, create docs
 - `npm run lint`: Lints code
 - `npm run commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)
