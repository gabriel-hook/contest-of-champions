import champions, { uids } from '../data/champions';

console.log(uids)

export default {
	all(){
		return champions.slice();
	}
};
