var wordlist = [];

export const getWordlist = function() {
	var http = new XMLHttpRequest();
	
	http.open("GET", "/wordlist2.txt", true);
	http.onreadystatechange = function () {
		if (http.readyState === 4 && http.status === 200) {
			wordlist = http.responseText.split("\n");
		}
	};
	http.send();
	return wordlist;
}