const videosContainer = document.getElementById('videosContainer');
const popup = document.getElementById('popup');
const video = document.querySelector('#popup > iframe');
const videoIdInput = document.getElementById('videoId');
const IDS_KEY = 'youTubeVideoIds';
let youTubeVideoIds = [];

const loadVideos = () => {
  youTubeVideoIds = JSON.parse(localStorage.getItem(IDS_KEY)) || [];
};

const displayVideos = () => {
  const videosStr = youTubeVideoIds
    .map(
      (id) => `
      <li onclick="clickVideo(event, '${id}')">
        <img class="thumbnail" src="https://i3.ytimg.com/vi/${id}/sddefault.jpg" alt="Cover image for YouTube video with id ${id}">
        <button class="delete-btn" >&times;</button>
      </li>
    `
    )
    .join('');
  videosContainer.innerHTML = videosStr;
};

const clickVideo = (event, id) => {
  if (event?.target?.classList?.contains('delete-btn')) {
    youTubeVideoIds = youTubeVideoIds.filter((i) => i !== id);
    localStorage.setItem(IDS_KEY, JSON.stringify(youTubeVideoIds));
    displayVideos();
  } else {
    video.src = `https://www.youtube.com/embed/${id}`;
    popup.classList.add('open');
    popup.classList.remove('closed');
  }
};

const handlePopupClick = () => {
  popup.classList.add('closed');
  popup.classList.remove('open');
};

const saveVideo = (e) => {
  e.preventDefault();
  const videoId = videoIdInput.value;
  videoIdInput.value = '';
  youTubeVideoIds.unshift(videoId);
  localStorage.setItem(IDS_KEY, JSON.stringify(youTubeVideoIds));
  displayVideos();
};

loadVideos();
displayVideos();
