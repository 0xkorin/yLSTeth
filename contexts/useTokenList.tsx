import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import defaultTokenList from 'utils/tokenLists.json';
import axios from 'axios';
import {useChainID} from '@yearn-finance/web-lib/hooks/useChainID';
import {toAddress} from '@yearn-finance/web-lib/utils/address';

import type {Dispatch, SetStateAction} from 'react';
import type {TAddress, TDict} from '@yearn-finance/web-lib/types';

export type TTokenInfo = {
	chainId: number,
	address: TAddress,
	name: string,
	symbol: string,
	decimals: number,
	logoURI: string,
	extra?: {
		totalVotes?: bigint;
		votes?: bigint;
	};
};
export type TTokenList = {
	name: string;
	tokens: TTokenInfo[];
}

export type TTokenListProps = {
	tokenList: TDict<TTokenInfo>,
	set_tokenList: Dispatch<SetStateAction<TDict<TTokenInfo>>>,
}
const	defaultProps: TTokenListProps = {
	tokenList: {},
	set_tokenList: (): void => undefined
};

const	TokenList = createContext<TTokenListProps>(defaultProps);
export const TokenListContextApp = ({children}: {children: React.ReactElement}): React.ReactElement => {
	const [tokenList, set_tokenList] = useState<TDict<TTokenInfo>>({});
	const {safeChainID} = useChainID(Number(process.env.BASE_CHAINID));

	useEffect((): void => {
		axios.all([axios.get(`https://raw.githubusercontent.com/Migratooor/tokenLists/main/lists/${safeChainID}/yearn.json`)]).then(axios.spread((...responses): void => {
			const tokenListTokens: TDict<TTokenInfo> = {};
			const defaultList = defaultTokenList as TTokenList;
			for (const eachToken of defaultList.tokens) {
				if (!tokenListTokens[toAddress(eachToken.address)]) {
					tokenListTokens[toAddress(eachToken.address)] = eachToken;
				}
			}

			for (const eachResponse of responses) {
				const	tokenListResponse: TTokenList = eachResponse.data;
				for (const eachToken of tokenListResponse.tokens) {
					tokenListTokens[toAddress(eachToken.address)] = eachToken;
				}
			}
			set_tokenList(tokenListTokens);
		}));
	}, [safeChainID]);

	const	contextValue = useMemo((): TTokenListProps => ({
		tokenList,
		set_tokenList
	}), [tokenList]);

	return (
		<TokenList.Provider value={contextValue}>
			{children}
		</TokenList.Provider>
	);
};


export const useTokenList = (): TTokenListProps => useContext(TokenList);
