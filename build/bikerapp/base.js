// AIzaSyB68qodniCQuLj_AfKJSYLMlXLFAr3BE_w;
$(document).ready(function () {
  let key = "AIzaSyB68qodniCQuLj_AfKJSYLMlXLFAr3BE_w";
  let playlistid = "PLwc1jOvPei-RotyZAaLlPriuW2r-8InGt";
  let url = "https://www.googleapis.com/youtube/v3/playlistItems";

  //creating an object to get request with options needed to retreive data
  const options = {
    part: "snippet",
    key: key,
    maxResults: 20,
    playlistId: playlistid,
  };

  //playvideo function declaration and it will load once page loads
  const playvideo = () => {
    $.getJSON(url, options, function (data) {
      //console.log(data);

      let id = data.items[0].snippet.resourceId.videoId;
      //calling to main content video function to load video
      mainvideo(id);
      contentgenerator(data);
      videoplayonclick(data);
    });
  };
  playvideo();
  // function to load main content video

  const mainvideo = (id) => {
    $("#main-content").html(`<iframe
          src="https://www.youtube.com/embed/${id}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>`);
  };

  //creating a function to loop over each video
  const contentgenerator = (data) => {
    let videoarray = data.items;

    let content = "";
    for (let i = 0; i < videoarray.length; i++) {
      content += ` <section class="video-section">
        <div class="box1">
          <img src=${videoarray[i].snippet.thumbnails.default.url} alt="bikeone" />
        </div>
        <div class="box2">
          <h3>${videoarray[i].snippet.title}</h3>
          <p>
           ${videoarray[i].snippet.description}
          </p>
        </div>
      </section>`;
    }
    $("#video-thumbnails").html(content);
  };

  const videoplayonclick = (data) => {
    $(".video-section").click(function (e) {
      let tagname = e.target.tagName;

      if (tagname === "IMG") {
        let src1 = e.target.src;

        for (let i in data.items) {
          let src2 = data.items[i].snippet.thumbnails.default.url;
          let value = data.items[i].snippet.resourceId.videoId;

          if (src1 == src2) {
            mainvideo(value);
          } else {
            console.log("");
          }
        }
      } else {
        alert("please click on image to view the video");
      }
    });
  };
});
