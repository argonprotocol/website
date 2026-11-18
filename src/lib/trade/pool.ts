import { EvmContracts } from '@argonprotocol/mainchain';
import { Actions, URVersion, V4Planner } from '@uniswap/v4-sdk';
import {
  createPublicClient,
  encodeAbiParameters,
  encodeFunctionData,
  erc20Abi,
  http,
  parseAbi,
  parseAbiParameters,
  parseUnits,
  zeroAddress,
  type Address,
  type Chain,
  type Hex,
  type ContractFunctionArgs,
  type TypedDataDefinition,
} from 'viem';
import { mainnet, sepolia } from 'viem/chains';

type PoolKey = ContractFunctionArgs<typeof quoterAbi, 'nonpayable', 'quoteExactInputSingle'>[0]['poolKey'];

export type TradeToken = {
  symbol: string;
  address: Address;
  decimals: number;
  usdcPool?: Pick<PoolKey, 'fee' | 'tickSpacing'>;
};

export type TradeNetwork = {
  chain: Chain;
  rpcUrl: string;
  usdc: TradeToken;
  argon: TradeToken;
  additionalTokens: TradeToken[];
  deployment: { router: Address; permit2: Address; quoter: Address; poolId: Hex; poolKey: PoolKey };
};

const eth: TradeToken = {
  symbol: 'ETH',
  address: zeroAddress,
  decimals: 18,
  usdcPool: { fee: 500, tickSpacing: 10 },
};

export const tradeNetworks: Record<1 | 11155111, TradeNetwork> = {
  1: {
    chain: mainnet,
    rpcUrl: 'https://ethereum-rpc.publicnode.com',
    usdc: { symbol: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6 },
    argon: { symbol: 'ARGN', address: '0xf3D6b714dc93bc6C44bc766cc92F4A0D99344932', decimals: 18 },
    additionalTokens: [
      eth,
      {
        symbol: 'WETH',
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        decimals: 18,
        usdcPool: { fee: 500, tickSpacing: 10 },
      },
      {
        symbol: 'USDT',
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        decimals: 6,
        usdcPool: { fee: 100, tickSpacing: 1 },
      },
      {
        symbol: 'DAI',
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        decimals: 18,
        usdcPool: { fee: 100, tickSpacing: 1 },
      },
      {
        symbol: 'WBTC',
        address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        decimals: 8,
        usdcPool: { fee: 500, tickSpacing: 10 },
      },
    ],
    deployment: {
      router: '0x23617e59A5925b2A4Bf75d73ff6711cD0b29De85',
      permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
      quoter: '0x55eCE398dDFaeE1f288983AbDE62E41E70Cf3E8A',
      poolId: '0x2fced7804240f9ab33b86f67ee9301650fee8d547bfbf437ce01860839b9772e',
      poolKey: {
        currency0: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        currency1: '0xf3D6b714dc93bc6C44bc766cc92F4A0D99344932',
        fee: 8388608,
        tickSpacing: 10,
        hooks: '0x75A9F59B46Df9f21dA2B5F42747fA3B363Da5a80',
      },
    },
  },
  11155111: {
    chain: sepolia,
    rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com',
    usdc: { symbol: 'USDC', address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', decimals: 6 },
    argon: { symbol: 'ARGN', address: '0xa1a1e87614B1f447fD8E65c18DCc41bAd4A7A1E5', decimals: 18 },
    additionalTokens: [
      eth,
      {
        symbol: 'WETH',
        address: '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9',
        decimals: 18,
        usdcPool: { fee: 500, tickSpacing: 60 },
      },
    ],
    deployment: {
      router: '0x7E4f6c5e954Da5c61B3423D81E2277431Ac043f3',
      permit2: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
      quoter: '0xF6e3C0bb5d59E60fE94649cA3292e1014cDbc878',
      poolId: '0x0b00e532c5f16dfbd1fa4793b09c46c39e3df577d10ddda214cb3bdaf03df930',
      poolKey: {
        currency0: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
        currency1: '0xa1a1e87614B1f447fD8E65c18DCc41bAd4A7A1E5',
        fee: 8388608, // Dynamic-fee flag; the hook chooses the fee.
        tickSpacing: 10,
        hooks: '0x6D6DDA562A1Cd149047A7b55091399f18c5d9a80',
      },
    },
  },
};
export const tradeClients = {
  1: createPublicClient({ chain: mainnet, transport: http(tradeNetworks[1].rpcUrl) }),
  11155111: createPublicClient({ chain: sepolia, transport: http(tradeNetworks[11155111].rpcUrl) }),
};
export const QUOTE_LIFETIME = 30_000;
export const APPROVAL_LIFETIME = 600;

export const permit2Abi = parseAbi([
  'function approve(address token, address spender, uint160 amount, uint48 expiration)',
  'function allowance(address owner, address token, address spender) view returns (uint160 amount, uint48 expiration, uint48 nonce)',
]);
export const permit2Types = {
  PermitSingle: [
    { name: 'details', type: 'PermitDetails' },
    { name: 'spender', type: 'address' },
    { name: 'sigDeadline', type: 'uint256' },
  ],
  PermitDetails: [
    { name: 'token', type: 'address' },
    { name: 'amount', type: 'uint160' },
    { name: 'expiration', type: 'uint48' },
    { name: 'nonce', type: 'uint48' },
  ],
} as const;
export type PermitSingle = TypedDataDefinition<typeof permit2Types, 'PermitSingle'>['message'];
export const permit2PermitParameters = parseAbiParameters(
  '((address token, uint160 amount, uint48 expiration, uint48 nonce) details, address spender, uint256 sigDeadline), bytes',
);
export const routerAbi = parseAbi([
  'function execute(bytes commands, bytes[] inputs, uint256 deadline) payable',
  'error ExecutionFailed(uint256 commandIndex, bytes message)',
  'error V4TooLittleReceived(uint256 minAmountOutReceived, uint256 amountReceived)',
]);
export const quoterAbi = EvmContracts.uniswapV4PriceQuoterAbi;

type SwapHop = { poolKey: PoolKey; zeroForOne: boolean };
type TradeRoute = readonly [SwapHop] | readonly [SwapHop, SwapHop];

export type TradeQuote = {
  route: TradeRoute;
  amountIn: bigint;
  amountOut: bigint;
  minimum: bigint;
  expiresAt: number;
  blockNumber: bigint;
};

export function tradeRoute(network: TradeNetwork, counterToken: TradeToken, buying: boolean): TradeRoute {
  const poolKey = network.deployment.poolKey;
  const usdcIsCurrency0 = poolKey.currency0.toLowerCase() === network.usdc.address.toLowerCase();
  const argonHop = { poolKey, zeroForOne: buying === usdcIsCurrency0 };
  if (!counterToken.usdcPool) return [argonHop];

  const counterIsCurrency0 = BigInt(counterToken.address) < BigInt(network.usdc.address);
  const usdcHop = {
    poolKey: {
      currency0: counterIsCurrency0 ? counterToken.address : network.usdc.address,
      currency1: counterIsCurrency0 ? network.usdc.address : counterToken.address,
      ...counterToken.usdcPool,
      hooks: zeroAddress,
    },
    zeroForOne: buying === counterIsCurrency0,
  };
  return buying ? [usdcHop, argonHop] : [argonHop, usdcHop];
}

export function parseTokenAmount(text: string, decimals: number) {
  if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(text)) throw new Error('amount');
  if ((text.split('.')[1]?.length ?? 0) > decimals) throw new Error('precision');
  if (text.length > 100) throw new Error('amount');
  const amount = parseUnits(text, decimals);
  if (amount <= 0n || amount >= 2n ** 128n) throw new Error('amount');
  return amount;
}

export function minimumOutput(amountOut: bigint, slippageBps: number) {
  if (![10, 50, 100].includes(slippageBps)) throw new Error('slippage');
  const minimum = (amountOut * BigInt(10000 - slippageBps)) / 10000n;
  if (minimum <= 0n || minimum >= 2n ** 128n) throw new Error('quote');
  return minimum;
}

export function buildSwap(
  quote: Pick<TradeQuote, 'route' | 'amountIn' | 'minimum'>,
  deadline: bigint,
  permit?: { message: PermitSingle; signature: Hex },
) {
  const [first, second] = quote.route;
  const last = second ?? first;
  const input = first.zeroForOne ? first.poolKey.currency0 : first.poolKey.currency1;
  const output = last.zeroForOne ? last.poolKey.currency1 : last.poolKey.currency0;
  const amountIn = quote.amountIn.toString();
  const amountOutMinimum = quote.minimum.toString();
  const planner = new V4Planner();
  if (second) {
    const path = quote.route.map(({ poolKey, zeroForOne }) => ({
      intermediateCurrency: zeroForOne ? poolKey.currency1 : poolKey.currency0,
      fee: poolKey.fee,
      tickSpacing: poolKey.tickSpacing,
      hooks: poolKey.hooks,
      hookData: '0x',
    }));
    planner.addAction(
      Actions.SWAP_EXACT_IN,
      [{ currencyIn: input, path, minHopPriceX36: [], amountIn, amountOutMinimum }],
      URVersion.V2_1_2,
    );
  } else {
    planner.addAction(
      Actions.SWAP_EXACT_IN_SINGLE,
      [{ ...first, amountIn, amountOutMinimum, minHopPriceX36: '0', hookData: '0x' }],
      URVersion.V2_1_2,
    );
  }
  planner.addAction(Actions.SETTLE_ALL, [input, amountIn]);
  // TAKE_ALL pays the router's locked msgSender: the wallet signing this swap.
  planner.addAction(Actions.TAKE_ALL, [output, amountOutMinimum]);
  const swapInput = planner.finalize() as Hex;
  if (input === zeroAddress) {
    // Refund any ETH the pool did not use to the signing wallet.
    const refund = encodeAbiParameters(parseAbiParameters('address, address, uint256'), [
      zeroAddress,
      '0x0000000000000000000000000000000000000001',
      0n,
    ]);
    return {
      abi: routerAbi,
      functionName: 'execute',
      args: ['0x1004', [swapInput, refund], deadline],
      value: quote.amountIn,
    } as const;
  }
  if (permit) {
    const permitInput = encodeAbiParameters(permit2PermitParameters, [permit.message, permit.signature]);
    // The permit may already be on chain. The swap still has to settle in full.
    return { abi: routerAbi, functionName: 'execute', args: ['0x8a10', [permitInput, swapInput], deadline] } as const;
  }

  return {
    abi: routerAbi,
    functionName: 'execute',
    args: ['0x10', [swapInput], deadline],
  } as const;
}

export function buildTokenApproval(token: Address, permit2: Address, amount: bigint) {
  return {
    to: token,
    data: encodeFunctionData({ abi: erc20Abi, functionName: 'approve', args: [permit2, amount] }),
  };
}

export function buildAtomicSwapCalls(
  deployment: TradeNetwork['deployment'],
  trade: Pick<TradeQuote, 'route' | 'amountIn' | 'minimum'>,
  deadline: bigint,
  tokenAllowance: bigint,
  hasTradeAllowance: boolean,
) {
  const first = trade.route[0];
  const token = first.zeroForOne ? first.poolKey.currency0 : first.poolKey.currency1;
  const swap = buildSwap(trade, deadline);
  const swapCall = { to: deployment.router, data: encodeFunctionData(swap) };
  if ('value' in swap) return [{ ...swapCall, value: swap.value }];

  const calls: { to: Address; data: Hex }[] = [];
  if (tokenAllowance < trade.amountIn) {
    if (tokenAllowance > 0n) calls.push(buildTokenApproval(token, deployment.permit2, 0n));
    calls.push(buildTokenApproval(token, deployment.permit2, trade.amountIn));
  }
  if (!hasTradeAllowance) {
    calls.push({
      to: deployment.permit2,
      data: encodeFunctionData({
        abi: permit2Abi,
        functionName: 'approve',
        args: [token, deployment.router, trade.amountIn, Number(deadline)],
      }),
    });
  }
  calls.push(swapCall);
  return calls;
}
