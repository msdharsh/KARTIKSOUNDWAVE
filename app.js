let url = "/songsArr.json";

fetch(url)
  .then((res) => res.json())
  .then((songss) => {
    let songs = songss;

    let currentid = 0;
    let body = document.body;

    //! playlist header
    let playlist_header = document.getElementById("playlist_header");
    function playlist_header_change(e) {
      playlist_header.innerHTML = `  <img
  src="./cover/nu img ${e}.jpg"
  alt="img_1"
  class="playlist_header_img"
  />
  <h2 class="playlist_header_title">
  <marquee scrollamount="10" >${songs[e].songName}</marquee>
  </h2>
 `;
    }

    playlist_header_change(currentid);

    //! song Container -  playlist
    let songsCon = document.getElementById("songsCon");
    songs.forEach((e) => {
      songsCon.innerHTML += ` 
  <div class="song_card">
<div class="song_card_tit_img"> 
 <img src="./cover/nu img ${e.id}.jpg" alt="card1img" class="song_card_img">
<p class="songcard_title"> ${e.songName}</p>
</div>
  <div class="time_play_btn">
  <span class="song_duration song_card_btns">${e.du}</span>
    <button class="playsong_btn song_card_btns">      <i class="target_btn fa-regular fa-2x music fa-circle-play"  id=${e.id}></i></button>
    <span class="song_card_btns download_btn"><a href="songs/${e.id}.mp3" download="${e.songName}"><i class="fa-solid fa-download"></i></a></span>
    </div>
</div>
  `;
    });

    let audio = new Audio(`songs/0.mp3`);
    let target_btn = document.querySelectorAll(".target_btn");
    let currtarget = target_btn[currentid];

    //! Play song from playlist
    let playsong = document.getElementsByClassName("playsong_btn");
    Array.from(playsong).forEach((el) => {
      el.addEventListener("click", playis);
    });
    function playis(e) {
      currentid = parseInt(e.target.id);
      musicPlayer(currentid); //? song ablum;
      playlist_header_change(currentid);
      currtarget = e.target;
      audio.src = `songs/${currentid}.mp3`;

      if (
        currtarget.classList ==
        "target_btn fa-regular fa-2x music fa-circle-play"
      ) {
        currtarget.classList.remove("fa-circle-play");
        currtarget.classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        masterplay_playbox.classList.remove("fa-circle-play");
        masterplay_playbox.classList.add("fa-circle-pause");
        playlist_play_btn_icon.classList.remove("fa-play");
        playlist_play_btn_icon.classList.add("fa-pause");
        if (body.clientWidth < 500) {
          document.getElementById("container1").style.display = "none";
          document.getElementById("container2").style.display = "inline";
        }
        audio.play();
      } else {
        currtarget.classList.remove("fa-circle-pause");
        currtarget.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        masterplay_playbox.classList.remove("fa-circle-pause");
        masterplay_playbox.classList.add("fa-circle-play");
        playlist_play_btn_icon.classList.remove("fa-pause");
        playlist_play_btn_icon.classList.add("fa-play");
        audio.pause();
      }
      prefunc(e.target);
    }
    //! Disable previous clicked buttons
    let previousBtn = null;
    function prefunc(e) {
      if (previousBtn !== null) {
        if (previousBtn !== currtarget) {
          previousBtn.classList.remove("fa-circle-pause");
          previousBtn.classList.add("fa-circle-play");
        }
      }
      previousBtn = e;
    }

    //! Music Player  album
    function musicPlayer(e) {
      let album = document.getElementById("album");
      album.innerHTML = `<div class="album_img_title">
     <img src="./cover/nu img ${e}.jpg" alt="album_picture" class="album_picture">
   </div>
   <div class="song_ti_name">
     <p><marquee scrollamount="5">${songs[e].songName}</marquee></p>
   </div>
   <div class="icons">
     <img src="./assets/album_icon1.png" alt="album_icon1" class="album_icon" style="height: 1.5rem; margin-top: 4px;">
     <img src="./assets/album_icon2.png" alt="album_icon2" class="album_icon">

   </div>`;

      let container_play_album = document.getElementById(
        "container_play_album"
      );
      container_play_album.innerHTML = ` <div class="playing_covers">
   <img
     src="cover/nu img ${e}.jpg"
     class="paying_cover_img"
   />
 </div>
 <h3 class="playing_title" id="playing_title">
<marquee>${songs[e].songName}</marquee>
 </h3>
`;
    }

    //! Master play button
    let masterPlay = document.getElementById("master_player");
    masterPlay.addEventListener("click", () => {
      masterplay_play();
    });
    function masterplay_play() {
      if (audio.paused) {
        audio.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        masterplay_playbox.classList.remove("fa-circle-play");
        masterplay_playbox.classList.add("fa-circle-pause");
        currtarget.classList.remove("fa-circle-play");
        currtarget.classList.add("fa-circle-pause");
        playlist_play_btn_icon.classList.remove("fa-play");
        playlist_play_btn_icon.classList.add("fa-pause");
        musicPlayer(currentid);
        playlist_header_change(currentid);
        prefunc(currtarget);
      } else {
        audio.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        masterplay_playbox.classList.remove("fa-circle-pause");
        masterplay_playbox.classList.add("fa-circle-play");
        currtarget.classList.remove("fa-circle-pause");
        currtarget.classList.add("fa-circle-play");
        playlist_play_btn_icon.classList.remove("fa-pause");
        playlist_play_btn_icon.classList.add("fa-play");
        musicPlayer(currentid);
        playlist_header_change(currentid);
        prefunc(currtarget);
      }
    }

    //! playlist play btn
    let playlist_play = document.getElementById("playlist_play_btn");
    let playlist_play_btn_icon = document.getElementById(
      "playlist_play_btn_icon"
    );
    playlist_play.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        masterplay_playbox.classList.remove("fa-circle-play");
        masterplay_playbox.classList.add("fa-circle-pause");
        playlist_play_btn_icon.classList.remove("fa-play");
        playlist_play_btn_icon.classList.add("fa-pause");
        currtarget.classList.remove("fa-circle-play");
        currtarget.classList.add("fa-circle-pause");
        musicPlayer(currentid);
        playlist_header_change(currentid);
        prefunc(currtarget);
      } else {
        audio.pause();
        play_class = "fa-solid fa-play";
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        masterplay_playbox.classList.remove("fa-circle-pause");
        masterplay_playbox.classList.add("fa-circle-play");
        playlist_play_btn_icon.classList.remove("fa-pause");
        playlist_play_btn_icon.classList.add("fa-play");
        currtarget.classList.remove("fa-circle-pause");
        currtarget.classList.add("fa-circle-play");
        musicPlayer(currentid);
        playlist_header_change(currentid);
        prefunc(currtarget);
      }
    });

    //! Previous and next song
    //? next button
    let next_btn = document.getElementById("next_song_btn");
    next_btn.addEventListener("click", next_btn_func);
    function next_btn_func() {
      if (currentid < songs.length - 1) {
        currentid += 1;
        audio.src = `songs/${currentid}.mp3`;
        currtarget = target_btn[currentid];
        audio.play();
        currtarget.classList.remove("fa-circle-play");
        currtarget.classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        masterplay_playbox.classList.remove("fa-circle-play");
        masterplay_playbox.classList.add("fa-circle-pause");
        playlist_play_btn_icon.classList.remove("fa-play");
        playlist_play_btn_icon.classList.add("fa-pause");
        musicPlayer(currentid);
        playlist_header_change(currentid);
        prefunc(currtarget);
      } else {
        currentid = 0;
        audio.src = `songs/${currentid}.mp3`;
        currtarget = target_btn[currentid];
        audio.play();
        currtarget.classList.remove("fa-circle-play");
        currtarget.classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        masterplay_playbox.classList.remove("fa-circle-play");
        masterplay_playbox.classList.add("fa-circle-pause");
        playlist_play_btn_icon.classList.remove("fa-play");
        playlist_play_btn_icon.classList.add("fa-pause");
        musicPlayer(currentid);
        playlist_header_change(currentid);
        prefunc(currtarget);
      }
    }

    //? pre button
    let pre_btn = document.getElementById("pre_song_btn");
    pre_btn.addEventListener("click", pre_btn_func);
    function pre_btn_func() {
      if (currentid > 0) {
        currentid -= 1;
        audio.src = `songs/${currentid}.mp3`;
        currtarget = target_btn[currentid];
        audio.play();
        currtarget.classList.remove("fa-circle-play");
        currtarget.classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        masterplay_playbox.classList.remove("fa-circle-play");
        masterplay_playbox.classList.add("fa-circle-pause");
        playlist_play_btn_icon.classList.remove("fa-play");
        playlist_play_btn_icon.classList.add("fa-pause");
        musicPlayer(currentid);
        playlist_header_change(currentid);
        prefunc(currtarget);
      } else {
        currentid = songs.length - 1;
        audio.src = `songs/${currentid}.mp3`;
        currtarget = target_btn[currentid];
        audio.play();
        currtarget.classList.remove("fa-circle-play");
        currtarget.classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        masterplay_playbox.classList.remove("fa-circle-play");
        masterplay_playbox.classList.add("fa-circle-pause");
        playlist_play_btn_icon.classList.remove("fa-play");
        playlist_play_btn_icon.classList.add("fa-pause");
        musicPlayer(currentid);
        playlist_header_change(currentid);
        prefunc(currtarget);
      }
    }

    //! progressbar,range, duration and current time

    let min_runing = document.getElementById("min_runing");
    let sec_runing = document.getElementById("sec_runing");
    let min_totel = document.getElementById("min_totel");
    let sec_totel = document.getElementById("sec_totel");
    let progreesBar = document.getElementById("inp_range");
    let progress = 0;
    progreesBar.value = progress;
    audio.addEventListener("timeupdate", () => {
      progress = parseInt((audio.currentTime / audio.duration) * 100);
      progreesBar.value = progress;
      let min_current = Math.floor(audio.currentTime / 60);
      let sec_current = Math.floor(audio.currentTime % 60);
      let min_duration = Math.floor(audio.duration / 60);
      let sec_duration = Math.floor(audio.duration % 60);
      min_runing.textContent = min_current;
      if (sec_current < 10) {
        sec_runing.textContent = "0" + sec_current;
      } else {
        sec_runing.textContent = sec_current;
      }
      if (audio.duration) {
        min_totel.textContent = min_duration;

        if (sec_duration < 10) {
          sec_totel.textContent = "0" + sec_duration;
        } else {
          sec_totel.textContent = sec_duration;
        }
      }

      //? next  song playautometicly
      if (audio.currentTime == audio.duration) {
        next_btn_func();
      }
    });

    //?progressBar change
    progreesBar.addEventListener("change", () => {
      audio.currentTime = (progreesBar.value * audio.duration) / 100;
    });

    //? volume control
    let volume_rang = document.getElementById("volume_rang");
    volume_rang.addEventListener("change", () => {
      audio.volume = volume_rang.value / 100;
    });

    //! reply btn ---------
    let reply_btn = document.getElementById("reply_btn");
    reply_btn.addEventListener("click", () => {
      audio.currentTime = 0;
    });

    //! go on playbar btn ------
    let goto_playabr = document.getElementById("goto_playabr");
    goto_playabr.addEventListener("click", () => {
      document.getElementById("container1").style.display = "none";
      document.getElementById("container2").style.display = "inline";
    });
    
   


    //!  playbox------------------------------------------------------------

    if (body.clientWidth < 500) {
      let playlist_btn_playbox = Array.from(
        document.getElementsByClassName("playlist_btn_playbox")
      );
      playlist_btn_playbox.forEach((playlist_btn) => {
        playlist_btn.addEventListener("click", () => {
          document.getElementById("container1").style.display = "inline";
          document.getElementById("container2").style.display = "none";
        });
      });
      let playbox_pre = document.getElementById("previous");
      playbox_pre.addEventListener("click", () => {
        pre_btn_func();
      });
      let playbox_next = document.getElementById("next");

      playbox_next.addEventListener("click", () => {
        next_btn_func();
      });

      let masterplay_playbox = document.getElementById("masterplay_playbox");
      masterplay_playbox.addEventListener("click", () => {
        masterplay_play();
      });

      //! playbox ---- progressbar,range, duration and current time

      let min_runing_pb = document.getElementById("min_runing_pb");
      let sec_runing_pb = document.getElementById("sec_runing_pb");
      let min_totel_pb = document.getElementById("min_totel_pb");
      let sec_totel_pb = document.getElementById("sec_totel_pb");
      let progreesBar_pb = document.getElementById("inp_range_pb");
      let progress_pb = 0;
      progreesBar_pb.value = progress_pb;
      audio.addEventListener("timeupdate", () => {
        progress_pb = parseInt((audio.currentTime / audio.duration) * 100);
        progreesBar_pb.value = progress_pb;
        let min_current_pb = Math.floor(audio.currentTime / 60);
        let sec_current_pb = Math.floor(audio.currentTime % 60);
        let min_duration_pb = Math.floor(audio.duration / 60);
        let sec_duration_pb = Math.floor(audio.duration % 60);
        min_runing_pb.textContent = min_current_pb;
        if (sec_current_pb < 10) {
          sec_runing_pb.textContent = "0" + sec_current_pb;
        } else {
          sec_runing_pb.textContent = sec_current_pb;
        }
        if (audio.duration) {
          min_totel_pb.textContent = min_duration_pb;

          if (sec_duration_pb < 10) {
            sec_totel_pb.textContent = "0" + sec_duration_pb;
          } else {
            sec_totel_pb.textContent = sec_duration_pb;
          }
        }

        //? next  song playautometicly
        if (audio.currentTime == audio.duration) {
          next_btn_func();
        }
      });

      //?progressBar change
      progreesBar_pb.addEventListener("change", () => {
        audio.currentTime = (progreesBar_pb.value * audio.duration) / 100;
      });
    }
  }); //then close here


  /* !------------------------------- */
 



/*! ------------------------------------------ */