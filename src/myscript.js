var iMusic = {};
(function(){
    var musicEl = document.createElement('div');
    musicEl.className = ['topbar', 'music_icon'].join(' ');
    musicEl.innerHTML = [
        '<div class="music_1"></div>',
		'<div class="music_2"></div>',
		'<div class="music_3"></div>',
		'<span class="music_txt">music</span>'
    ].join('');
    $('html').append(musicEl);

    setTimeout(() => {
        Music.init();
    }, 500);
})();