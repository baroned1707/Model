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

const groupByPosition = (data) => {
	var result = [];
	data.map((item, i) => {
		if (result.length == 0) {
			result.push({
				index: result.length,
				data: [item],
			});
		} else {
			let check = true;
			result.map((cur) => {
				if (
					cur.data.some(
						(itemResult) => JSON.stringify(itemResult.position) === JSON.stringify(item.position),
					)
				) {
					cur.data.push(item);
					check = false;
				}
			});
			if (check) {
				result.push({
					index: result.length,
					data: [item],
				});
			}
		}
		console.clear();
		console.log("Running to: ", ((i / data.length) * 100).toFixed(5), "%");
	});
	return result;
};

const run = () => {
	var pathFile = path.join(process.cwd(), "data.json");
	var data = genData(10000000);
	data = groupByPosition(data);
	fs.writeFileSync(pathFile, JSON.stringify(data));
	console.log("Gen data done with: ", data.length, " label");
};

run();
