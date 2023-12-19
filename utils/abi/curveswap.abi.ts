const CURVE_SWAP_ABI = [
	{
		name: 'TokenExchange',
		inputs: [
			{name: 'buyer', type: 'address', indexed: true},
			{name: 'receiver', type: 'address', indexed: true},
			{name: 'pool', type: 'address', indexed: true},
			{name: 'token_sold', type: 'address', indexed: false},
			{name: 'token_bought', type: 'address', indexed: false},
			{name: 'amount_sold', type: 'uint256', indexed: false},
			{name: 'amount_bought', type: 'uint256', indexed: false}
		],
		anonymous: false,
		type: 'event'
	},
	{
		name: 'ExchangeMultiple',
		inputs: [
			{name: 'buyer', type: 'address', indexed: true},
			{name: 'receiver', type: 'address', indexed: true},
			{name: 'route', type: 'address[9]', indexed: false},
			{name: 'swap_params', type: 'uint256[3][4]', indexed: false},
			{name: 'pools', type: 'address[4]', indexed: false},
			{name: 'amount_sold', type: 'uint256', indexed: false},
			{name: 'amount_bought', type: 'uint256', indexed: false}
		],
		anonymous: false,
		type: 'event'
	},
	{
		stateMutability: 'nonpayable',
		type: 'constructor',
		inputs: [
			{name: '_address_provider', type: 'address'},
			{name: '_calculator', type: 'address'},
			{name: '_weth', type: 'address'}
		],
		outputs: []
	},
	{stateMutability: 'payable', type: 'fallback'},
	{
		stateMutability: 'payable',
		type: 'function',
		name: 'exchange_with_best_rate',
		inputs: [
			{name: '_from', type: 'address'},
			{name: '_to', type: 'address'},
			{name: '_amount', type: 'uint256'},
			{name: '_expected', type: 'uint256'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'payable',
		type: 'function',
		name: 'exchange_with_best_rate',
		inputs: [
			{name: '_from', type: 'address'},
			{name: '_to', type: 'address'},
			{name: '_amount', type: 'uint256'},
			{name: '_expected', type: 'uint256'},
			{name: '_receiver', type: 'address'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'payable',
		type: 'function',
		name: 'exchange',
		inputs: [
			{name: '_pool', type: 'address'},
			{name: '_from', type: 'address'},
			{name: '_to', type: 'address'},
			{name: '_amount', type: 'uint256'},
			{name: '_expected', type: 'uint256'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'payable',
		type: 'function',
		name: 'exchange',
		inputs: [
			{name: '_pool', type: 'address'},
			{name: '_from', type: 'address'},
			{name: '_to', type: 'address'},
			{name: '_amount', type: 'uint256'},
			{name: '_expected', type: 'uint256'},
			{name: '_receiver', type: 'address'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'payable',
		type: 'function',
		name: 'exchange_multiple',
		inputs: [
			{name: '_route', type: 'address[9]'},
			{name: '_swap_params', type: 'uint256[3][4]'},
			{name: '_amount', type: 'uint256'},
			{name: '_expected', type: 'uint256'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'payable',
		type: 'function',
		name: 'exchange_multiple',
		inputs: [
			{name: '_route', type: 'address[9]'},
			{name: '_swap_params', type: 'uint256[3][4]'},
			{name: '_amount', type: 'uint256'},
			{name: '_expected', type: 'uint256'},
			{name: '_pools', type: 'address[4]'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'payable',
		type: 'function',
		name: 'exchange_multiple',
		inputs: [
			{name: '_route', type: 'address[9]'},
			{name: '_swap_params', type: 'uint256[3][4]'},
			{name: '_amount', type: 'uint256'},
			{name: '_expected', type: 'uint256'},
			{name: '_pools', type: 'address[4]'},
			{name: '_receiver', type: 'address'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'get_best_rate',
		inputs: [
			{name: '_from', type: 'address'},
			{name: '_to', type: 'address'},
			{name: '_amount', type: 'uint256'}
		],
		outputs: [
			{name: '', type: 'address'},
			{name: '', type: 'uint256'}
		]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'get_best_rate',
		inputs: [
			{name: '_from', type: 'address'},
			{name: '_to', type: 'address'},
			{name: '_amount', type: 'uint256'},
			{name: '_exclude_pools', type: 'address[8]'}
		],
		outputs: [
			{name: '', type: 'address'},
			{name: '', type: 'uint256'}
		]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'get_exchange_amount',
		inputs: [
			{name: '_pool', type: 'address'},
			{name: '_from', type: 'address'},
			{name: '_to', type: 'address'},
			{name: '_amount', type: 'uint256'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'get_input_amount',
		inputs: [
			{name: '_pool', type: 'address'},
			{name: '_from', type: 'address'},
			{name: '_to', type: 'address'},
			{name: '_amount', type: 'uint256'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'get_exchange_amounts',
		inputs: [
			{name: '_pool', type: 'address'},
			{name: '_from', type: 'address'},
			{name: '_to', type: 'address'},
			{name: '_amounts', type: 'uint256[100]'}
		],
		outputs: [{name: '', type: 'uint256[100]'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'get_exchange_multiple_amount',
		inputs: [
			{name: '_route', type: 'address[9]'},
			{name: '_swap_params', type: 'uint256[3][4]'},
			{name: '_amount', type: 'uint256'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'get_exchange_multiple_amount',
		inputs: [
			{name: '_route', type: 'address[9]'},
			{name: '_swap_params', type: 'uint256[3][4]'},
			{name: '_amount', type: 'uint256'},
			{name: '_pools', type: 'address[4]'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'get_calculator',
		inputs: [{name: '_pool', type: 'address'}],
		outputs: [{name: '', type: 'address'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'update_registry_address',
		inputs: [],
		outputs: [{name: '', type: 'bool'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'set_calculator',
		inputs: [
			{name: '_pool', type: 'address'},
			{name: '_calculator', type: 'address'}
		],
		outputs: [{name: '', type: 'bool'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'set_default_calculator',
		inputs: [{name: '_calculator', type: 'address'}],
		outputs: [{name: '', type: 'bool'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'claim_balance',
		inputs: [{name: '_token', type: 'address'}],
		outputs: [{name: '', type: 'bool'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'set_killed',
		inputs: [{name: '_is_killed', type: 'bool'}],
		outputs: [{name: '', type: 'bool'}]
	},
	{stateMutability: 'view', type: 'function', name: 'registry', inputs: [], outputs: [{name: '', type: 'address'}]},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'factory_registry',
		inputs: [],
		outputs: [{name: '', type: 'address'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'crypto_registry',
		inputs: [],
		outputs: [{name: '', type: 'address'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'default_calculator',
		inputs: [],
		outputs: [{name: '', type: 'address'}]
	},
	{stateMutability: 'view', type: 'function', name: 'is_killed', inputs: [], outputs: [{name: '', type: 'bool'}]}
] as const;

export {CURVE_SWAP_ABI};
