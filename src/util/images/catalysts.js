import ImageTransformer, { colorize, multiply, gamma } from './ImageTransformer';

const catalystImages = {
    'tier-1-alpha': require('../../images/catalysts/tier_1_alpha.png'),
    'tier-2-alpha': require('../../images/catalysts/tier_2_alpha.png'),
    'tier-3-alpha': require('../../images/catalysts/tier_3_alpha.png'),
    'tier-4-alpha': require('../../images/catalysts/tier_4_alpha.png'),
    'tier-5-alpha': require('../../images/catalysts/tier_5_alpha.png'),
    'tier-1-basic': require('../../images/base/catalyst-1.png'),
    'tier-2-basic': require('../../images/base/catalyst-2.png'),
    'tier-3-basic': require('../../images/base/catalyst-3.png'),
    'tier-4-basic': require('../../images/base/catalyst-4.png'),
    'tier-5-basic': require('../../images/base/catalyst-5.png'),
};

const catalystColors = {
    cosmic: '#3af',
    tech: '#23f',
    mutant: '#fa0',
    skill: '#f30',
    science: '#0a0',
    mystic: '#90f',
};

[ 1, 2, 3, 4, 5 ].forEach((tier) => {
    const base = new ImageTransformer(catalystImages[ `tier-${ tier }-basic` ]);
    [ 'cosmic', 'tech', 'mutant', 'skill', 'science', 'mystic' ].forEach((type) => {
        catalystImages[ `tier-${ tier }-${ type }` ] = base.clone()
            .transform(gamma(1.5))
            .transform(colorize(catalystColors[ type ]))
            .transform(multiply(1.75))
            .toDataUrl();
    });
});

export function catalystImage(uid) {
    return catalystImages[ uid ];
}
