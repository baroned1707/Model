/** @format */
const fs = require("fs");
const path = require("path");

const random = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};

const genData = (length) => {
	var data = [];
	for (var i = 0; i < length; i++) {
		data.push({
			position: {
				cas: random(0, 4),
				call: random(0, 4),
				mak: random(0, 4),
				deli: random(0, 4),
			},
			shopID: random(0, 17),
			day: random(0, 7),
			date: random(1, 30),
			month: random(1, 12),
			year: random(2018, 2022),
			time: random(0, 24) * 60,
		});
	}
	return data;
};

const groupByPosition = (data, count) => {
	var result = [];
	data.map((item, index) => {
		if (result.length == 0) {
			result.push({
				index: result.length,
				data: [item],
			});
		} else {
			let check = true;
			for (var i = 0; i < result.length; i++) {
				if (JSON.stringify(result[i].data[0].position) === JSON.stringify(item.position)) {
					result[i].data.push(item);
					check = false;
					break;
				}
			}
			if (check) {
				result.push({
					index: result.length,
					data: [item],
				});
			}
		}
		var pathFile = path.join(process.cwd(), "data.json");
		fs.writeFileSync(pathFile, JSON.stringify(result));
		console.clear();
		console.log("Running to index ", count, " : ", ((index / data.length) * 100).toFixed(5), "%");
	});
	return result;
};

const run = () => {
	for (var i = 0; i < 100; i++) {
		var pathFile = path.join(process.cwd(), "data", `data${i}.json`);
		var data = genData(100000);
		data = groupByPosition(data, i);
		fs.writeFileSync(pathFile, JSON.stringify(data));
	}
};

run();
