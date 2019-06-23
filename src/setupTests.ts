import expect from 'expect'
import fetchMock from 'fetch-mock';
import 'isomorphic-fetch';

// https://www.wheresrhys.co.uk/fetch-mock/
// If your Request object is not an instance of the Request constructor
// used by fetch-mock you need to set a reference to the request class.
fetchMock.config.Request = Request;

interface TestResponse {
  pass: boolean;
  message: { (): string };
}

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  /**
   * Enable custom assertions with all jest tests.
   *
   * Samples usage:
   *
   * expect(condition).myCustomAssertion()
   */
  namespace jest {
    interface Matchers<R> {
      toEqualWithMessage(expected: any, inputCase: string): R;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

expect.extend({
  /**
   * Checks for equality and provides an additional context message
   * to associate with test failures. We use this for parameterized
   * testing to provide similar test practices to Go.
   *
   * Jest officially provides `test.each` for parameterized testing
   * but this does not work with TypeScript as it the values for the
   * table test (submitted as an array) will have an OR type. For example,
   * values: `['foobar', true]` takes the type of `number | boolean`
   * which breaks the type requirement for a function that expects
   * an input type of `number`.
   */
  toEqualWithMessage(received: any, expected: any, inputCase: string): TestResponse {
    if (received === expected) {
      return {
        pass: true,
        message: (): string => `'${inputCase}' should pass`,
      };
    }

    return {
      pass: false,
      message: (): string => `'${inputCase}' should fail`,
    };
  },
});
