'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = 'QUOC-DAT';
const MUSIC_STORAGE_KEY = 'QUOC-DAT';

const appContainers = Array.from($$('.app__container'));
const header = $('.header');
const navSettingMenu = $('.header__setting-list');
const navSettingBtn = $('.header__setting');
// const playlist = $('.playlist__list');
const songLists = Array.from($$('.playlist__list'));
const heading = $('.music-controls-left-content-song');
const singerSong = $('.music-controls-left-content-singer');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play')
const player = $('.player');
const progress = $('.progress');
const progressTracks = Array.from($$('.progress__track.song--track .progress__track-update'));
const prevBtn = $('.btn-prev');
const nextBtn = $('.btn-next');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const slideImgs = $$('.container__slide-item');
const songActives = document.getElementById('playlist').children[0];
const playAllBtns = $$('.btn--play-all');
const volume = $('.music-controls__right-volume-icon')
const iconMute = $('.icon-mute');
const iconDown = $('.icon-down');
const volumes = Array.from($$('.volume__range'));
const volumeBtns = Array.from($$('.music-controls__right-icon.volume.option-btn'))
const volumeIcons = Array.from($$('.volume .btn--icon'));
const volumeTracks = Array.from($$('.progress__track.volume--track .progress__track-update'));
// const songLists = Array.from($$('.playlist__list'));
const themeBtn = $('.header__nav-btn.nav-btn--theme');
const modalTheme = $('.modal-theme'); 
const closeTheme = $('.modal__close-btn');

const time_start = $('.controls_time--left');
time_start.textContent = '00:00'
const time_count = $('.controls_time--right');
time_count.textContent = '00:00'



const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    currentPlaylist: 0,
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    songPlaylists: JSON.parse(localStorage.getItem(MUSIC_STORAGE_KEY)) || {},
    songs: [
        {
            name: "??m Em L???n Cu???i (Lofi Version)",
            singer: "Freak D,NIT,Sing",
            time: "03:36",
            path: "./assets/songs/song6.mp3",
            image: "./assets/img/song/song6.jpg"
        },
        {
            name: "Y??u Kh??c Th????ng H???i",
            singer: "Thanh H??ng",
            time: "06:03",
            path: "./assets/songs/song10.mp3",
            image: "./assets/img/song/song10.jpg"
        },
        {
            name: "Li???u Gi???",
            singer: "2T, V??n",
            time: "04:18",
            path: "./assets/songs/song5.mp3",
            image: "./assets/img/song/song5.jpg"
        },
        {
            name: "S??? Kh??ng C??n N???a",
            singer: "Tu???n H??ng",
            time: "05:25",
            path: "./assets/songs/song8.mp3",
            image: "./assets/img/song/song8.jpg"
        },
        {
            name: "M???t Nh??",
            singer: "Da LAB",
            time: "03:05",
            path: "./assets/songs/song1.mp3",
            image: "./assets/img/song/song1.jpg"
        },
        {
            name: "C?? H???n V???i Thanh Xu??n",
            singer: "MONSTAR",
            time: "03:38",
            path: "./assets/songs/song2.mp3",
            image: "./assets/img/song/song2.jpg"
        },
        {
            name: "K??? ??i??n Tin V??o T??nh Y??u",
            singer: "Lil Zpoet",
            time: "04:36",
            path: "./assets/songs/song3.mp3",
            image: "./assets/img/song/song3.jpg"
        },
        {
            name: "Gh?? Qua",
            singer: "Dick,Tofu,PC",
            time: "03:56",
            path: "./assets/songs/song4.mp3",
            image: "./assets/img/song/song4.jpg"
        },
        {
            name: "H???n Ki???p Sau",
            singer: "Kh??? Hi???p",
            time: "05:45",
            path: "./assets/songs/song7.mp3",
            image: "./assets/img/song/song7.jpg"
        },
        {
            name: "N?????c M???t Chia ????i",
            singer: "D????ng Thi??n Minh",
            time: "05:19",
            path: "./assets/songs/song9.mp3",
            image: "./assets/img/song/song9.jpg"
        },
    ],

    setconfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
    },

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="playlist__list-song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="playlist__song-info media__left">
                    <div class="playlist__song-thumb media__thumb mr-10" style="background: url('${song.image}') no-repeat center center / cover">
                    <div class="thumb--animate">
                        <div class="thumb--animate-img" style="background: url('./assets/img/song/icon-playing.gif') no-repeat 50% / contain;">
                        </div>
                    </div>
                    <div class="play-song--actions">
                        <div
                            class="control-btn btn-toggle-play-song btn--play-song">
                            <i class="fa-solid fa-play"></i>
                        </div>
                    </div>
                </div>
                <div class="playlist__song-body media__info">
                    <span class="playlist__song-title info__title">
                        ${song.name}
                    </span>
                    <p class="playlist__song-author info__author">
                        ${song.singer}
                    </p>
                </div>
                </div>
                    <div class="playlist__song-time media__content">
                        <span>${song.time}</span>
                    </div>
                    <div class="playlist__song-option  media__right">
                        <div class="playlist__song-btn btn--mic option-btn hide-on-mobile">
                            <i class="btn--icon song__icon fa-solid fa-microphone"></i>
                        </div>
                        <div class="playlist__song-btn song-btn--heart option-btn hide-on-mobile">
                            <i class="fas fa-heart btn--icon song__icon icon--heart primary"></i>

                        </div>
                        <div class="playlist__song-btn option-btn hide-on-tablet">
                            <i class="fa-solid fa-ellipsis btn--icon"></i>
                        </div>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },

    handleEvents: function () {
        const _this = this;

        //x??? l?? modal theme
        themeBtn.onclick = function () {
            modalTheme.classList.add('open');
        }
        modalTheme.onclick = (e) => {
            const themeContainer = e.target.closest('.modal-theme .modal-container')
            if(themeContainer) {
                e.stopPropagation()
            } else {
                modalTheme.classList.remove('open')
            }
        }
        closeTheme.onclick = function () {
            modalTheme.classList.remove('open');
        }


        //x??? l?? click settings
        document.onclick = (e) => {
            navSettingMenu.classList.remove('open')
        }
        navSettingMenu.onclick = (e) => {
            e.stopPropagation();
        }
        navSettingBtn.onclick = (e) => {
            e.stopPropagation()
            navSettingMenu.classList.toggle('open')
        }

        //x??? l?? quay ????a cd
        const cdThumAnimate = cdThumb.animate([
            // keyframes
            { transform: 'rotate(360deg)' }
        ], {
            // timing options
            duration: 20000, // 20 second - th???i gian quay h???t 1 v??ng
            iterations: Infinity
        });
        cdThumAnimate.pause();

        playAllBtns.forEach(playAllBtn => {
            playAllBtn.onclick = function() {
                _this.currentIndex = 0;
                const songActives = $$(`.playlist__list-song[data-index="${_this.currentIndex}"]`)
                _this.loadCurrentSong();
                Array.from($$('.playlist__list-song.active')).forEach(songActive => {
                    songActive.classList.remove('active');
                })
                Array.from(songActives).forEach(songActive => {
                    songActive.classList.add('active');
                })
                _this.loadCurrentSong();
                _this.scrollToActiveSong();
                audio.play();
            }
        })

        // X??? l?? khi click v??o btn play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }
        // const songActives = Array.from($$('.playlist__list-song.active'))
        // _this.isPlaying = true;
        // songActives.forEach(songActive => {
        //     songActive.classList.add('playing')
        // })
        // player.classList.add('playing');
        // playerInfos.forEach(playerInfo => {
        //     playerInfo.classList.add('playing')
        // })

        audio.onplay = function () {
            const songActives = Array.from($$('.playlist__list-song.active'))
            _this.isPlaying = true;
            songActives.forEach(songActive => {
                songActive.classList.add('playing')
            })
            player.classList.add('playing');
            cdThumAnimate.play();
        }

        audio.onpause = function () {
            const songActives = Array.from($$('.playlist__list-song.active'))
            _this.isPlaying = false;
            songActives.forEach(songActive => {
                songActive.classList.remove('playing')
            })
            player.classList.remove('playing');
            cdThumAnimate.pause();
        }

         

        // X??? l?? khi ti???n ????? b??i h??t thay ?????i
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent

                // X??? l?? t??nh th???i gian c???a b??i h??t
                // Time Start
                var time_start_loading = Math.floor(audio.currentTime); // th???i gian hi???n t???i b??i h??t ??ang ch???y
                var time_start_seconds = time_start_loading % 60; // s??? gi??y
                var time_start_minutes = Math.floor(time_start_loading / 60); // s??? ph??t
                if (time_start_seconds < 10) {
                    var time_start_seconds_tent = 0; // s??? ch???c gi??y
                } else {
                    time_start_seconds_tent = "";
                }
                time_start.textContent = '0' + time_start_minutes + ":" + time_start_seconds_tent + time_start_seconds;

                progressTracks.forEach(progressTrack => {
                    progressTrack.style.width = Math.round(audio.currentTime / audio.duration * 100) + '%';
                })
                // Time Count
                // Time Count
                var time_count_loading = Math.floor(audio.duration); // T???ng s??? th???i gian b??i h??t
                var time_count_seconds = time_count_loading % 60; //s??? gi??y
                var time_count_minutes = Math.floor(time_count_loading / 60); //s??? ph??t
                if (time_count_seconds < 10) {
                    var time_count_seconds_ten = 0; // s??? ch???c gi??y
                } else {
                    time_count_seconds_ten = "";
                }

                time_count.textContent = '0' + time_count_minutes + ":" + time_count_seconds_ten + time_count_seconds;
            }
        }

        // X??? l?? khi tua
        progress.oninput = function (e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }

        //x??? l?? next song 
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        //x??? l?? prev song 
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        //X??? l?? random b??i h??t
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            _this.setconfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        //X??? l?? l???p l???i song
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            _this.setconfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        //X??? l?? khi k???t th??c song th?? chuy???n b??i
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        }

        //X??? l?? khi click mic in list songs
        // playlist.onclick = function (e) {
        //     // const micIcon = e.target.closest('.fa-microphone')
        //     const micIconBtn = e.target.closest('.btn--mic')
        //     const micIcon = micIconBtn.firstElementChild
        //     micIcon.classList.toggle('primary')
        // }

        // Set background for header when scroll
        appContainers.forEach(appContainer => {
            appContainer.onscroll = function () {
                const scrollTop = appContainer.scrollY || appContainer.scrollTop;
                if (scrollTop > 5) {
                    Object.assign(header.style, {
                        backgroundColor: 'var(--layout-bg)',
                        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.08)',
                    })
                } else {
                    Object.assign(header.style, {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    })
                }
            }
        })


        // X??? l?? khi click v??o playlist
        songLists.forEach(songlist => {
            songlist.onclick = (e) => {
                const songNode = e.target.closest('.playlist__list-song:not(.active)');
                const optionNode = e.target.closest('.playlist__song-option');
                const micIconBtn = e.target.closest('.btn--mic');
                const heartIconBtn = e.target.closest('.song-btn--heart');
                const songActions = $(`.playlist__list-song[data-index="0"]`);

                if(songActions && !optionNode){
                    audio.play();
                }
               
                if(songNode && !optionNode ) {
                    // Handle when clicking on the song
                    if(songNode) {
                        _this.currentIndex = Number(songNode.dataset.index);
                        const songActives = $$(`.playlist__list-song[data-index="${_this.currentIndex}"]`)
                        _this.loadCurrentSong();
                        Array.from($$('.playlist__list-song.active')).forEach(songActive => {
                            songActive.classList.remove('playing')
                            songActive.classList.remove('active');
                        })
                        Array.from(songActives).forEach(songActive => {
                            songActive.classList.add('active');
                        })
                        audio.play();
                    }
                }

                if(heartIconBtn) {
                    const heartIcon = heartIconBtn.firstElementChild
                    if(heartIcon.classList.contains('primary')){
                        heartIcon.classList.replace('bi-heart-fill', 'bi-heart');
                    }else {
                        heartIcon.classList.replace('bi-heart', 'bi-heart-fill');
                    }
                    heartIcon.classList.toggle('primary');
                }

                if(micIconBtn) {
                    const micIcon = micIconBtn.firstElementChild
                    micIcon.classList.toggle('primary');
                }
            }
        })


        let imgIndex = 2;
        function slideShow() {
            const slideImgFirst = $('.container__slide-item.first')
            const slideImgSecond = $('.container__slide-item.second')
            const slideImgThird = slideImgs[imgIndex]
            const slideImgFourth = slideImgs[imgIndex === slideImgs.length -1 ?  0 : imgIndex + 1]
            slideImgFourth.classList.replace('fourth', 'third')
            slideImgThird.classList.replace('third', 'second')
            slideImgSecond.classList.replace('second', 'first')
            slideImgFirst.classList.replace('first', 'fourth')
            imgIndex++;
            if(imgIndex >= slideImgs.length) { //imgIndex: 0-7, slideImgs.length: 8
                imgIndex = 0;
            }
            setTimeout(slideShow, 2000)
        }
        slideShow();



        //Handle adjust volume change
        function changeVolume(index) {
            if(audio.volume * 100 != volumes[index].value) {
                audio.volume = volumes[index].value / 100;
                volumeTracks.forEach(volumeTrack => {
                    volumeTrack.style.width = volumes[index].value + '%';
                })
                _this.setconfig('currentVolume', volumes[index].value)
                if (!audio.volume) {
                    volumeIcons.forEach(volumeIcon => {
                        volumeIcon.classList.replace('fa-volume-high', 'fa-volume-mute');
                    })
                } else {
                    volumeIcons.forEach(volumeIcon => {
                        volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-high')
                    })
                }
            }
        }


        volumeBtns.forEach((volumeBtn, index) => {
            volumeBtn.onclick = (e) => {
                let currentVolume;
                if(audio.volume > 0) {
                    currentVolume = 0;
                } else {
                    if(volumes[index].value > 0) {
                        currentVolume = volumes[index].value
                    } else {
                        currentVolume = 100;
                        volumes.forEach(volume => {
                            volume.value = 100;
                        })
                    }
                }
                audio.volume = currentVolume / 100;
                volumeTracks.forEach(volumeTrack => {
                    volumeTrack.style.width = currentVolume + '%';
                })
                _this.setconfig('currentVolume', currentVolume)
                if (!audio.volume) {
                    volumeIcons.forEach(volumeIcon => {
                        volumeIcon.classList.replace('fa-volume-high', 'fa-volume-mute');
                    })
                } else {
                    volumeIcons.forEach(volumeIcon => {
                        volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-high')
                    })
                }
            }
        })

        
        volumes.forEach((volume, index) => {
            volume.onchange = function(e) {
                changeVolume(index);
            }
            volume.onmousedown = (e) => {
                _this.isChangeVolume = true;
            }
            volume.onmouseup = () => {
                _this.isChangeVolume = false;
            }
            volume.onmousemove = function(e) {
                if(_this.isChangeVolume === true) {
                    changeVolume(index);
                    e.stopPropagation();
                }
            }
            // Use addEventListener to fix the bug when the first loading
            volume.addEventListener('touchstart', function(e) {
                _this.isChangeVolume = true;
            })
            volume.addEventListener('touchend', function(e) {
                _this.isChangeVolume = false;
            })
            volume.addEventListener('touchmove', function(e) {
                if(_this.isChangeVolume === true) {
                    changeVolume(index);
                    e.stopPropagation();
                }
            })
        })
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        singerSong.innerHTML = this.currentSong.singer;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },

    //scroll into view
    scrollToActiveSong: function () {
        setTimeout(function () {
            $('.playlist__list-song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }, 300);
    },

    nextSong: function () {
        this.currentIndex++; //T??ng v??? tr?? song th??m 1
        //ki???m tra n???u t???i b??i cu???i c??ng th?? quay l???i ban ?????u
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    loadconfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    prevSong: function () {
        this.currentIndex--; //T??ng v??? tr?? song th??m 1
        //ki???m tra n???u t???i b??i cu???i c??ng th?? quay l???i ban ?????u
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex);

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    start: function () {

        // d???nh ngh??a c??c thu???c t??nh cho obj
        this.defineProperties();

        // L???ng nge c??c s??? ki???n Dom/events
        this.handleEvents();

        // T???i th??ng tin b??i h??t ?????u ti??n
        this.loadCurrentSong();

        this.render();
    }
}

app.start();