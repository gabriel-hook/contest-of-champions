import './GuidePage.scss';
import lang from '../../service/lang';
import { EFFECT_VALUES } from '../../data/model/Effect';
import { effectIcon } from '../../data/effects';
import { ABILITY_VALUES } from '../../data/model/Ability';
import { abilityIcon } from '../../data/abilities';
import Icon from '../Icon.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

import './GlossaryPage.scss';

const GlossaryPage = {
    view() {
        return (
            <div
                m="GlossaryPage"
                role="article"
                class="glossary"
            >
                <div class="glossary-section">
                    <div class="header">{ lang.string('abilities') }</div>
                    { ABILITY_VALUES.map((ability) => (
                        <div class="details">
                            <div class="name">
                                { abilityIcon(ability) && (
                                    <Icon icon={ abilityIcon(ability) } before />
                                ) || null }
                                { lang.string(`ability-${ ability }-name`) }
                            </div>
                            <div class="description">
                                { lang.string(`ability-${ ability }-description`) }
                            </div>
                        </div>
                    )) }
                </div>
                <div class="glossary-section">
                    <div class="header">{ lang.string('synergies') }</div>
                    { EFFECT_VALUES.map((effect) => (
                        <div class="details">
                            <div class="name">
                                { effectIcon(effect) && (
                                    <Icon icon={ effectIcon(effect) } before />
                                ) || null }
                                { lang.string(`effect-${ effect }-name`, null) || lang.string(`effect-${ effect }-type`) }
                            </div>
                            <div class="description">
                                { lang.string(`effect-${ effect }-description`) }
                            </div>
                        </div>
                    )) }
                </div>
                <div class="clear" />
            </div>
        );
    },
};

export default GlossaryPage;
