const frame = document.querySelector('section');
const api_key = 'AIzaSyBSJ-kdPjUQEk9rtYFgHg9Gxbm5f2NfAGo';
const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
const pid = 'PL7xqVk2j6DQvIFBj0goyv3OYqsiQR6-2X';
const num = 5;
const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
const tit_len = 30;
const desc_len = 180;

fetch(resultURL)
	.then((data) => data.json())
	.then((json) => {
		console.log(json.items);
		let tags = '';

		json.items.map((data) => {
			let desc = data.snippet.description;
			desc.length > desc_len ? (desc = desc.substr(0, desc_len) + '...') : desc;

			//날자값 가공
			let date = data.snippet.publishedAt.split('T')[0];
			date = date.split('-').join('.');

			tags += `
				<article>
					<h2>${data.snippet.title.length > tit_len ? data.snippet.title.substr(0, tit_len) + '...' : data.snippet.title}</h2>
					<div class='txt'>
						<p>${desc}</p>
						<span>${date}</span>
					</div>
					<div class='pic'>
						<img src='${data.snippet.thumbnails.standard.url}' />
					</div>					
				</article>
			`;
		});

		frame.innerHTML = tags;
	});
