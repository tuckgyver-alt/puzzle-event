async function loadRanking(){
  const res = await fetch("/api/getRanking");
  const data = await res.json();

  const list = document.getElementById("rankingList");
  if(!list) return;

  list.innerHTML = "";

  data.forEach((item, index)=>{
    const li = document.createElement("li");
    li.textContent = `${index+1}위 - ${item.name} (${item.time}초)`;
    list.appendChild(li);
  });
}

window.addEventListener("DOMContentLoaded", loadRanking);
