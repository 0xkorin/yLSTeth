export const GOVERNOR_ABI = [
	{
		name: 'Propose',
		inputs: [
			{name: 'idx', type: 'uint256', indexed: true},
			{name: 'epoch', type: 'uint256', indexed: true},
			{name: 'author', type: 'address', indexed: true},
			{name: 'ipfs', type: 'bytes32', indexed: false},
			{name: 'script', type: 'bytes', indexed: false}
		],
		anonymous: false,
		type: 'event'
	},
	{name: 'Retract', inputs: [{name: 'idx', type: 'uint256', indexed: true}], anonymous: false, type: 'event'},
	{name: 'Cancel', inputs: [{name: 'idx', type: 'uint256', indexed: true}], anonymous: false, type: 'event'},
	{
		name: 'Vote',
		inputs: [
			{name: 'account', type: 'address', indexed: true},
			{name: 'idx', type: 'uint256', indexed: true},
			{name: 'yea', type: 'uint256', indexed: false},
			{name: 'nay', type: 'uint256', indexed: false},
			{name: 'abstain', type: 'uint256', indexed: false}
		],
		anonymous: false,
		type: 'event'
	},
	{
		name: 'Enact',
		inputs: [
			{name: 'idx', type: 'uint256', indexed: true},
			{name: 'by', type: 'address', indexed: true}
		],
		anonymous: false,
		type: 'event'
	},
	{name: 'SetMeasure', inputs: [{name: 'measure', type: 'address', indexed: true}], anonymous: false, type: 'event'},
	{
		name: 'SetExecutor',
		inputs: [{name: 'executor', type: 'address', indexed: true}],
		anonymous: false,
		type: 'event'
	},
	{name: 'SetDelay', inputs: [{name: 'delay', type: 'uint256', indexed: false}], anonymous: false, type: 'event'},
	{name: 'SetQuorum', inputs: [{name: 'quorum', type: 'uint256', indexed: false}], anonymous: false, type: 'event'},
	{
		name: 'SetMajority',
		inputs: [{name: 'majority', type: 'uint256', indexed: false}],
		anonymous: false,
		type: 'event'
	},
	{
		name: 'SetProposeMinWeight',
		inputs: [{name: 'min_weight', type: 'uint256', indexed: false}],
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
		stateMutability: 'nonpayable',
		type: 'constructor',
		inputs: [
			{name: '_genesis', type: 'uint256'},
			{name: '_measure', type: 'address'},
			{name: '_executor', type: 'address'},
			{name: '_quorum', type: 'uint256'},
			{name: '_majority', type: 'uint256'},
			{name: '_delay', type: 'uint256'}
		],
		outputs: []
	},
	{stateMutability: 'view', type: 'function', name: 'epoch', inputs: [], outputs: [{name: '', type: 'uint256'}]},
	{stateMutability: 'view', type: 'function', name: 'propose_open', inputs: [], outputs: [{name: '', type: 'bool'}]},
	{stateMutability: 'view', type: 'function', name: 'vote_open', inputs: [], outputs: [{name: '', type: 'bool'}]},
	{stateMutability: 'view', type: 'function', name: 'quorum', inputs: [], outputs: [{name: '', type: 'uint256'}]},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'previous_quorum',
		inputs: [],
		outputs: [{name: '', type: 'uint256'}]
	},
	{stateMutability: 'view', type: 'function', name: 'majority', inputs: [], outputs: [{name: '', type: 'uint256'}]},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'previous_majority',
		inputs: [],
		outputs: [{name: '', type: 'uint256'}]
	},
	{stateMutability: 'view', type: 'function', name: 'delay', inputs: [], outputs: [{name: '', type: 'uint256'}]},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'previous_delay',
		inputs: [],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'proposal',
		inputs: [{name: '_idx', type: 'uint256'}],
		outputs: [
			{
				name: '',
				type: 'tuple',
				components: [
					{name: 'epoch', type: 'uint256'},
					{name: 'author', type: 'address'},
					{name: 'ipfs', type: 'bytes32'},
					{name: 'state', type: 'uint256'},
					{name: 'hash', type: 'bytes32'},
					{name: 'yea', type: 'uint256'},
					{name: 'nay', type: 'uint256'},
					{name: 'abstain', type: 'uint256'}
				]
			}
		]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'proposal_state',
		inputs: [{name: '_idx', type: 'uint256'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'update_proposal_state',
		inputs: [{name: '_idx', type: 'uint256'}],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'propose',
		inputs: [
			{name: '_ipfs', type: 'bytes32'},
			{name: '_script', type: 'bytes'}
		],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'retract',
		inputs: [{name: '_idx', type: 'uint256'}],
		outputs: []
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'cancel',
		inputs: [{name: '_idx', type: 'uint256'}],
		outputs: []
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'vote_yea',
		inputs: [{name: '_idx', type: 'uint256'}],
		outputs: []
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'vote_nay',
		inputs: [{name: '_idx', type: 'uint256'}],
		outputs: []
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'vote_abstain',
		inputs: [{name: '_idx', type: 'uint256'}],
		outputs: []
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'vote',
		inputs: [
			{name: '_idx', type: 'uint256'},
			{name: '_yea', type: 'uint256'},
			{name: '_nay', type: 'uint256'},
			{name: '_abstain', type: 'uint256'}
		],
		outputs: []
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'enact',
		inputs: [
			{name: '_idx', type: 'uint256'},
			{name: '_script', type: 'bytes'}
		],
		outputs: []
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'set_measure',
		inputs: [{name: '_measure', type: 'address'}],
		outputs: []
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'set_executor',
		inputs: [{name: '_executor', type: 'address'}],
		outputs: []
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'set_quorum',
		inputs: [{name: '_quorum', type: 'uint256'}],
		outputs: []
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'set_majority',
		inputs: [{name: '_majority', type: 'uint256'}],
		outputs: []
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'set_delay',
		inputs: [{name: '_delay', type: 'uint256'}],
		outputs: []
	},
	{
		stateMutability: 'nonpayable',
		type: 'function',
		name: 'set_propose_min_weight',
		inputs: [{name: '_propose_min_weight', type: 'uint256'}],
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
	{stateMutability: 'view', type: 'function', name: 'genesis', inputs: [], outputs: [{name: '', type: 'uint256'}]},
	{stateMutability: 'view', type: 'function', name: 'management', inputs: [], outputs: [{name: '', type: 'address'}]},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'pending_management',
		inputs: [],
		outputs: [{name: '', type: 'address'}]
	},
	{stateMutability: 'view', type: 'function', name: 'measure', inputs: [], outputs: [{name: '', type: 'address'}]},
	{stateMutability: 'view', type: 'function', name: 'executor', inputs: [], outputs: [{name: '', type: 'address'}]},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'propose_min_weight',
		inputs: [],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'num_proposals',
		inputs: [],
		outputs: [{name: '', type: 'uint256'}]
	},
	{
		stateMutability: 'view',
		type: 'function',
		name: 'voted',
		inputs: [
			{name: 'arg0', type: 'address'},
			{name: 'arg1', type: 'uint256'}
		],
		outputs: [{name: '', type: 'bool'}]
	}
] as const;
