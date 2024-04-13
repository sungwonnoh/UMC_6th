const number = document.getElementById("number");
const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");

console.log(number.innerText);
console.log(increase.offsetTop);
console.log(decrease.id);

increase.onclick = () => {
  console.log("increase 가 클릭됨");
  let num = parseInt(number.innerText);
  number.innerText = num + 1;
};

decrease.addEventListener("click", () => {
  console.log("decrease 가 클릭됨");
  let num = parseInt(number.innerText);
  number.innerText = num - 1;
});
