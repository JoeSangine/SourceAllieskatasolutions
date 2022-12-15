function getRandomColor(...colors){
	return colors[Math.floor(Math.random() * colors.length)];
}

module.exports = {
	getRandomColor
};