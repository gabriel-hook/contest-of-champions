import {
    ROLE_ARENA,
    ROLE_QUEST,
    ROLE_ALLIANCE_QUEST,
    ROLE_ALLIANCE_WAR,
    ROLE_ALLIANCE_WAR_ATTACK,
    ROLE_ALLIANCE_WAR_DEFENSE,
} from './model/Champion';
import {
    IMAGE_BADGE_ARENA,
    IMAGE_BADGE_QUEST,
    IMAGE_BADGE_ALLIANCE_QUEST,
    IMAGE_BADGE_ALLIANCE_WAR,
} from '../util/images';

const roleIcons = {
    [ ROLE_ARENA ]: 'role-arena',
    [ ROLE_QUEST ]: 'role-quest',
    [ ROLE_ALLIANCE_QUEST ]: 'role-alliance-quest',
    [ ROLE_ALLIANCE_WAR ]: 'role-alliance-war',
    [ ROLE_ALLIANCE_WAR_ATTACK ]: 'role-alliance-war',
    [ ROLE_ALLIANCE_WAR_DEFENSE ]: 'role-alliance-war',
};

export function roleIcon(role) {
    return roleIcons[ role ] || 'circle';
}

const roleImages = {
    [ ROLE_ARENA ]: IMAGE_BADGE_ARENA,
    [ ROLE_QUEST ]: IMAGE_BADGE_QUEST,
    [ ROLE_ALLIANCE_QUEST ]: IMAGE_BADGE_ALLIANCE_QUEST,
    [ ROLE_ALLIANCE_WAR ]: IMAGE_BADGE_ALLIANCE_WAR,
    [ ROLE_ALLIANCE_WAR_ATTACK ]: IMAGE_BADGE_ALLIANCE_WAR,
    [ ROLE_ALLIANCE_WAR_DEFENSE ]: IMAGE_BADGE_ALLIANCE_WAR,
};

export function roleImage(role) {
    return roleImages[ role ];
}
