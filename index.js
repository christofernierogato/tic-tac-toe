const namePlayerSubMit = document.getElementById("name");
const subMit = document.getElementById("subMit");
const playerOne = document.getElementById("playerOne");
const playerTwo = document.getElementById("playerTwo");
const principal = document.getElementById("principal");
this.btn = Array.from(document.querySelectorAll(".button"));

let player = "";
let cont = 0;
let combinationWin = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

function playerName() {
	namePlayerSubMit.focus();
	subMit.addEventListener("click", function (ev) {
		ev.preventDefault();
		const namePlayer = namePlayerSubMit.value;
		if (namePlayer === "") {
			alert("Necessario o nome do Jogador...");
		} else {
			if (playerOne.innerText === "") {
				playerOne.innerText = namePlayerSubMit.value + " - X";
				namePlayerSubMit.value = "";
				namePlayerSubMit.focus();
			} else {
				playerTwo.innerText = namePlayerSubMit.value + " - O";
				namePlayerSubMit.value = "";
				subMit.setAttribute("disabled", !namePlayerSubMit.disabled);
				namePlayerSubMit.setAttribute("disabled", !namePlayerSubMit.disabled);
				principal.innerText = playerOne.innerText;
			}
		}
	});
}

playerName();

function checkWin(player) {
	const winner = combinationWin.some((combination) => {
		return combination.every((index) => {
			return btn[index].classList.contains(player);
		});
	});
	if (winner) {
		for (i = 0; i < btn.length; i++) {
			const butt = btn[i];
			if (butt[0] === butt[1] && butt[1] === butt[2] && butt[0] != "") {
				butt.classList.add("win");
			}
		}
		const h1 = document.createElement("h1");
		h1.innerText = `${principal.innerText} Ganhou`;
		h1.classList.add("winner");
		const main = document.getElementById("main");
		const btnReload = document.createElement("button");
		btnReload.innerText = "Reiniciar";
		btnReload.type = "button";
		btnReload.classList.add("reload");
		btnReload.addEventListener("click", function () {
			window.location.reload();
		});
		h1.appendChild(btnReload);
		main.append(h1);
	} else if (cont === 8) {
		const h1 = document.createElement("h1");
		h1.innerText = "O jogo Empatou";
		h1.classList.add("draw");
		const btnReload = document.createElement("button");
		btnReload.innerText = "Reiniciar";
		btnReload.type = "button";
		btnReload.classList.add("reload");
		btnReload.addEventListener("click", function () {
			window.location.reload();
		});
		h1.appendChild(btnReload);
		const main = document.getElementById("main");
		main.append(h1);
	} else {
		return;
	}
}

this.btn.forEach((possitionbtn) => {
	possitionbtn.addEventListener("click", function hundleclick() {
		if (playerOne.innerText != "" && playerTwo.innerText != "") {
			if (principal.dataset.principal === "player1") {
				possitionbtn.innerText = "X";
				player = "X";
				possitionbtn.classList.add(player);
				possitionbtn.removeEventListener("click", hundleclick);
				checkWin(player);
				cont++;
				principal.innerText = playerTwo.innerText;
				principal.dataset.principal = "player2";
			} else {
				possitionbtn.innerText = "O";
				player = "O";
				possitionbtn.classList.add(player);
				possitionbtn.removeEventListener("click", hundleclick);
				checkWin(player);
				cont++;
				principal.innerText = playerOne.innerText;
				principal.dataset.principal = "player1";
			}
		} else {
			alert("Informe os Jogadores...");
		}
	});
});
