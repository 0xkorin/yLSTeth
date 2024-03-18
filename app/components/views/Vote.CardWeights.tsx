import React, {useCallback, useMemo, useState} from 'react';
import {voteWeights} from 'app/actions';
import useBasket from 'app/contexts/useBasket';
import {usePrices} from 'app/contexts/usePrices';
import {ONCHAIN_VOTE_WEIGHT_ABI} from 'app/utils/abi/onchainVoteWeight.abi';
import {NO_CHANGE_LST_LIKE} from 'app/utils/constants';
import {useWeb3} from '@builtbymom/web3/contexts/useWeb3';
import {useAsyncTrigger} from '@builtbymom/web3/hooks/useAsyncTrigger';
import {
	cl,
	decodeAsBigInt,
	decodeAsBoolean,
	formatAmount,
	formatPercent,
	isZeroAddress,
	toAddress,
	toBigInt,
	truncateHex
} from '@builtbymom/web3/utils';
import {defaultTxStatus, retrieveConfig} from '@builtbymom/web3/utils/wagmi';
import {readContract, readContracts} from '@wagmi/core';
import {Button} from '@yearn-finance/web-lib/components/Button';

import {ImageWithFallback} from '../common/ImageWithFallback';

import type {TBasketItem, TIndexedTokenInfo} from 'app/utils/types';
import type {ReactElement} from 'react';
import type {TDict} from '@builtbymom/web3/types';
import type {TTxStatus} from '@builtbymom/web3/utils/wagmi';

/******************************************************************************
 ** This method is used to display the vote weight for each LST.
 *****************************************************************************/
function VoteWeightRow(props: {
	currentLST: TIndexedTokenInfo;
	votePowerPerLST: TDict<number>;
	set_votePowerPerLST: React.Dispatch<React.SetStateAction<TDict<number>>>;
	hasAlreadyVoted: boolean;
}): ReactElement {
	const {weightIncentives} = useBasket();
	const {getPrice} = usePrices();

	/**************************************************************************
	 ** This method calculates the incentive value
	 *************************************************************************/
	const weigthIncentiveValue = useMemo((): number => {
		let sum = 0;
		for (const incentive of Object.values(weightIncentives[props.currentLST.address] || {})) {
			// We don't care about this level for candidates incentives
			for (const eachIncentive of incentive) {
				const price = getPrice({address: eachIncentive.address});
				sum += eachIncentive.amount.normalized * price.normalized;
			}
		}
		return sum;
	}, [getPrice, props.currentLST.address, weightIncentives]);

	/**************************************************************************
	 ** Row rendering
	 *************************************************************************/
	return (
		<div
			key={props.currentLST.address}
			aria-label={'content'}
			className={
				'my-0.5 grid grid-cols-12 rounded-sm bg-neutral-100/50 p-4 transition-colors open:bg-neutral-100 hover:bg-neutral-100'
			}>
			<div className={'col-span-12 flex w-full flex-row items-center space-x-6 md:col-span-3'}>
				<div className={'size-10 min-w-[40px]'}>
					<ImageWithFallback
						src={props.currentLST.logoURI || ''}
						altSrc={`${process.env.SMOL_ASSETS_URL}/token/${Number(process.env.DEFAULT_CHAIN_ID)}/${props.currentLST?.address}/logo-32.png`}
						alt={''}
						unoptimized
						width={40}
						height={40}
					/>
				</div>
				<div className={'flex flex-col'}>
					<p className={'whitespace-nowrap'}>
						{props.currentLST?.symbol || truncateHex(props.currentLST.address, 6)}
					</p>
					<small className={'whitespace-nowrap text-xs'}>{props.currentLST.name}</small>
				</div>
			</div>
			<div className={'col-span-12 mt-4 flex items-center justify-between md:col-span-3 md:mt-0 md:justify-end'}>
				<small className={'block text-neutral-500 md:hidden'}>{'Total incentive (USD)'}</small>
				<p
					suppressHydrationWarning
					className={'font-number'}>
					{`$${formatAmount(weigthIncentiveValue, 2, 2)}`}
				</p>
			</div>
			<div className={'col-span-12 mt-2 flex items-center justify-between md:col-span-3 md:mt-0 md:justify-end'}>
				<small className={'block text-neutral-500 md:hidden'}>{'Current weight'}</small>
				<p
					suppressHydrationWarning
					className={'font-number'}>
					{formatPercent(Number((props.currentLST as TBasketItem)?.weight?.normalized || 0) * 100)}
				</p>
			</div>

			<div className={'col-span-12 mt-2 flex w-full items-center pl-[40%] md:col-span-3 md:mt-0'}>
				<div className={'grid h-10 w-full grid-cols-4 items-center rounded-lg bg-neutral-0'}>
					<div className={'flex items-center justify-start pl-1'}>
						<button
							disabled={!props.votePowerPerLST[props.currentLST.address] || props.hasAlreadyVoted}
							onClick={() =>
								props.set_votePowerPerLST(p => ({
									...p,
									[props.currentLST.address]:
										p[props.currentLST.address] === 0 ? 0 : p[props.currentLST.address] - 1
								}))
							}
							className={cl(
								'flex size-8 items-center justify-center rounded-lg bg-neutral-100',
								'text-xl transition-colors hover:bg-neutral-200 disabled:cursor-not-allowed',
								'disabled:opacity-60 disabled:text-neutral-400 disabled:hover:bg-neutral-100'
							)}>
							{'-'}
						</button>
					</div>
					<div className={'col-span-2 text-center'}>
						<p
							suppressHydrationWarning
							className={cl(
								'font-number',
								!props.votePowerPerLST[props.currentLST.address] ? 'text-neutral-900/30' : ''
							)}>
							{`${formatAmount(
								((props.votePowerPerLST[props.currentLST.address] || 0) /
									Object.values(props.votePowerPerLST).reduce((a, b) => a + b, 0)) *
									100,
								0,
								2
							)}%`}
						</p>
					</div>
					<div className={'flex items-center justify-end pr-1'}>
						<button
							disabled={props.hasAlreadyVoted}
							onClick={() =>
								props.set_votePowerPerLST(p => ({
									...p,
									[props.currentLST.address]: p[props.currentLST.address] + 1 || 1
								}))
							}
							className={cl(
								'flex size-8 items-center justify-center rounded-lg bg-neutral-100 transition-colors hover:bg-neutral-200',
								'disabled:opacity-60 disabled:text-neutral-400 disabled:cursor-not-allowed disabled:hover:bg-neutral-100'
							)}>
							<p className={'text-xl'}>{'+'}</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

function VoteCardWeights(): ReactElement {
	const {provider, address} = useWeb3();
	const [votePowerPerLST, set_votePowerPerLST] = useState<TDict<number>>({});
	const [voteWeightStatus, set_voteWeightStatus] = useState<TTxStatus>(defaultTxStatus);
	const [hasAlreadyVoted, set_hasAlreadyVoted] = useState(true);
	const [isVoteOpen, set_isVoteOpen] = useState(false);
	const {basket, isLoaded} = useBasket();

	/**********************************************************************************************
	 **	Retrieve the current vote info for the user.
	 *********************************************************************************************/
	const onRefreshVotes = useAsyncTrigger(async () => {
		if (isZeroAddress(address)) {
			return;
		}

		/* 🔵 - Yearn Finance **********************************************************************
		 **	First we need to retrive the current epoch
		 ******************************************************************************************/
		const [_epoch, _voteOpen] = await readContracts(retrieveConfig(), {
			contracts: [
				{
					abi: ONCHAIN_VOTE_WEIGHT_ABI,
					address: toAddress(process.env.WEIGHT_VOTE_ADDRESS),
					functionName: 'epoch'
				},
				{
					abi: ONCHAIN_VOTE_WEIGHT_ABI,
					address: toAddress(process.env.WEIGHT_VOTE_ADDRESS),
					functionName: 'vote_open'
				}
			]
		});
		const epoch = decodeAsBigInt(_epoch);
		const isVoteOpenBool = decodeAsBoolean(_voteOpen);
		set_isVoteOpen(isVoteOpenBool);

		/* 🔵 - Yearn Finance **********************************************************************
		 **	Then we need to check if the user already voted for this epoch
		 ******************************************************************************************/
		const hasAlreadyVoted = await readContract(retrieveConfig(), {
			abi: ONCHAIN_VOTE_WEIGHT_ABI,
			address: toAddress(process.env.WEIGHT_VOTE_ADDRESS),
			functionName: 'voted',
			args: [toAddress(address), epoch]
		});
		set_hasAlreadyVoted(hasAlreadyVoted);

		/* 🔵 - Yearn Finance **********************************************************************
		 **	If so, we can try to retrieve the vote weight for each LST and display them.
		 ******************************************************************************************/
		if (hasAlreadyVoted) {
			const votesUser = await readContracts(retrieveConfig(), {
				contracts: [
					{
						abi: ONCHAIN_VOTE_WEIGHT_ABI,
						address: toAddress(process.env.WEIGHT_VOTE_ADDRESS),
						functionName: 'votes',
						args: [toAddress(address), 0]
					},
					...basket.map(e => ({
						abi: ONCHAIN_VOTE_WEIGHT_ABI,
						address: toAddress(process.env.WEIGHT_VOTE_ADDRESS),
						functionName: 'votes',
						args: [toAddress(address), e.index]
					}))
				]
			});
			const votes: TDict<number> = {};
			for (const item of basket) {
				votes[item.address] = Number(votesUser[item.index]?.result || 0);
			}
			votes[NO_CHANGE_LST_LIKE.address] = Number(votesUser[0]?.result || 0);
			set_votePowerPerLST(votes);
		}
	}, [address, basket]);

	/**********************************************************************************************
	 **	Trigger an onchain vote and update the vote weight for each LST.
	 *********************************************************************************************/
	const onVote = useCallback(async (): Promise<void> => {
		const voteScale = 10_000;
		const sumOfVotes = Object.values(votePowerPerLST).reduce((a, b) => a + b, 0);
		const votes = [];
		for (const item of basket) {
			const numberOfVoteForThisLST = votePowerPerLST[item.address] || 0;
			votes[item.index] = Math.floor((numberOfVoteForThisLST / sumOfVotes) * voteScale);
		}
		const numberOfVoteForNoChange = votePowerPerLST[NO_CHANGE_LST_LIKE.address] || 0;
		votes.unshift(Math.floor((numberOfVoteForNoChange / sumOfVotes) * voteScale));

		const totalVotePower = votes.reduce((a, b) => a + b, 0);
		if (totalVotePower < voteScale) {
			votes[0] += voteScale - totalVotePower;
		}

		const result = await voteWeights({
			connector: provider,
			chainID: Number(process.env.DEFAULT_CHAIN_ID),
			contractAddress: toAddress(process.env.ONCHAIN_GOV_ADDRESS),
			weight: votes.map(v => toBigInt(v)),
			statusHandler: set_voteWeightStatus
		});
		if (result.isSuccessful) {
			onRefreshVotes();
		}
	}, [basket, provider, votePowerPerLST, onRefreshVotes]);

	return (
		<div className={'mt-8'}>
			<div
				aria-label={'header'}
				className={'mb-4 hidden grid-cols-12 px-4 md:grid'}>
				<div className={'col-span-3'}>
					<p className={'text-xs text-neutral-500'}>{'LST'}</p>
				</div>
				<div className={'col-span-3 -mr-2 flex justify-end text-right'}>
					<p className={'group flex flex-row text-xs text-neutral-500'}>{'Incentives (USD)'}</p>
				</div>
				<div className={'col-span-3 -mr-2 flex justify-end text-right'}>
					<p className={'group flex flex-row text-xs text-neutral-500'}>{'Current weight'}</p>
				</div>
			</div>

			{[NO_CHANGE_LST_LIKE, ...basket]
				.filter((e): boolean => Boolean(e))
				.map((currentLST): ReactElement => {
					return (
						<VoteWeightRow
							key={currentLST.address}
							currentLST={currentLST}
							votePowerPerLST={votePowerPerLST}
							set_votePowerPerLST={set_votePowerPerLST}
							hasAlreadyVoted={hasAlreadyVoted}
						/>
					);
				})}

			{!isLoaded && (
				<div className={'grid'}>
					<div className={'skeleton-lg mb-1 h-[70px] w-full'}></div>
					<div className={'skeleton-lg mb-1 h-[70px] w-full'}></div>
					<div className={'skeleton-lg mb-1 h-[70px] w-full'}></div>
					<div className={'skeleton-lg mb-1 h-[70px] w-full'}></div>
					<div className={'skeleton-lg mb-1 h-[70px] w-full'}></div>
					<div className={'skeleton-lg mb-1 h-[70px] w-full'}></div>
					<div className={'skeleton-lg mb-1 h-[70px] w-full'}></div>
					<div className={'skeleton-lg mb-1 h-[70px] w-full'}></div>
				</div>
			)}

			<div className={'mt-auto pt-10'}>
				<Button
					onClick={onVote}
					isBusy={voteWeightStatus.pending}
					isDisabled={
						!isLoaded ||
						!isVoteOpen ||
						hasAlreadyVoted ||
						Object.values(votePowerPerLST).reduce((a, b) => a + b, 0) === 0 ||
						Object.values(votePowerPerLST).reduce((a, b) => a + b, 0) > 100 ||
						isZeroAddress(address)
					}
					className={'w-full md:w-[264px]'}>
					{'Vote'}
				</Button>
			</div>
		</div>
	);
}

export {VoteCardWeights};
