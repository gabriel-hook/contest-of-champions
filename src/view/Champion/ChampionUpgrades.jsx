import './ChampionUpgrade.scss';
import { TYPE_VALUES } from '../../data/model/Type';
import { STAR_RANK_LEVEL, CATALYSTS } from '../../data/model/Champion';
import ImageIcon from '../ImageIcon.jsx';
import lang from '../../service/lang';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const ChampionUpgrades = {
    view(ctrl, { champions }) {
        const catalysts = champions
            // filter out non-upgrading champions
            .filter(({ attr }) => {
                const definitionStars = STAR_RANK_LEVEL[ attr.stars ];
                const definitionRank = definitionStars[ attr.rank ];
                const isMaxed = definitionStars.ranks === attr.rank && definitionRank.levels === attr.level;
                const isRankUp = definitionStars.ranks > attr.rank && definitionRank.levels === attr.level;
                return isMaxed || isRankUp;
            })
            // map upgrades needed
            .map(({ attr }) => ({
                catalysts: CATALYSTS[ attr.stars ] && CATALYSTS[ attr.stars ][ attr.rank ],
                typeId: attr.typeId,
                typeIndex: TYPE_VALUES.indexOf(attr.typeId),
            }))
            // add to the right category
            .reduce((collection, { catalysts, typeId, typeIndex }) => {
                catalysts.forEach(({ type, tier, amount }) => {
                    if(type === 'gold') {
                        collection[ type ].amount += amount;
                    }
                    else if(type === 'basic' || type === 'alpha') {
                        collection[ type ].push({
                            type,
                            tier,
                            amount,
                        });
                    }
                    else if (type === 'class') {
                        collection[ type ].push({
                            type,
                            tier,
                            amount,
                            typeId,
                            typeIndex,
                        });
                    }
                });
                return collection;
            }, { basic: [], class: [], alpha: [], gold: { type: 'gold', amount: 0 } });

        [ 'basic', 'class', 'alpha' ].forEach((type) => {
            catalysts[ type ] = catalysts[ type ]
                // sort by tier ascending
                .sort((type === 'class')? ({ tier: tA, typeIndex: tyA }, { tier: tB, typeIndex: tyB }) => {
                    const compare = tA - tB;
                    if(compare !== 0) {
                        return compare;
                    }
                    return tyA - tyB;
                }: ({ tier: tA }, { tier: tB }) => tA - tB)
                // fold same tier/type into each other
                .reduce((array, current, index) => {
                    if(index === 0) {
                        array.push(current);
                        return array;
                    }
                    const last = array[ array.length - 1 ];
                    if(last.tier === current.tier && last.typeId === current.typeId) {
                        last.amount += current.amount;
                    }
                    else {
                        array.push(current);
                    }
                    return array;
                }, []);
        });

        return (!catalysts.gold.amount)? (
            <div m="ChampionUpgrades" />
        ): (
            <div
                m="ChampionUpgrades"
                title={ lang.get('upgrade-cost') }
                class="champion-upgrade">
                { [ 'basic', 'class', 'alpha' ].map((type) => {
                    return catalysts[ type ].map(({ type, tier, amount, typeId }) => (
                        <span class="champion-upgrade-catalyst">
                            { amount } x
                            <ImageIcon
                                src={ (type === 'class')
                                    ? `images/catalysts/tier_${ tier }_${ typeId }.png`
                                    : `images/catalysts/tier_${ tier }_${ type }.png`
                                }
                                icon="share-alt"
                            />
                        </span>
                    ));
                }) }
                <span class="champion-upgrade-catalyst">
                    { catalysts.gold.amount } x
                    <ImageIcon src={ 'images/catalysts/gold.png' } icon="cloud" />
                </span>
            </div>
        );
    },
};

export default ChampionUpgrades;
