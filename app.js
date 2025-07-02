let dataLog = [];

document.getElementById('input-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const tanggal = document.getElementById('tanggal').value;
  const listrik = parseFloat(document.getElementById('listrik').value);
  const air = parseFloat(document.getElementById('air').value);

  const prev = dataLog.length > 0 ? dataLog[dataLog.length - 1] : null;
  const konsumsiListrik = prev ? listrik - prev.listrik : 0;
  const konsumsiAir = prev ? air - prev.air : 0;

  const log = {
    tanggal, listrik, air, konsumsiListrik, konsumsiAir
  };

  dataLog.push(log);
  tampilkanLog();
  tampilkanSaran(konsumsiListrik, konsumsiAir);

  this.reset();
});

function tampilkanLog() {
  const tbody = document.getElementById('log-tabel');
  tbody.innerHTML = "";

  dataLog.forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${d.tanggal}</td>
      <td>${d.listrik}</td>
      <td>${d.air}</td>
      <td>${d.konsumsiListrik.toFixed(2)}</td>
      <td>${d.konsumsiAir.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });
}

function tampilkanSaran(listrik, air) {
  let saran = "";

  if (listrik > 20) {
    saran += "🔌 Konsumsi listrik tinggi. Matikan perangkat yang tidak digunakan.<br/>";
  }
  if (air > 2) {
    saran += "🚰 Pemakaian air tinggi. Cek keran atau toilet bocor.<br/>";
  }
  if (!saran) saran = "✅ Konsumsi normal. Pertahankan efisiensi!";

  document.getElementById('saran').innerHTML = saran;
}