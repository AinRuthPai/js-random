const $c = document.querySelector("canvas");
const ctx = $c.getContext(`2d`);

const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");

const product = [];

const colors = ["#dc0936", "#e6471d", "#f7a416", "#efe61f ", "#60b236", "#209b6c", "#169ed8", "#3f297e", "#87207b", "#be107f", "#e7167b"];

const newMake = () => {
  const [cw, ch] = [$c.width / 2, $c.height / 2];
  const arc = Math.PI / (product.length / 2);

  for (let i = 0; i < product.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = colors[i % (colors.length - 1)];
    ctx.moveTo(cw, ch);
    ctx.arc(cw, ch, cw, arc * (i - 1), arc * i);
    ctx.fill();
    ctx.closePath();
  }

  ctx.fillStyle = "#fff";
  ctx.font = "18px Pretendard";
  ctx.textAlign = "center";

  for (let i = 0; i < product.length; i++) {
    const angle = arc * i + arc / 2;

    ctx.save();

    ctx.translate(cw + Math.cos(angle) * (cw - 50), ch + Math.sin(angle) * (ch - 50));

    ctx.rotate(angle + Math.PI / 2);

    product[i].split(" ").forEach((text, j) => {
      ctx.fillText(text, 0, 30 * j);
    });

    ctx.restore();
  }
};

const rotate = () => {
  $c.style.transform = `initial`;
  $c.style.transition = `initial`;

  setTimeout(() => {
    const ran = Math.floor(Math.random() * product.length);

    const arc = 360 / product.length;
    const rotate = ran * arc + 3600 + (arc * product.length) / 3 - (arc / product.length / 3 + 1);
    // + arc * 3 - arc / 4;

    $c.style.transform = `rotate(-${rotate}deg)`;
    $c.style.transition = `2s`;

    setTimeout(() => alert(`오늘의 야식은?! ${product[ran]} 어떠신가요?`), 2000);
  }, 1);
};

newMake();

const createList = () => {
  const ul = document.querySelector(".input_list");
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.value = "";
  input.style.borderRadius = "10px";
  input.style.fontSize = "20px";
  input.style.marginTop = "10px";
  ul.appendChild(li);
  li.appendChild(input);
};

const deleteList = () => {
  const ul = document.querySelector(".input_list");
  const li = document.querySelector("li");
  ul.removeChild(li);
};

plus.addEventListener("click", createList);
minus.addEventListener("click", deleteList);

const done = document.querySelector(".done");

done.addEventListener("click", function () {
  const li = document.querySelectorAll("li");
  const input = document.querySelectorAll("input");
  for (let i = 0; i < li.length; i++) {
    console.log(input[i].value);
    product.push(input[i].value);
  }
  console.log(product);
  newMake();
});
