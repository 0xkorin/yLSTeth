export const ST_YETH_ABI = [
	{
		name: 'Rewards',
		inputs: [
			{name: 'pending', type: 'uint256', indexed: false},
			{name: 'streaming', type: 'uint256', indexed: false},
			{name: 'unlocked', type: 'uint256', indexed: false},
			{name: 'delta', type: 'int256', indexed: false}
		],
		anonymous: false,
		type: 'event'
	},
	{
		name: 'SetFeeRate',
		inputs: [{name: 'fee_rate', type: 'uint256', indexed: false}],
		anonymous: false,
		type: 'event'
	},
	{
		name: 'SetHalfTime',
		inputs: [{name: 'half_time', type: 'uint256', indexed: false}],
		anonymous: false,
		type: 'event'
	},
	{
		name: 'PendingManagement',
		inputs: [{name: 'management', type: 'address', indexed: true}],
		anonymous: false,
		type: 'event'
	},
	{
		name: 'SetManagement',
		inputs: [{name: 'management', type: 'address', indexed: true}],
		anonymous: false,
		type: 'event'
	},
	{
		name: 'SetTreasury',
		inputs: [{name: 'treasury', type: 'address', indexed: true}],
		anonymous: false,
		type: 'event'
	},
	{
		name: 'Transfer',
		inputs: [
			{name: 'sender', type: 'address', indexed: true},
			{name: 'receiver', type: 'address', indexed: true},
			{name: 'value', type: 'uint256', indexed: false}
		],
		anonymous: false,
		type: 'event'
	},
	{
		name: 'Approval',
		inputs: [
			{name: 'owner', type: 'address', indexed: true},
			{name: 'spender', type: 'address', indexed: true},
			{name: 'value', type: 'uint256', indexed: false}
		],
		anonymous: false,
		type: 'event'
	},
	{
		name: 'Deposit',
		inputs: [
			{name: 'sender', type: 'address', indexed: true},
			{name: 'owner', type: 'address', indexed: true},
			{name: 'assets', type: 'uint256', indexed: false},
			{name: 'shares', type: 'uint256', indexed: false}
		],
		anonymous: false,
		type: 'event'
	},
	{
		name: 'Withdraw',
		inputs: [
			{name: 'sender', type: 'address', indexed: true},
			{name: 'receiver', type: 'address', indexed: true},
			{name: 'owner', type: 'address', indexed: true},
			{name: 'assets', type: 'uint256', indexed: false},
			{name: 'shares', type: 'uint256', indexed: false}
		],
		anonymous: false,
		type: 'event'
	},
	{stateMutability: 'nonpayable', type: 'constructor', inputs: [{name: '_asset', type: 'address'}], outputs: []},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'transfer',
		inputs: [
			{name: '_to', type: 'address'},
			{name: '_value', type: 'uint256'}
		],
		outputs: [{name: '', type: 'bool'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'transferFrom',
		inputs: [
			{name: '_from', type: 'address'},
			{name: '_to', type: 'address'},
			{name: '_value', type: 'uint256'}
		],
		outputs: [{name: '', type: 'bool'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'approve',
		inputs: [
			{name: '_spender', type: 'address'},
			{name: '_value', type: 'uint256'}
		],
		outputs: [{name: '', type: 'bool'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'increaseAllowance',
		inputs: [
			{name: '_spender', type: 'address'},
			{name: '_value', type: 'uint256'}
		],
		outputs: [{name: '', type: 'bool'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'decreaseAllowance',
		inputs: [
			{name: '_spender', type: 'address'},
			{name: '_value', type: 'uint256'}
		],
		outputs: [{name: '', type: 'bool'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'totalAssets',
		inputs: [],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'convertToShares',
		inputs: [{name: '_assets', type: 'uint256'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'convertToAssets',
		inputs: [{name: '_shares', type: 'uint256'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'maxDeposit',
		inputs: [{name: '_receiver', type: 'address'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'previewDeposit',
		inputs: [{name: '_assets', type: 'uint256'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'deposit',
		inputs: [{name: '_assets', type: 'uint256'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'deposit',
		inputs: [
			{name: '_assets', type: 'uint256'},
			{name: '_receiver', type: 'address'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'maxMint',
		inputs: [{name: '_receiver', type: 'address'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'previewMint',
		inputs: [{name: '_shares', type: 'uint256'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'mint',
		inputs: [{name: '_shares', type: 'uint256'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'mint',
		inputs: [
			{name: '_shares', type: 'uint256'},
			{name: '_receiver', type: 'address'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'maxWithdraw',
		inputs: [{name: '_owner', type: 'address'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'previewWithdraw',
		inputs: [{name: '_assets', type: 'uint256'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'withdraw',
		inputs: [{name: '_assets', type: 'uint256'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'withdraw',
		inputs: [
			{name: '_assets', type: 'uint256'},
			{name: '_receiver', type: 'address'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'withdraw',
		inputs: [
			{name: '_assets', type: 'uint256'},
			{name: '_receiver', type: 'address'},
			{name: '_owner', type: 'address'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'maxRedeem',
		inputs: [{name: '_owner', type: 'address'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'previewRedeem',
		inputs: [{name: '_shares', type: 'uint256'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'redeem',
		inputs: [{name: '_shares', type: 'uint256'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'redeem',
		inputs: [
			{name: '_shares', type: 'uint256'},
			{name: '_receiver', type: 'address'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'redeem',
		inputs: [
			{name: '_shares', type: 'uint256'},
			{name: '_receiver', type: 'address'},
			{name: '_owner', type: 'address'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'update_amounts',
		inputs: [],
		outputs: [
			{name: '', type: 'uint256'},
			{name: '', type: 'uint256'},
			{name: '', type: 'uint256'}
		]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'get_amounts',
		inputs: [],
		outputs: [
			{name: '', type: 'uint256'},
			{name: '', type: 'uint256'},
			{name: '', type: 'uint256'},
			{name: '', type: 'uint256'},
			{name: '', type: 'int256'}
		]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'vote_weight',
		inputs: [{name: '_account', type: 'address'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{stateMutability: 'view', type: 'function', name: 'known', inputs: [], outputs: [{name: '', type: 'uint256'}]},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'rescue',
		inputs: [
			{name: '_token', type: 'address'},
			{name: '_receiver', type: 'address'}
		],
		outputs: []
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'set_performance_fee_rate',
		inputs: [{name: '_fee_rate', type: 'uint256'}],
		outputs: []
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'set_half_time',
		inputs: [{name: '_half_time', type: 'uint256'}],
		outputs: []
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'set_management',
		inputs: [{name: '_management', type: 'address'}],
		outputs: []
	},
	{stateMutability: 'nonpayable', type: 'function', name: 'accept_management', inputs: [], outputs: []},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'set_treasury',
		inputs: [{name: '_treasury', type: 'address'}],
		outputs: []
	},
	{stateMutability: 'view', type: 'function', name: 'updated', inputs: [], outputs: [{name: '', type: 'uint256'}]},
	{stateMutability: 'view', type: 'function', name: 'management', inputs: [], outputs: [{name: '', type: 'address'}]},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'pending_management',
		inputs: [],
		outputs: [{name: '', type: 'address'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'performance_fee_rate',
		inputs: [],
		outputs: [{name: '', type: 'uint256'}]
	},
	{stateMutability: 'view', type: 'function', name: 'treasury', inputs: [], outputs: [{name: '', type: 'address'}]},
	{stateMutability: 'view', type: 'function', name: 'half_time', inputs: [], outputs: [{name: '', type: 'uint256'}]},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'totalSupply',
		inputs: [],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'balanceOf',
		inputs: [{name: 'arg0', type: 'address'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'allowance',
		inputs: [
			{name: 'arg0', type: 'address'},
			{name: 'arg1', type: 'address'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{stateMutability: 'view', type: 'function', name: 'name', inputs: [], outputs: [{name: '', type: 'string'}]},
	{stateMutability: 'view', type: 'function', name: 'symbol', inputs: [], outputs: [{name: '', type: 'string'}]},
	{stateMutability: 'view', type: 'function', name: 'decimals', inputs: [], outputs: [{name: '', type: 'uint8'}]},
	{stateMutability: 'view', type: 'function', name: 'asset', inputs: [], outputs: [{name: '', type: 'address'}]}
] as const;
