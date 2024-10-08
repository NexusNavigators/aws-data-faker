import type { ARN } from '@aws-sdk/util-arn-parser'
import { validate, build } from '@aws-sdk/util-arn-parser'
import { randomUUID } from 'crypto'
import { describe, test, expect } from 'vitest'
import { createAccountId, createARN, buildARNString, parseArnString } from '../../src/account/index.ts'

describe('createAccountId', () => {
  test('createAccountId will create a valid accountId', () => {
    [...Array(1e3)].forEach(() => expect(createAccountId()).toMatch(/[1-9][0-9]{11}/))
  })
})

describe('createARN', () => {
  test('will provide default values', () => {
    expect(createARN()).toStrictEqual({
      partition: 'aws',
      service: '',
      region: '',
      accountId: '',
      resource: '',
    })
  })

  test('can override defaults', () => {
    const partition = randomUUID()
    const service = randomUUID()
    const region = randomUUID()
    const accountId = randomUUID()
    const resource = randomUUID()
    expect(createARN({
      partition,
      service,
      region,
      accountId,
      resource,
    })).toStrictEqual({
      partition,
      service,
      region,
      accountId,
      resource,
    })
  })
})

describe('buildARNString', () => {
  test.each([
    undefined,
    {},
    {
      partition: randomUUID(),
      service: randomUUID(),
      region: randomUUID(),
      accountId: randomUUID(),
      resource: randomUUID(),
    },
  ])('%# will create an ARN', (input) => {
    expect(() => validate(buildARNString(input))).not.toThrow()
  })
})

describe('parseArnString', () => {
  test('will parse the ARN string', () => {
    const expected: ARN = {
      partition: randomUUID(),
      service: randomUUID(),
      region: randomUUID(),
      accountId: randomUUID(),
      resource: randomUUID(),
    }
    const asString = build(expected)
    expect(parseArnString(asString)).toStrictEqual(expected)
  })
})
