var Music = {
	imgLoaded: false,

	cache:{},

	init:function(){
		this.render();
		this.evtBind();
	},

	render: function(){
		var xtpl = '<li class="song" data-id="{id}"><img data-src="{cover}?param=280y280" alt="{title}"><span>{title}</span><b>{count}</b><i class="fa fa-play-circle-o icon"></i></li>';
	    var str = '<div class="song-list" ondragstart="return false;"><div class="title">WHOAMI\'s song list<span class="tag">© from barretlee</span></div><div class="music_list"><ul>';
	    for (var key in nmlist) {
	      str += xtpl.replace(/\{([^\}]+?)\}/g, function(m0, m1) {
	        return nmlist[key][m1];
	      });
	    }
	    str += '<div class="clear"></div></ul></div></div>';

		$('html').append(str);
	},

	evtBind: function(){
		var self = this;

		$('#nmlist img').each(function() {
          $(this).attr('src', $(this).attr('data-src')).hide().fadeIn();
        });

		$('.music_icon').click(function(e){
			var $el = $(e.currentTarget);

			var funcUp = $el.hasClass('down')?'addClass':'removeClass',
				funcDown = $el.hasClass('down')?'removeClass':'addClass';

			$('.song-list')[funcDown]('down-in')[funcUp]('up-out');

			$el.toggleClass('up').toggleClass('down');

			if(!Music.imgLoaded) {
				Music.imgLoaded = true;
		        $('.song-list img').each(function() {
		          $(this).attr('src', $(this).attr('data-src')).hide().fadeIn();
		        });
			}
		});

		$('li.song').click(function(e){
            var aplayerEl =  document.getElementById('aplayer');
            if(!aplayerEl){
                var tpl = [
                    '<div id="aplayer" class="aplayer"></div>'
                ];
    
                $(tpl.join('')).appendTo($('html')).iDrag();
            }

			var id = e.currentTarget.getAttribute('data-id'),
				music = self.cache[id];

			if(music){
				self.start(music);
            }

            music = iMusic['jsonp' + id];
            self.cache[id] = music;
			self.start(music);
		});
	},

	start: function(music){
		var songs = [];
		for(var i=0; i<music.songs.length; i++){
			var item = music.songs[i];
			songs.push({
				title: item.title,
				author: music.collect_author,
				url: item.mp3,
				pic: music.collect_cover + "?param=280y280"
			});
		}

		var option = {
			element: document.getElementById('aplayer'),
			narrow: false,
			autoplay: true,
			showlrc: 0,
			mutex: true,
			theme: '#e6d0b2',
			loop: true,
			preload: 'metadata',
			music: songs
		}

		iMusic.ap = new APlayer(option);
		iMusic.ap && iMusic.ap.init();

		this.restart();
		$(".aplayer-list").addClass('aplayer-list-hide');
	},

	pause: function() {
		iMusic.ap && iMusic.ap.pause();
	},

	restart: function() {
		iMusic.ap && iMusic.ap.play();
	},
};