var CoC = CoC || {};
CoC.lang = CoC.lang || {};

CoC.lang['ru'] = {
  name:'Русский',
  model: { 
  
    //Champion name 
    'champion-blackbolt-name': 'Черный Гром',
    'champion-captainmarvel-name': 'Капитан Марвел',
    'champion-drax-name': 'Дракс',
    'champion-gamora-name': 'Гамора',
    'champion-msmarvel-name': 'Мисс Марвел',
    'champion-ronan-name': 'Ронан',
    'champion-spidermanblack-name': 'Черный Человек-Паук',
    'champion-superiorironman-name': 'Высший Железный Человек',
    'champion-thor-name': 'Тор',
    'champion-thorjanefoster-name': 'Джейн Фостер',
    'champion-venom-name': 'Веном',
    'champion-ironman-name': 'Железный Человек',
    'champion-ironpatriot-name': 'Железный Патриот',
    'champion-hulkbuster-name': 'Халкбастер',
    'champion-kang-name': 'Канг',
    'champion-rocket-name': 'Реактивный Енот',
    'champion-starlord-name': 'Звездный Лорд',
    'champion-vision-name': 'Вижн',
    'champion-thevision-name': 'Вижн Кино',
    'champion-ultron-name': 'Альтрон Прайм',
    'champion-warmachine-name': 'Воитель',
    'champion-colossus-name': 'Колосс',
    'champion-cyclops-name': 'Циклоп',
    'champion-deadpool-name': 'Дедпул',
    'champion-deadpoolxforce-name': 'Дедпул X-Force',
    'champion-magneto-name': 'Магнето',
    'champion-magnetomarvelnow-name': 'Белый Магнето',
    'champion-storm-name': 'Шторм',
    'champion-wolverine-name': 'Росомаха',
    'champion-blackpanther-name': 'Черная Пантера',
    'champion-blackwidow-name': 'Черная Вдова',
    'champion-daredevil-name': 'Сорвиголова',
    'champion-daredevilnetflix-name': 'Сорвиголова Netflix',
    'champion-elektra-name': 'Электра',
    'champion-hawkeye-name': 'Соколиный Глаз',
    'champion-moonknight-name': 'Лунный Рыцарь',
    'champion-punisher-name': 'Каратель',
    'champion-wintersoldier-name': 'Зимний Солдат',
    'champion-abomination-name': 'Мерзость',
    'champion-antman-name': 'Человек Муравей',
    'champion-captainamerica-name': 'Капитан Америка',
    'champion-captainamericawwii-name': 'Капитан Америка WWII',
    'champion-electro-name': 'Электро',
    'champion-hulk-name': 'Халк',
    'champion-joefixit-name': 'Джо Фиксит',
    'champion-rhino-name': 'Носорог',
    'champion-spidergwen-name': 'Спайдер Гвен',
    'champion-spiderman-name': 'Человек-Паук',
    'champion-spidermanmorales-name': 'Человек-Паук Моралес',
    'champion-yellowjacket-name': 'Желтый Шершень',
    'champion-drstrange-name': 'Доктор Стрэндж',
    'champion-ironfist-name': 'Железный Кулак',
    'champion-juggernaut-name': 'Джаггернаут',
    'champion-magik-name': 'Мэджик',
    'champion-scarletwitch-name': 'Алая Ведьма',
    'champion-unstoppablecolossus-name': 'Неудержимый Колосс',
    //Champion shortname 
    'champion-captainmarvel-shortname': 'Кэп Марвел',
    'champion-spidermanblack-shortname': 'Паук',
    'champion-superiorironman-shortname': 'Sup. Iron Man',
    'champion-thorjanefoster-shortname': 'Тор',
    'champion-rocket-shortname': 'Енот',
    'champion-deadpoolxforce-shortname': 'Голова',
    'champion-magnetomarvelnow-shortname': 'Магнит',
    'champion-captainamerica-shortname': 'Кэп',
    'champion-captainamericawwii-shortname': 'Кэп ВМВ',
    'champion-spidermanmorales-shortname': 'Моралес',
    'champion-drstrange-shortname': 'Док',
    'champion-unstoppablecolossus-shortname': 'Неуд',
    
    //Effect name 
    'effect-attack-name': 'Атака',
    'effect-stun-name': 'Оглушение',
    'effect-critrate-name': 'Вероятность крит. урона',
    'effect-critdamage-name': 'Крит. Урон',
    'effect-powergain-name': 'Увеличение Энергии',
    'effect-powersteal-name': 'Кража Энергии',
    'effect-perfectblock-name': 'Идеальный Блок',
    'effect-block-name': 'Вероятность ид. блока',
    'effect-armor-name': 'Броня',
    'effect-health-name': 'Здоровье',
    'effect-healthsteal-name': 'Кража здоровья',
    
    //Effect description 
    'effect-attack-description': 'увеличение урона на все атаки.',
    'effect-stun-description': 'шанс оглушения при спец. атаках.',
    'effect-critrate-description': 'Увеличение вероятности крит. урона.',
    'effect-critdamage-description': 'Increases damage multiplier for Critical hits.',
    'effect-powergain-description': 'Gain additional Power (used to trigger a special) whenever Power is gained.',
    'effect-powersteal-description': 'Gain Power (used to trigger a special) when attacking.',
    'effect-perfectblock-description': 'Увеличение шанса идеального блока - 0 урона в блоке.',
    'effect-block-description': 'увеличение эффективности блокирования - уменьшение урона в блоке.',
    'effect-armor-description': 'Увеличение брони, тем самым уменьшая получаемый урон.',
    'effect-health-description': 'Увеличение здоровья чемпиона.',
    'effect-healthsteal-description': 'Восполнение здоровья при атаке.',
    
    //Type name 
    'type-cosmic-name': 'Космос',
    'type-tech-name': 'Технологии',
    'type-mutant-name': 'Mutant',
    'type-skill-name': 'Skill',
    'type-science-name': 'Science',
    'type-mystic-name': 'Мутации',
    
    //Crystal name 
    'crystal-versus-name': 'Кристалл за битвы',
    'crystal-arena-name': 'Кристалл Арены',
    'crystal-alliance-name': 'Кристалл союза',
    'crystal-daily-name': 'Ежедневный кристалл',
    'crystal-2star-name': 'Кристалл героя с 2-мя звездами',
    'crystal-premium-name': 'Усиленный кристалл героя',
    'crystal-3star-name': 'Кристалл героя с 3-мя звездами',
    'crystal-4star-name': 'Кристалл героя с 4-мя звездами',
    
    //Crystal description (keep $CURRENCY$ tokens for image replacement) 
    'crystal-versus-description': 'Даётся за победу на арене 1vs1.',
    'crystal-arena-description': 'Покупается за 2000 $BATTLECHIPS$.',
    'crystal-alliance-description': 'Покупается за 1000 $LOYALTY$.',
    'crystal-daily-description': 'Появляется каждые 24 часа.',
    'crystal-premium-description': 'Покупается за 100 $UNITS$.',
    'crystal-3star-description': 'Покупается за 400 $UNITS$, редкая акция.',
    'crystal-4star-description': 'Покупается за 2500 $UNITS$, очень редкая акция.',

    //Algorithm name
    'algorithm-greedy-name': 'Greedy',
    'algorithm-shuffle-name': 'Shuffle',

    //Algorithm description
    'algorithm-greedy-description': 'SLOW. This picks the best team mathematically given all parameters.',
    'algorithm-shuffle-description': 'FAST. This chooses the best combinations of teams possible.',
  },
  string: { 
  
      //Listing words 
    'of': 'of',
    'with': 'with',
    'found': 'Found',
    'extras': 'Extras',
    
    //Common words/sections 
    'team': 'Team',
    'teams': 'Teams',
    'guide': 'Guide',
    'guides': 'Guides',
    'champion': 'Champion',
    'champions': 'Champions',
    'synergy': 'Synergy',
    'synergies': 'Synergies',
    'crystal': 'Crystal',
    'crystals': 'Crystals',
    'roster': 'Roster',
    
    //Roster Panel 
    'manage': 'Manage',
    'add-champion': 'Добавить чемпиона',
    'import-csv': 'Импорт .csv',
    'export-csv': 'Экспорт .csv',
    'delete-all': 'Удалить всех',
    'sort': 'Сортировать',
    'filter': 'Фильтр',
    
    //Roster Config 
    'stars': 'Stars',
    'type': 'Type',
    'name': 'Имя',
    
    'rank': 'Ранг',
    'level': 'Уровень',
    'awakened': 'Awakened',
    'quest': 'Quest',
    'view-guide': 'View Guide',
    
    'delete': 'Удалить',
    'cancel': 'Отмена',
    
    'ask-delete': 'Вы уверены, что хотите удалить?',
    'ask-delete-all': 'Вы уверены, что хотите удалить всех чемпионов?',
    'cannot-undo': 'This action cannot be undone.',
    
    //Team Panel 
    'advanced-settings': 'Advanced Settings',
    'team-size': 'Team Size',
    'algorithm': 'Algorithm',
    'quest-group': 'Quest Group',
    'build': 'Build',
    
    //Add Champion Page 
    'add-all': 'Add All',
    
    //Advanced Settings Page 
    'reset-defaults': 'Reset to Defaults',
    'champion-weights': 'Champion Weights',
    'synergy-weights': 'Synergy Weights',
    'duplicate-weights': 'Duplicate Class Weights',
    'choose-preset': 'Choose a preset...',
    'use-levels': 'Calculate using stars / ranks / levels',
    
    //Tuples 
    'double': 'Double',
    'triple': 'Triple',
    'quadruple': 'Quadruple',
    'quintuple': 'Quintuple',
    
    //Guide Page 
    'choose-guide': 'Choose a guide',
    
    //Sharing 
    'share-to': 'Share to',
    'facebook': 'Facebook',
    'twitter': 'Twitter',
    'google': 'Google',
    'tools': 'Tools',
    'synergy-map': 'Synergy Map',
    'roster-manager': 'Roster Manager',
    
    //Onboarding Messages 
    'onboarding-synergies': 'Use the roster manager tool to add more champions to your roster.',
    'onboarding-roster': 'Use the options menu to add new champions',
    'onboarding-teams': 'Use the Build menu create your teams!',
    
    //Guide 
    'coming-soon': 'Coming Soon...',
    'gameplay': 'Gameplay',
    'special': 'Special',
    'signature': 'Signature Ability',
    'heavy-attack': 'Heavy Attack',
    'abilities': 'Abilities',
    
    'grade': 'Grade',
    'strategy': 'Strategy',
    
    'damage-type': 'Damage Type',
    'range': 'Range',
    'note': 'Note',
    
    'synergies-external': 'External Synergies',
    
    'none': 'None',
  }
};
