import { ROLE } from './model/Role';
import {
    IMAGE_BADGE_ARENA,
    IMAGE_BADGE_QUEST,
    IMAGE_BADGE_ALLIANCE_QUEST,
    IMAGE_BADGE_ALLIANCE_WAR,
} from '../images';

const roleIcons = {
    [ ROLE.ARENA ]: 'role-arena',
    [ ROLE.QUEST ]: 'role-quest',
    [ ROLE.ALLIANCE_QUEST ]: 'role-alliance-quest',
    [ ROLE.ALLIANCE_WAR ]: 'role-alliance-war',
    [ ROLE.ALLIANCE_WAR_ATTACK ]: 'role-alliance-war',
    [ ROLE.ALLIANCE_WAR_DEFENSE ]: 'role-alliance-war',
};

export function roleIcon(role) {
    return roleIcons[ role ] || 'circle';
}

const roleImages = {
    [ ROLE.ARENA ]: IMAGE_BADGE_ARENA,
    [ ROLE.QUEST ]: IMAGE_BADGE_QUEST,
    [ ROLE.ALLIANCE_QUEST ]: IMAGE_BADGE_ALLIANCE_QUEST,
    [ ROLE.ALLIANCE_WAR ]: IMAGE_BADGE_ALLIANCE_WAR,
    [ ROLE.ALLIANCE_WAR_ATTACK ]: IMAGE_BADGE_ALLIANCE_WAR,
    [ ROLE.ALLIANCE_WAR_DEFENSE ]: IMAGE_BADGE_ALLIANCE_WAR,
};

export function roleImage(role) {
    return roleImages[ role ];
}
