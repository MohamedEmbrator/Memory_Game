document.querySelector(".control-buttons span").onclick = function () {
  let name = prompt("What's Your Name?");
  if (name == null || name == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = name;
  }
  document.querySelector(".control-buttons").remove();
};
let duration = 1000;
const blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = [...blocksContainer.children];
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", () => {
    flipBlock(block);
  });
});
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let allFlippedBlocks = blocks.filter((flibbedBlock) =>
    flibbedBlock.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMatachedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
function checkMatachedBlocks(firstBlock, secondBlock) {
  const tries = document.querySelector(".tries span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
  } else {
    tries.innerHTML = +tries.innerHTML + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}
function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
