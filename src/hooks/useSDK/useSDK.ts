import { useMemo } from 'react';
import SDK from '@uphold/uphold-sdk-javascript';

export function useSDK(options = {}) {
  const sdk = useMemo(
    () =>
      new SDK({
        baseUrl: 'http://api-sandbox.uphold.com',
        clientId: 'foo',
        clientSecret: 'bar',
        ...options,
      }),
    [options],
  );

  return sdk;
}
