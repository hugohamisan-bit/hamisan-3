// Database soal lokal (Bisa kamu tambah sendiri!)
const bankSoal = [
  {
    pertanyaan: "Hewan apa yang paling patuh sama peraturan lalu lintas?",
    jawaban: "semut merah"
  },
  {
    pertanyaan: "Kenapa pohon mangga di depan rumah harus ditebang?",
    jawaban: "kalau dicabut berat"
  },
  {
    pertanyaan: "Sayur apa yang jago nyanyi?",
    jawaban: "kolplay"
  },
  {
    pertanyaan: "Benda apa yang kalau dipotong malah makin tinggi?",
    jawaban: "celana"
  },
  {
    pertanyaan: "Sate apa yang berasal dari Jepang?",
    jawaban: "satria baja hitam"
  },
  {
    pertanyaan: "Gajah terbang kelihatan apanya?",
    jawaban: "kelihatan bohongnya"
  },
  {
    pertanyaan: "Kopi apa yang paling pahit?",
    jawaban: "kopilih dia daripada aku"
  }
];

let indexSoalSekarang = 0;
let skor = 0;

// Mengambil elemen dari HTML
const elPertanyaan = document.getElementById("pertanyaan");
const elInput = document.getElementById("input-jawaban");
const elSkor = document.getElementById("skor");
const elFeedback = document.getElementById("feedback");
const btnJawab = document.getElementById("btn-jawab");
const btnLewati = document.getElementById("btn-lewati");

// Fungsi mengacak urutan soal saat game dimulai
function acakSoal() {
  bankSoal.sort(() => Math.random() - 0.5);
}

// Menampilkan soal ke layar
function tampilkanSoal() {
  if (indexSoalSekarang >= bankSoal.length) {
    indexSoalSekarang = 0;
    acakSoal();
  }
  elPertanyaan.textContent = bankSoal[indexSoalSekarang].pertanyaan;
  elInput.value = "";
  elFeedback.textContent = "";
  elInput.focus();
}

// Mengecek jawaban pemain
function cekJawaban() {
  const jawabanUser = elInput.value.trim().toLowerCase();
  const kunciJawaban = bankSoal[indexSoalSekarang].jawaban.toLowerCase();

  if (jawabanUser === "") {
    elFeedback.style.color = "#fdcb6e";
    elFeedback.textContent = "Isi dulu jawabannya bro! 😅";
    return;
  }

  if (jawabanUser === kunciJawaban) {
    skor += 10;
    elSkor.textContent = skor;
    elFeedback.style.color = "#00b894";
    elFeedback.textContent = "BENER BANGET! +10 Poin 🎉";
    
    // Pindah ke soal berikutnya setelah 1.2 detik
    setTimeout(() => {
      indexSoalSekarang++;
      tampilkanSoal();
    }, 1200);
  } else {
    elFeedback.style.color = "#ff7675";
    elFeedback.textContent = "Salah wlee! Coba mikir lagi 😜";
  }
}

// Fungsi kalau pemain nyerah
function lewatiSoal() {
  const kunciJawaban = bankSoal[indexSoalSekarang].jawaban;
  elFeedback.style.color = "#74b9ff";
  elFeedback.textContent = `Jawabannya: "${kunciJawaban.toUpperCase()}"`;

  setTimeout(() => {
    indexSoalSekarang++;
    tampilkanSoal();
  }, 2000);
}

// Event Listener tombol
btnJawab.addEventListener("click", cekJawaban);
btnLewati.addEventListener("click", lewatiSoal);

// Biar bisa pencet Enter di keyboard HP
elInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    cekJawaban();
  }
});

// Mulai game pertama kali
acakSoal();
tampilkanSoal();
