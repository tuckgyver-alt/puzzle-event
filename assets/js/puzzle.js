const size = 4;
let tiles = [];
let emptyIndex = null;
let imageSrc = null;

const puzzle = document.getElementById("puzzle");
const defaultImagePath = "assets/images/default.jpg";

/* =========================
   기본 이미지 자동 로드
========================= */
function loadDefaultImage() {
  const img = new Image();
  img.src = defaultImagePath;

  img.onload = function () {
    imageSrc = defaultImagePath;
    initPuzzle();
  };

  img.onerror = function () {
    console.error("default.jpg를 불러올 수 없습니다.");
  };
}

/* =========================
   퍼즐 초기화
========================= */
function initPuzzle() {
  tiles = Array.from({ length: size * size }, (_, i) => i);
  shuffle(tiles);
  render();
  startTimer();
}

/* =========================
   셔플
========================= */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/* =========================
   렌더링
========================= */
function render() {
  puzzle.innerHTML = "";

  tiles.forEach((tile, i) => {
    const div = document.createElement("div");
    div.classList.add("tile");

    if (tile === size * size - 1) {
      div.classList.add("empty");
      emptyIndex = i;
    } else {
      const x = (tile % size) * -100;
      const y = Math.floor(tile / size) * -100;
      div.style.backgroundImage = `url(${imageSrc})`;
      div.style.backgroundPosition = `${x}px ${y}px`;
    }

    div.addEventListener("click", () => moveTile(i));
    puzzle.appendChild(div);
  });
}

/* =========================
   타일 이동
========================= */
function moveTile(i) {
  const validMoves = [
    emptyIndex - 1,
    emptyIndex + 1,
    emptyIndex - size,
    emptyIndex + size
  ];

  if (validMoves.includes(i)) {
    [tiles[i], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[i]];
    emptyIndex = i;
    render();
    checkWin();
  }
}

/* =========================
   완성 체크
========================= */
function checkWin() {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] !== i) return;
  }

  const finalTime = stopTimer();
  document.getElementById("submitArea").classList.remove("hidden");
  window.finalRecordTime = finalTime;
}

/* =========================
   사용자 이미지 업로드 시 교체
========================= */
document.getElementById("imageUpload")?.addEventListener("change", (e) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    imageSrc = event.target.result;
    initPuzzle();
  };
  reader.readAsDataURL(e.target.files[0]);
});

/* =========================
   페이지 로드 시 자동 실행
========================= */
window.addEventListener("DOMContentLoaded", loadDefaultImage);
