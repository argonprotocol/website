import { describe, expect, it } from 'vitest';
import { decodeAbiParameters, parseAbiParameters, zeroAddress } from 'viem';
import { tradeNetworks, buildSwap, minimumOutput, parseTokenAmount, tradeRoute } from './pool';

const network = tradeNetworks[11155111];
const { argon: ARGN, usdc: USDC, deployment } = network;
const POOL_KEY = deployment!.poolKey;

describe('fixed-pool trades', () => {
  it('preserves precision and rejects silent decimal rounding or overflowing inputs', () => {
    expect(parseTokenAmount('.123456', 6)).toBe(123456n);
    expect(parseTokenAmount('1.000000000000000001', 18)).toBe(1000000000000000001n);
    for (const value of ['0', '-1', '1e2', '1.0000001', 'NaN', (2n ** 128n).toString()]) {
      expect(() => parseTokenAmount(value, 6)).toThrow();
    }
  });

  it('rounds the minimum down without permitting a zero minimum', () => {
    expect(minimumOutput(12345n, 50)).toBe(12283n);
    expect(() => minimumOutput(1n, 100)).toThrow();
    expect(() => minimumOutput(1000n, 10000)).toThrow();
  });

  it.each([true, false])('settles exactly the input and pays the signing wallet (buy=%s)', (zeroForOne) => {
    const route = tradeRoute(network, USDC, zeroForOne);
    const swap = buildSwap({ route, amountIn: 1000000n, minimum: 990000n }, 2000000000n);
    expect(swap.args[0]).toBe('0x10');
    const [actions, parameters] = decodeAbiParameters(parseAbiParameters('bytes, bytes[]'), swap.args[1][0]);
    expect(actions).toBe('0x060c0f');
    const [single] = decodeAbiParameters(
      parseAbiParameters(
        '((address currency0, address currency1, uint24 fee, int24 tickSpacing, address hooks) poolKey, bool zeroForOne, uint128 amountIn, uint128 amountOutMinimum, uint256 minHopPriceX36, bytes hookData)',
      ),
      parameters[0],
    );
    expect(single.poolKey).toEqual(POOL_KEY);
    expect(single.zeroForOne).toBe(zeroForOne);
    expect(single.minHopPriceX36).toBe(0n);
    expect(single.amountIn).toBe(1000000n);
    expect(single.amountOutMinimum).toBe(990000n);
    const input = zeroForOne ? USDC : ARGN;
    const output = zeroForOne ? ARGN : USDC;
    expect(decodeAbiParameters(parseAbiParameters('address, uint256'), parameters[1])).toEqual([
      input.address,
      1000000n,
    ]);
    expect(decodeAbiParameters(parseAbiParameters('address, uint256'), parameters[2])).toEqual([
      output.address,
      990000n,
    ]);
  });

  it.each([true, false])('routes native ETH through USDC and the fixed ARGN hook (buy=%s)', (buying) => {
    const eth = network.additionalTokens.find((token) => token.address === zeroAddress)!;
    const route = tradeRoute(network, eth, buying);
    const amountIn = 10n ** 16n;
    const swap = buildSwap({ route, amountIn, minimum: 42n }, 2000000000n);
    const [commands, inputs] = swap.args;
    const [actions, parameters] = decodeAbiParameters(parseAbiParameters('bytes, bytes[]'), inputs[0]);
    expect(actions).toBe('0x070c0f');
    const [pathSwap] = decodeAbiParameters(
      parseAbiParameters(
        '(address currencyIn, (address intermediateCurrency, uint24 fee, int24 tickSpacing, address hooks, bytes hookData)[] path, uint256[] minHopPriceX36, uint128 amountIn, uint128 amountOutMinimum)',
      ),
      parameters[0],
    );
    const input = buying ? eth : ARGN;
    const output = buying ? ARGN : eth;
    expect(pathSwap.currencyIn).toBe(input.address);
    expect(pathSwap.path.map((hop) => hop.intermediateCurrency)).toEqual([USDC.address, output.address]);
    expect(pathSwap.path[buying ? 1 : 0]).toMatchObject({ hooks: POOL_KEY.hooks, fee: POOL_KEY.fee });
    expect(decodeAbiParameters(parseAbiParameters('address, uint256'), parameters[1])).toEqual([
      input.address,
      amountIn,
    ]);
    expect(decodeAbiParameters(parseAbiParameters('address, uint256'), parameters[2])).toEqual([output.address, 42n]);
    if (buying) {
      expect(swap).toMatchObject({ value: amountIn });
      expect(commands).toBe('0x1004');
      expect(decodeAbiParameters(parseAbiParameters('address, address, uint256'), inputs[1]!)).toEqual([
        zeroAddress,
        '0x0000000000000000000000000000000000000001',
        0n,
      ]);
    } else {
      expect(commands).toBe('0x10');
      expect(swap).not.toHaveProperty('value');
    }
  });
});
