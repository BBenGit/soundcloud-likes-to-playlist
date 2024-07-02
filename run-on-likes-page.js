(() => {
	const selectorsAll = [
		'.sc-button-more',
		'.sc-button-addtoset',
		'.addToPlaylistButton'
	];

	addToPlaylist(selectorsAll);

	function addToPlaylist (_selectors) {
		const selectors = [..._selectors];

		const currentSelector = selectors.shift()
		selecting(currentSelector)
			.then(element => {
				if(currentSelector === '.addToPlaylistButton'){
					if (element.getAttribute('title') === ''){
						setTimeout(() => {
							element.click()
							document.querySelector('.badgeList__item').remove();
							addToPlaylist([...selectorsAll])
						}, 1000)
					}else{
						document.querySelector('.badgeList__item').remove();
						addToPlaylist([...selectorsAll])
					}
				}else{
					element.click()
					addToPlaylist(selectors)
				}
			})
			.catch(err => {
				console.error('Something went wrong!');
				console.trace(err);
			});
	}

	function selecting (selector) {
		return new Promise((resolve, reject) => {
			const pooling = setInterval(() => {
				const element = document.querySelector(selector);

				if (element) {
					resolve(element);
				}
			}, 100);

			setTimeout(() => {
				clearInterval(pooling);
				reject();
			}, 5000);
		});
	}
})();
