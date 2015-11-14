class Edge {
	constructor(id, source, target, data = {}) {
		this.id = id;
		this.source = source;
		this.target = target;
		this.data = data;

		const nodes = [this.source.id, this.target.id];
		nodes.sort();
		this.nodes = nodes.join('_');

		// Edge data field used by layout alorithm
		// this.data.length
		// this.data.type
	}
}

export default Edge;
