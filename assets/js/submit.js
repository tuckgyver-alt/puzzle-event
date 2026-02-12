document.getElementById("scoreForm")?.addEventListener("submit", async function(e){
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const agree = document.getElementById("agree").checked;

  if(!agree){
    alert("개인정보 동의가 필요합니다.");
    return;
  }

  const time = window.finalRecordTime;

  const res = await fetch("/api/saveScore",{
    method:"POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, time })
  });

  if(res.ok){
    alert("기록이 등록되었습니다.");
    location.reload();
  } else {
    alert("오류가 발생했습니다.");
  }
});
