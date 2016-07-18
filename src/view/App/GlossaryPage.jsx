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
                    <div class="header">{ lang.get('abilities') }</div>
                    { ABILITY_VALUES.map((ability) => (
                        <div class="details">
                            <div class="name">
                                { abilityIcon(ability) && (
                                    <Icon icon={ abilityIcon(ability) } before />
                                ) || null }
                                { lang.get(`ability-${ ability }-name`) }
                            </div>
                            <div class="description">
                                { lang.get(`ability-${ ability }-description`) }
                            </div>
                        </div>
                    )) }
                </div>
                <div class="glossary-section">
                    <div class="header">{ lang.get('synergies') }</div>
                    { EFFECT_VALUES.map((effect) => (
                        <div class="details">
                            <div class="name">
                                { effectIcon(effect) && (
                                    <Icon icon={ effectIcon(effect) } before />
                                ) || null }
                                { lang.get(`effect-${ effect }-name`, null) || lang.get(`effect-${ effect }-type`) }
                            </div>
                            <div class="description">
                                { lang.get(`effect-${ effect }-description`) }
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
