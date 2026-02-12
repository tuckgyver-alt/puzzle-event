async function loadScores(){
  const pass = document.getElementById("adminPass").value;

  const res = await fetch("/.netlify/functions/getAllScores",{
    method:"POST",
    body: JSON.stringify({password: pass})
  });

  const data = await res.json();
  let table = document.getElementById("scoreTable");
  table.innerHTML = "<tr><th>이름</th><th>연락처</th><th>기록</th></tr>";

  data.forEach(item=>{
    table.innerHTML += `<tr>
      <td>${item.name}</td>
      <td>${item.phone}</td>
      <td>${item.time}초</td>
    </tr>`;
  });
}
